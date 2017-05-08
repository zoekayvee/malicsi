/*
CMSC 128 MalICSi Database

Go to directory where malicsidb.sql is located or enter full path to file then run:
	mysql -u root -p < malicsidb.sql

*/
-- DROP USER "projectOneTwoEight"@"localhost";

-- CREATE USER "projectOneTwoEight"@"localhost" IDENTIFIED BY "password";

-- GRANT ALL PRIVILEGES ON malicsiDB.* TO "projectOneTwoEight"@"localhost" WITH GRANT OPTION;

DROP DATABASE IF EXISTS `malicsiDB`;

CREATE DATABASE IF NOT EXISTS `malicsiDB`;

USE `malicsiDB`;

create table users(
	user_id 		int unsigned auto_increment,
	username 		varchar(50) not null,
	password 		varchar(100) not null,
	user_type 		enum('admin','pending','normal'),
	gender 			enum('F','M'),
	firstname 		varchar(50) not null,
	lastname 		varchar(50) not null,
	college 		varchar(50),
	contactno 		varchar(50),
	email 			varchar(100),
	location		varchar(100),
	weight 			int DEFAULT 0,
	height 			int DEFAULT 0,
	age 			int DEFAULT 0,
	profilepic		text,
	UNIQUE 			(username),
	constraint 		user_id_pk primary key(user_id)
);

create table user_interests(
	user_id 		int unsigned,
	interests 		text,
	constraint 		user_interests_fk foreign key(user_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table logs(
	log_id 			int unsigned auto_increment,
	user_id 		int unsigned,
	log_timestamp 	timestamp default now(),
	message 		text,
	constraint 		log_id_pk primary key(log_id)
);

create table event(
	event_id 		int unsigned auto_increment,
	user_id 		int unsigned,
	event_name 		varchar(100) not null,
	allow_reg 		boolean not null default FALSE,
	date_start 		date,
	date_end 		date,
	duration 		int,
	status 			enum('accepted', 'rejected', 'pending'),

	UNIQUE			(event_name),
	constraint 		event_id_pk primary key(event_id),
	constraint 		event_user_id_fk foreign key(user_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table user_event(
	/* added for user dashboard */
	user_event_id   int unsigned auto_increment,
	user_id 		int unsigned,
	event_id 		int unsigned,

	constraint 		user_event_id_pk primary key(user_event_id),
	constraint 		user_user_id_fk foreign key(user_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		user_event_id_fk foreign key(event_id) references event(event_id) ON DELETE CASCADE ON UPDATE CASCADE
	
);
create table team(
	team_id 		int unsigned auto_increment,
	team_name 		varchar(100) not null,
	teamprofilepic 		text,

	UNIQUE			(team_name),
	constraint 		team_id_pk primary key(team_id)
);

create table team_players(
	team_id 		int unsigned,
	user_id 		int unsigned,
	player_status 	enum('accepted', 'rejected', 'pending'),

	constraint 		team_id_fk foreign key(team_id) references team(team_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		user_id_fk foreign key(user_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table team_joins_event(
	event_id 		int unsigned,
	team_id 		int unsigned,

	UNIQUE 			(team_id),
	constraint 		team_id_joins_event_fk foreign key(team_id) references team(team_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		team_joins_event_id_fk foreign key(event_id) references event(event_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table sport(
	sport_id 		int unsigned auto_increment,
	sport_name		varchar(100),

	UNIQUE			(sport_name),
	constraint		sport_id_pk primary key(sport_id)
);

create table event_has_sport(
	h_event_id 		int unsigned,
	h_sport_id 		int unsigned,

	constraint 		h_event_id foreign key(h_event_id) references event(event_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		h_sport_id foreign key(h_sport_id) references sport(sport_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table venue(
	venue_id 		int unsigned auto_increment,
	latitude 		float,
	longitude		float,
	address 		varchar(150),
	venue_name 		varchar(100),

	UNIQUE			(venue_name),
	constraint 		venue_id_pk primary key(venue_id)
);


create table game(
	game_id 		int unsigned auto_increment,
	sport_id 		int unsigned,
	venue_id 		int unsigned,
	event_event_id 	int unsigned,
	date_start		date,
	time_start 		time,
	duration		int,
	winner_team_id	int unsigned default NULL,
	referee 		varchar(100),
	constraint 		venue_id foreign key(venue_id) references venue(venue_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		event_event_id_fk foreign key(event_event_id) references event(event_id) ON DELETE CASCADE ON UPDATE CASCADE,
 	constraint 		game_id_pk primary key(game_id)
);

create table game_score(
	game_id 		int unsigned,
	team_score_id 	int unsigned,
	team_score		int,

	constraint 		team_score_id_fk foreign key(team_score_id) references team(team_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint		game_id_fk foreign key(game_id) references game(game_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table bet_status(
	b_game_id		int unsigned,
	b_player_id 	int unsigned,

	constraint		b_game_id foreign key(b_game_id) references	game(game_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		b_player_id foreign key(b_player_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table team_plays_game(
	game_id 		int unsigned,
	team_id 		int unsigned,
	bet_count 		int,

	constraint 		team_plays_game_id_fk foreign key(game_id) references game(game_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		team_id_plays_game_fk foreign key(team_id) references team(team_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table sponsor(
	sponsor_id 		int unsigned auto_increment,
	sponsor_name 	varchar(100),
	constraint 		sponsor_id_pk primary key(sponsor_id)
);

create table sponsor_events(
	sponsor_id 		int unsigned,
	event_id 		int unsigned,
	constraint 		sponsor_id_fk foreign key(sponsor_id) references sponsor(sponsor_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		event_id_fk foreign key(event_id) references event(event_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DELIMITER %%
	CREATE TRIGGER userInsert AFTER INSERT ON users
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(NEW.user_id, concat("Created new user with user name: ", NEW.username));
			END;
%%
	CREATE TRIGGER userUpdate AFTER UPDATE ON users
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat("Updated his/her user profile with user name: ", NEW.username));
			END;
%%
	CREATE TRIGGER userDelete AFTER DELETE ON users
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat("Deleted user: ", OLD.username));
			END;

%%
	CREATE TRIGGER userInterestInsert AFTER INSERT ON user_interests
		FOR EACH ROW
			BEGIN
				DECLARE name varchar(50);
				SET name = (SELECT username from users where user_id=NEW.user_id LIMIT 1);
				INSERT INTO logs(user_id, message) VALUES (NEW.user_id,concat(name," has new interest : ", NEW.interests));
			END;
%%
	CREATE TRIGGER userInterestUpdate AFTER UPDATE ON user_interests
		FOR EACH ROW
			BEGIN
				DECLARE name varchar(50);
				SET name = (SELECT username from users where user_id=OLD.user_id LIMIT 1);
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat(name," updated his/her interest : ", NEW.interests));
			END;
%%
	CREATE TRIGGER userInterestDelete AFTER DELETE ON user_interests
		FOR EACH ROW
			BEGIN
				DECLARE name varchar(50);
				SET name = (SELECT username from users where user_id=OLD.user_id LIMIT 1);
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat(name, " deleted his/her interest : ", OLD.interests));
			END;

%%
	CREATE TRIGGER sponsorInsert AFTER INSERT ON sponsor
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Created new sponsor with sponsor name: ", NEW.sponsor_name));
			END;
%%
	CREATE TRIGGER sponsorUpdate AFTER UPDATE ON sponsor
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Updated sponsor profile with sponsor name: ", NEW.sponsor_name));
			END;
%%
	CREATE TRIGGER sponsorDelete AFTER DELETE ON sponsor
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Deleted sponsor: ", OLD.sponsor_name));
			END;
%%
CREATE TRIGGER sponsorEventInsert AFTER INSERT ON sponsor_events
		FOR EACH ROW
			BEGIN
				DECLARE name,eventname varchar(100);
				SET name = (SELECT sponsor_name from sponsor where sponsor_id=NEW.sponsor_id LIMIT 1);
				SET eventname = (SELECT event_name from event where event_id=NEW.event_id LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name, " sponsored the event: ",eventname));
			END;
%%
	CREATE TRIGGER sponsorEventDelete AFTER DELETE ON sponsor_events
		FOR EACH ROW
			BEGIN
				DECLARE name,eventname varchar(100);
				SET name = (SELECT sponsor_name from sponsor where sponsor_id=OLD.sponsor_id LIMIT 1);
				SET eventname = (SELECT event_name from event where event_id=OLD.event_id LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name, " stopped sponsoring on event: ",eventname));
			END;
%%
	CREATE TRIGGER competitorInsert AFTER INSERT ON team
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Created new team: ", NEW.team_name));
			END;
%%
	CREATE TRIGGER competitorUpdate AFTER UPDATE ON team
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Updated the team name from ", OLD.team_name, " to", NEW.team_name));
			END;
%%
	CREATE TRIGGER competitortDelete AFTER DELETE ON team
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Deleted the team: ", OLD.team_name));
			END;

%%
	CREATE TRIGGER eventInsert AFTER INSERT ON event
		FOR EACH ROW
			BEGIN
				DECLARE name varchar(50);
				SET name = (SELECT username from users where user_id=NEW.user_id LIMIT 1);
				INSERT INTO logs(user_id, message) VALUES(NEW.user_id, concat(name," created new event: ", NEW.event_name));
			END;
%%

	CREATE TRIGGER eventUpdate AFTER UPDATE ON event
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("The event ",NEW.event_name ," was updated"));
			END;
%%
	CREATE TRIGGER eventDelete AFTER DELETE ON event
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("The event ",OLD.event_name ," was deleted"));
			END;
%%
	CREATE TRIGGER venueInsert AFTER INSERT ON venue
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Created new venue with name: ", NEW.venue_name));
			END;
%%
	CREATE TRIGGER venueUpdate AFTER UPDATE ON venue
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Updated venue with name: ", NEW.venue_name));
			END;
%%
	CREATE TRIGGER venueDelete AFTER DELETE ON venue
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Deleted venue with name: ", OLD.venue_name));
			END;
%%
	CREATE TRIGGER sportInsert AFTER INSERT ON sport
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Added sport: ", NEW.sport_name));
			END;
%%
	CREATE TRIGGER sportUpdate AFTER UPDATE ON sport
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Updated sport name from ", OLD.sport_name," to ", NEW.sport_name));
			END;
%%

	CREATE TRIGGER sportDelete AFTER DELETE ON sport
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Deleted : ", OLD.sport_name));
			END;
%%
	CREATE TRIGGER teamPlayerInsert AFTER INSERT ON team_players
		FOR EACH ROW
			BEGIN
				DECLARE name,tname varchar(100);
				SET name = (SELECT username from users where user_id=NEW.user_id LIMIT 1);
				SET tname = (SELECT team_name from team where team_id=NEW.team_id LIMIT 1);
				INSERT INTO logs(user_id,message) VALUES(NEW.user_id ,concat(tname,"'s added team player: ", name));
			END;
%%
	CREATE TRIGGER teamPlayerDelete AFTER DELETE ON team_players
		FOR EACH ROW
			BEGIN
				DECLARE name,tname varchar(100);
				SET name = (SELECT username from users where user_id=OLD.user_id LIMIT 1);
				SET tname = (SELECT team_name from team where team_id=OLD.team_id LIMIT 1);
				INSERT INTO logs(user_id,message) VALUES(OLD.user_id,concat(tname, "'s removed team player: ", name));
			END;
%%
	CREATE TRIGGER teamJoinEventInsert AFTER INSERT ON team_joins_event
		FOR EACH ROW
			BEGIN
				DECLARE name,eventname varchar(100);
				SET name = (SELECT team_name from team where team_id=NEW.team_id LIMIT 1);
				SET eventname = (SELECT event_name from event where event_id=NEW.event_id LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name," requests to join event: ", eventname));
			END;
%%
	CREATE TRIGGER teamJoinEventUpdate AFTER UPDATE ON team_joins_event
		FOR EACH ROW
			BEGIN
				DECLARE name,eventname varchar(100);
				SET name = (SELECT team_name from team where team_id=NEW.team_id LIMIT 1);
				SET eventname = (SELECT event_name from event where event_id=NEW.event_id LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name,"'s request status to join ", eventname));
			END;
%%
	CREATE TRIGGER teamPlayGameInsert AFTER INSERT ON team_plays_game
		FOR EACH ROW
			BEGIN
				DECLARE name,sportname varchar(100);
				SET name = (SELECT team_name from team where team_id=NEW.team_id LIMIT 1);
				SET sportname =(SELECT sport_name from sport where sport_id= (select sport_id from game where game_id = NEW.game_id) LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name," plays game with gameID: ", NEW.game_id, " in ",sportname ));
			END;
%%
	CREATE TRIGGER teamPlayGameDelete AFTER DELETE ON team_plays_game
		FOR EACH ROW
			BEGIN
				DECLARE name,sportname varchar(100);
				SET name = (SELECT team_name from team where team_id=OLD.team_id LIMIT 1);
				SET sportname =(SELECT sport_name from sport where sport_id= (select sport_id from game where game_id = OLD.game_id) LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name," disqualified from game with ID: ", OLD.game_id, " in ",sportname ));
			END;
%%
	CREATE TRIGGER gameInsert AFTER INSERT ON game
		FOR EACH ROW
			BEGIN
				DECLARE name varchar(100);
				SET name= (SELECT event_name from event where event_id=NEW.event_event_id LIMIT 1);
				INSERT INTO logs(message) VALUES(concat("Added new game with ID ", NEW.game_id, " in event ",name));
			END;
%%
	CREATE TRIGGER gameUpdate AFTER UPDATE ON game
		FOR EACH ROW
			BEGIN
				DECLARE name,ename varchar(100);
				SET ename= (SELECT event_name from event where event_id=NEW.event_event_id LIMIT 1);
				IF OLD.winner_team_id!=NEW.winner_team_id THEN
					SET name= (SELECT team_name from team where team_id=NEW.winner_team_id LIMIT 1);
					INSERT INTO logs(message) VALUES(concat("Winner of game with game ID : ", NEW.game_id, " is ",name, " in event ",ename ));
				ELSE
					INSERT INTO logs(message) VALUES(concat("Updated the game with ID ", NEW.game_id, " in event ",ename));
				END IF;
			END;
%%
	CREATE TRIGGER gameDelete AFTER DELETE ON game
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Deleted new game with ID : ", OLD.game_id));
			END;
%%
	/* END OF TRIGGERS */
	CREATE PROCEDURE addSport(in sportname varchar(100))
		BEGIN
			INSERT INTO sport(sport_name) VALUES(sportname);
		END;
%%
	CREATE PROCEDURE attachSportToEvent(in sportId int unsigned, in eventId int unsigned)
		BEGIN
			INSERT INTO event_has_sport(h_event_id, h_sport_id) VALUES(eventId, sportId);
		END;
%%

	CREATE PROCEDURE sportDelete(in sportid int unsigned)
		BEGIN
			DELETE FROM sport where sport_id = sportid;
		END;
%%
	CREATE PROCEDURE sportDeleteAll()
		BEGIN
			DELETE FROM sport;
		END;
%%
	CREATE PROCEDURE sportUpdate(in sportid int unsigned, in newSportName varchar(100))
		BEGIN
			UPDATE sport SET sport_name = newSportName where sport_id = sportid;
		END;
%%

	CREATE PROCEDURE viewAllSports()
		BEGIN
			SELECT * from sport;

		END;
%%
	CREATE PROCEDURE viewSport(in sportname varchar(100))
		BEGIN
			SELECT * FROM sport where sport_name = sportname;

		END;
%%
	CREATE PROCEDURE viewSportById(in sportid int unsigned)
		BEGIN
			SELECT * FROM sport where sport_id = sportid;
		END;
%%

	CREATE PROCEDURE viewSportByEvent(in eventId int unsigned)
		BEGIN
			SELECT * FROM sport WHERE sport_id IN (select h_sport_id from event_has_sport where h_event_id = eventId) ORDER BY sport_id;
		END;
%%
	CREATE PROCEDURE addGame(in sportid int unsigned, in venueid int unsigned, in eventId int unsigned, in datestart date, in timestart time, in durationIn int,in ref varchar(100))
		BEGIN
			INSERT INTO game(sport_id, venue_id, event_event_id, date_start, time_start, duration, referee) VALUES(sportid, venueid, eventId, datestart,timestart, durationIn, ref);
		END;
%%

	CREATE PROCEDURE deleteGame(in gameid int unsigned)
		BEGIN

			DELETE FROM game where game_id = gameid;
		END;
%%
	CREATE PROCEDURE deleteAllGames()
		BEGIN
			DELETE FROM game;
		END;
%%

	CREATE PROCEDURE updateGame(in sportid int unsigned, in venueid int unsigned, in eventId int unsigned, in datestart date, in timestart time, in durationIn int,in ref varchar(100), in gameid int unsigned)
		BEGIN
			UPDATE game SET sport_id = sportId,venue_id = venueId,event_event_id = eventId,date_start = datestart,time_start = timestart,duration = durationIn, referee = ref WHERE game_id = gameId;
		END;
%%

	CREATE PROCEDURE bet(in gameid int unsigned, in teamid int unsigned, in playerid int unsigned)
		BEGIN
			UPDATE team_plays_game set bet_count = bet_count + 1 WHERE game_id = gameid and team_id = teamid;

			INSERT INTO bet_status(b_game_id, b_player_id) VALUES(gameid, playerid);
		END;
%%
	CREATE PROCEDURE viewBetStatus(in userid int unsigned, in gameid int unsigned)
		BEGIN
			SELECT * from users where user_id = userid and user_id IN (select b_player_id from bet_status where b_game_id = gameid);
		END;
%%
	CREATE PROCEDURE viewAllGamesInSport(in sportId int unsigned, in eventId int unsigned)
		BEGIN
			SELECT * FROM game G, venue V WHERE sport_id = sportId and event_event_id = eventId order by sport_id and G.venue_id = V.venue_id;

		END;
%%
	CREATE PROCEDURE viewAllGames()
		BEGIN

			SELECT * FROM game;
		END;
%%
	CREATE PROCEDURE viewGame(in gameid int unsigned)
		BEGIN
			SELECT distinct S.sport_name, G.game_id, A.team_name, A.team_id, T1.bet_count, T1.team_id, B.team_name as team_name_2, B.team_id as team_id_2, T2.bet_count as bet_count_2, T2.team_id as team_id_2,winner_team_id FROM team A, team B, game G, venue V, sport S,team_plays_game T1,team_plays_game T2,game_score GS, game_score GS2 WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = gameid) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = gameid) AND A.team_id != B.team_id AND S.sport_id = G.sport_id AND T1.team_id = A.team_id AND T2.team_id = B.team_id AND T1.game_id = T2.game_id AND T1.game_id = gameid AND G.game_id = gameid LIMIT 1;

		END;
%%
	CREATE PROCEDURE ranking(in sportId int unsigned, in eventId int unsigned)
		BEGIN
			SELECT tp.team_id AS team_id,team.team_name as team_name, (SELECT COUNT(*) FROM game WHERE winner_team_id = tp.team_id AND sport_id = sportId AND game.event_event_id = eventId) AS win,(SELECT COUNT(*) FROM game NATURAL JOIN team_plays_game AS tpg WHERE tpg.team_id = tp.team_id AND (winner_team_id!=tp.team_id AND sport_id=sportId AND game.event_event_id = eventId)) AS loss FROM (SELECT DISTINCT team_id FROM game NATURAL JOIN team_plays_game WHERE game.sport_id = sportId AND game.event_event_id = eventId) AS tp,team where team.team_id = tp.team_id and team.team_name != "TBA" and team.team_name != " TBA " and team.team_name != "Team 1" and team.team_name != "Team 2" ORDER BY (win - loss) DESC LIMIT 3;
		END;
%%
	CREATE PROCEDURE overallRankings(in eventId int unsigned)
		BEGIN
			SELECT tp.team_id AS team_id,t.team_name, (SELECT COUNT(*) FROM game WHERE winner_team_id = tp.team_id AND game.event_event_id = eventId) AS wins,(SELECT COUNT(*) FROM game NATURAL JOIN team_plays_game AS tpg WHERE tpg.team_id = tp.team_id AND (winner_team_id!=tp.team_id AND game.event_event_id = eventId)) AS loss FROM (SELECT DISTINCT team_id FROM game NATURAL JOIN team_plays_game WHERE event_event_id = eventId) as tp NATURAL JOIN team t where t.team_name != "TBA" and t.team_name != " TBA"  ORDER BY wins DESC;
		END;
%%
	CREATE PROCEDURE viewSchedule(in sportId int unsigned)
		BEGIN
			SELECT distinct G.game_id, G.date_start,V.venue_name, A.team_name, B.team_name as team_name_2, G.referee FROM team A, team B, game G, venue V, sport S, team_plays_game T1, team_plays_game T2 WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = sportId) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = sportId) AND A.team_id != B.team_id and V.venue_id = G.venue_id and G.sport_id = S.sport_id and G.sport_id = sportId and T1.team_id = A.team_id and T2.team_id = B.team_id and T1.game_id = G.game_id and T2.game_id = G.game_id;
		END;
%%
	CREATE PROCEDURE viewLeaderBoard(in sportId int unsigned, in eventId int unsigned)
		BEGIN
			SELECT distinct G.game_id, G.date_start,V.venue_name, A.team_name, A.team_id,  B.team_name as team_name_2, B.team_id as team_id_2, G.referee FROM team A, team B, game G, venue V, sport S, team_plays_game T1, team_plays_game T2 WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = sportId) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = sportId) AND A.team_id > B.team_id and A.team_id = T1.team_id and B.team_id = T2.team_id and T1.game_id = T2.game_id  and G.game_id = T1.game_id and V.venue_id = G.venue_id and G.sport_id = S.sport_id and G.sport_id = sportId and G.event_event_id = eventId order by game_id;
		END;

%%
	CREATE PROCEDURE viewScores(in gameId int unsigned, in teamId int unsigned)
		BEGIN
			select team_score from game_score where game_id in (select game_id from game where game_id=gameId) and team_score_id = teamId;
		END;
%%
	CREATE PROCEDURE addWinner(in winnerid int unsigned, in gameid int unsigned)
		BEGIN
			UPDATE game SET winner_team_id = winnerid where game_id = gameid;
		END;
%%

	CREATE PROCEDURE viewAllWinners()
		BEGIN
			SELECT A.winner_team_id, B.team_name from game as A JOIN team as B on (B.team_id = A.winner_team_id);
		END;
%%

	CREATE PROCEDURE viewWinnerInGame(in gameid int unsigned)
		BEGIN
			SELECT winner_team_id, game_id from game where game_id = gameid;
		END;
%%
	CREATE PROCEDURE deleteWinnerInGame(in gameid int unsigned)
		BEGIN
			UPDATE game SET winner_team_id = NULL where game_id = gameid;
		END;
%%
	CREATE PROCEDURE deleteAllWinners()
		BEGIN
			UPDATE game SET winner_team_id = NULL;
		END;
%%
	CREATE PROCEDURE updateWinner(in winnerid int unsigned, in gameid int unsigned)
		BEGIN
			UPDATE game SET winner_team_id = winnerid where game_id = gameid;
		END;
%%
	CREATE PROCEDURE addEvent(in userid int unsigned, in eventName varchar(100), in dateStart date, in dateEnd date)
		BEGIN

			INSERT INTO event(user_id, event_name, date_start, date_end, duration,status) VALUES(userid, eventName, dateStart, dateEnd, datediff(dateEnd, dateStart),'pending');
		END;
%%
	CREATE PROCEDURE viewEvent(in eventId int unsigned)
		BEGIN

			SELECT * FROM event where event_id = eventId;
		END;
%%
	CREATE PROCEDURE viewAllEvents()
		BEGIN

			SELECT * FROM event;
		END;
%%
	CREATE PROCEDURE viewEventBySport(in sportId int unsigned)
		BEGIN
			SELECT A.sport_name, B.event_name from sport as A JOIN event as B JOIN event_has_sport as C on (A.sport_id = C.h_sport_id) and (B.event_id = C.h_event_id) where (A.sport_id = sportId);
		END;
%%
	CREATE PROCEDURE updateEvent(in eventId int unsigned, in eventName varchar(100), in allowReg boolean, in dateStart date, in dateEnd date)
		BEGIN
			UPDATE event SET event_name = eventName, allow_reg = allowReg, date_start = dateStart, date_end = dateEnd, duration = datediff(dateEnd,dateStart) where event_id = eventId;
		END;
%%
	CREATE PROCEDURE deleteEvent(in eventId int unsigned)
		BEGIN
			DELETE FROM event where event_id = eventId;
		END;
%%
	CREATE PROCEDURE addTeam(in teamName varchar(100))
		BEGIN
			INSERT INTO team(team_name) VALUES(teamName);
		END;
%%
	CREATE PROCEDURE userJoinsTeam(in userid int unsigned, in teamName varchar(100), in stats enum('accepted', 'rejected', 'pending'))
		BEGIN
			INSERT INTO team_players(team_id, user_id, player_status) values((select team_id from team where team_name = teamName), userid, stats);
		END;
%%
	CREATE PROCEDURE creatorApprovesPlayer(in userid int unsigned, in teamid int unsigned, in eventid int unsigned)
		/*procedure for when the creator approved the player*/
		BEGIN
			UPDATE team_players SET player_status='accepted' where team_id=teamid and user_id=userid;
			INSERT INTO user_event(user_id,event_id) VALUES (userId,eventid);
		END;
%%
	CREATE PROCEDURE deleteTeamPlayer(in eventid int unsigned, in teamid int unsigned, in userid int unsigned)
		BEGIN
			DELETE from team_players where team_id=teamid and user_id=userid;
			DELETE from user_event where user_id=userid and event_id=eventid;
		END;
%%
	CREATE PROCEDURE creatorDisapprovesPlayer(in userid int unsigned, in teamid int unsigned)
		/*procedure for when the creator disapproved the player; no user_event insertion*/
		BEGIN
			UPDATE team_players SET player_status='rejected' where team_id=teamid and user_id=userid;
		END;
%%
	CREATE PROCEDURE viewTeam(in teamId int unsigned)
		BEGIN
			SELECT A.team_name, B.username from team as A JOIN users as B JOIN team_players as C on (A.team_id = teamId) and (C.team_id = A.team_id) and (C.user_id = B.user_id);
		END;
%%
	CREATE PROCEDURE viewAllTeams()
		BEGIN
			SELECT * from team;
		END;
%%
	CREATE PROCEDURE updateTeam(in teamId int unsigned, in teamName varchar(100))
		BEGIN
			UPDATE team SET team_name = teamName where team_id = teamId;
		END;
%%

	CREATE PROCEDURE updateTeamProfilePicture(in tid int(10), in pp text)
		BEGIN
			UPDATE team SET teamprofilepic = pp WHERE team_id = tid;
		END;

%%

	CREATE PROCEDURE deleteTeam(in teamId int unsigned)
		BEGIN
			DELETE FROM team where team_id = teamId;

		END;
%%
	CREATE PROCEDURE teamJoinsEvent(in teamId int unsigned, in eventId int unsigned)
		BEGIN
			INSERT INTO team_joins_event(event_id,team_id) VALUES(eventId,teamId);
		END;
%%
	CREATE PROCEDURE eventStatusUpdate(in eventId int unsigned, in nstatus enum('accepted', 'rejected', 'pending'))
		BEGIN
			UPDATE event SET status = nstatus where event_id = eventId;
		END;
%%
		CREATE PROCEDURE insertTeamPlaysGame(in gameId int unsigned)
		BEGIN
			INSERT INTO team_plays_game(game_id, team_id, bet_count) VALUES(gameId, 8, 0);
			INSERT INTO team_plays_game(game_id, team_id, bet_count) VALUES(gameId, 9, 0);
			INSERT INTO game_score(game_id, team_score_id, team_score) VALUES(gameId, 8, 0);
			INSERT INTO game_score(game_id, team_score_id, team_score) VALUES(gameId, 9, 0);
		END;
%%
	CREATE PROCEDURE updateTeamPlaysGame(in teamId int unsigned, in gameId int unsigned, in defaultTeamId int unsigned)
		BEGIN
			-- INSERT INTO team_plays_game(game_id,team_id,bet_count) values(gameId,teamId,0);
			UPDATE team_plays_game set team_id = teamId where game_id = gameId and team_id = defaultTeamId;
			UPDATE game_score set team_score_id = teamId where game_id = gameId and team_score_id = defaultTeamId ;
		END;
%%
	CREATE PROCEDURE teamWinPoint(in teamId int unsigned, in gameId int unsigned, in addScore int)
		BEGIN
			UPDATE game_score SET score = addScore WHERE game_id = gameId and team_id = teamId;
		END;
%%
	CREATE PROCEDURE addSponsor(in sponsorName varchar(100))
		BEGIN
			INSERT INTO sponsor(sponsor_name) VALUES(sponsorName);
		END;
%%
	CREATE PROCEDURE sponsorEvent(in sponsorId int unsigned, in eventId int unsigned)
		BEGIN
			INSERT INTO sponsor_events(sponsor_id, event_id) VALUES(sponsorId, eventId);
		END;
%%
	CREATE PROCEDURE viewAllSponsor()
		BEGIN
			SELECT * FROM sponsor;
		END;
%%
	CREATE PROCEDURE viewSponsorByEvent(in eventId int unsigned)
		BEGIN
			SELECT distinct A.event_name, B.sponsor_name, B.sponsor_id from event as A JOIN sponsor as B JOIN sponsor_events as C on (A.event_id = eventId) and (A.event_id = C.event_id) and (B.sponsor_id = C.sponsor_id);
		END;
%%
	CREATE PROCEDURE viewSponsor(in sponsorId int unsigned)
		BEGIN
			SELECT A.sponsor_name, B.event_name from sponsor as A JOIN event as B JOIN sponsor_events as C on (A.sponsor_id = sponsorId) and (A.sponsor_id = C.sponsor_id) and (B.event_id = C.event_id);
		END;
%%
	CREATE PROCEDURE updateSponsor(in sponsorId int unsigned, in sponsorName varchar(100))
		BEGIN
			UPDATE sponsor SET sponsor_name = sponsorName where sponsor_id = sponsorId;
		END;
%%
	CREATE PROCEDURE deleteSponsor(in sponsorId int unsigned)
		BEGIN
			DELETE FROM sponsor where sponsor_id = sponsorId;
		END;
%%
	CREATE PROCEDURE addVenue(in latitude float, in longitude float, address varchar(150), in venuename varchar(100))
		BEGIN
			INSERT INTO venue(latitude, longitude, address, venue_name) VALUES(latitude, longitude, address, venuename);
		END;
%%
	CREATE PROCEDURE viewVenue(in venuename varchar(100))
		BEGIN
			SELECT * FROM venue where venue_name = venuename;
		END;
%%
	CREATE PROCEDURE viewAllVenues()
		BEGIN
			SELECT * FROM venue;
		END;
%%
	CREATE PROCEDURE deleteVenue(in venuename varchar(100))
		BEGIN
			DELETE FROM venue where venue_name = venuename;
		END;
%%
	CREATE PROCEDURE updateVenue(in venueId int unsigned, in nlatitude float, in nlongitude float, naddress varchar(150), in nvenuename varchar(100))
		BEGIN
			UPDATE venue SET venue_name = nvenuename, latitude = nlatitude, longitude = nlongitude, address = naddress where venue_id = venueId;
		END;
%%
	CREATE PROCEDURE login(in uname varchar(50), in pass varchar(50))
		BEGIN
			INSERT INTO logs(user_id, message) VALUES((select user_id from users where username = BINARY uname), concat(uname, " logged in"));
			SELECT user_id,username FROM users WHERE username = BINARY uname and password = BINARY ENCODE(pass, uname);
		END;
%%
	CREATE PROCEDURE createUser(in uname varchar(50), in pass varchar(100), in utype enum('admin', 'pending','normal'), in fname varchar(50), in lname varchar(50), in em varchar(100))
		BEGIN
			INSERT INTO users (username, password, user_type, firstname, lastname, email) VALUES (uname, pass, utype, fname, lname, em);
		END;
%%
	CREATE PROCEDURE updateUser(in uid int(10), in uname varchar(50), in pass varchar(100), in fname varchar(50), in lname varchar(50),in gtype enum('F','M') , in ucollege varchar(50), in contact varchar(50), in mail varchar(100),in loc varchar(100) ,in wt int(11), in ht int (11), in ag int(3))
		BEGIN
			UPDATE users SET username=uname, password=pass, firstname = fname, lastname = lname, gender=gtype,college = ucollege, contactno = contact, email = mail, location=loc, weight = wt, height = ht, age=ag WHERE user_id = uid;
		END;
%%
	CREATE PROCEDURE updateProfilePicture(in uid int(10), in pp text)
		BEGIN
			UPDATE users SET profilepic = pp WHERE user_id = uid;
		END;
%%
	CREATE PROCEDURE deleteUser(in uid int(10))
		BEGIN
			DELETE FROM user_event WHERE user_id=uid;
			DELETE FROM event WHERE user_id = uid;
			DELETE FROM logs WHERE user_id = uid;
			DELETE FROM team_players WHERE user_id = uid;
			DELETE FROM user_interests WHERE user_id = uid;
			DELETE FROM users WHERE user_id LIKE uid;
		END;
%%
	CREATE PROCEDURE userViewLogs(in userid int unsigned)
		BEGIN
			SELECT * FROM logs where user_id = userid;
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " viewed the logs"));
		END;
%%


DELIMITER ;

insert into users(username, password, user_type, gender, firstname, lastname, college, contactno, email, weight, height) values("admin", "$2a$10$XZ3gB4uWjsKhIBQ0xoxFmejypyylQqHw.Bi43dvMzp4vmoW9/YPGm", "admin", "M", "Person", "A", "CAS", 09166994203, "pa@up.edu.ph", 59, 177); /*pw: test*/
insert into users(username, password, user_type, gender, firstname, lastname, college, contactno, email, weight, height) values("Tester1", "$2a$10$lVkrOWmUYhHeK7i80M6NBu9aE0AuO0mzLdV1pBEmsRbCrxON2IIdy", "normal", "F", "Hiker", "Castillo", "CAS", 09166994203, "pb@up.edu.ph", 59, 177); /*pw: test*/
insert into users(username, password, user_type, gender, firstname, lastname, college, contactno, email, weight, height) values("Tester2", "$2a$10$lVkrOWmUYhHeK7i80M6NBu9aE0AuO0mzLdV1pBEmsRbCrxON2IIdy", "normal", "M", "Loura", "Bree", "CAS", 09166994203, "pc@up.edu.ph", 59, 177); /*pw: test*/
insert into users(username, password, user_type, gender, firstname, lastname, college, contactno, email, weight, height) values("Tester3", "$2a$10$lVkrOWmUYhHeK7i80M6NBu9aE0AuO0mzLdV1pBEmsRbCrxON2IIdy", "normal", "F", "Rianne", "De Castro", "CEM", 09166994203, "pd@up.edu.ph", 59, 177); /*pw: a*/
insert into users(username, password, user_type, gender, firstname, lastname, college, contactno, email, weight, height) values("Tester4", "$2a$10$lVkrOWmUYhHeK7i80M6NBu9aE0AuO0mzLdV1pBEmsRbCrxON2IIdy", "normal", "M", "Li", "Emeralda", "CEAT", 09166994203, "pe@up.edu.ph", 59, 177); /*pw: a*/
insert into users(username, password, user_type, gender, firstname, lastname, college, contactno, email, weight, height) values("Tester5", "$2a$10$lVkrOWmUYhHeK7i80M6NBu9aE0AuO0mzLdV1pBEmsRbCrxON2IIdy", "normal", "F", "Mariane", "Sarcedo", "CEM", 09166994203, "pd@up.edu.ph", 59, 177); /*pw: a*/
insert into users(username, password, user_type, gender, firstname, lastname, college, contactno, email, weight, height) values("Tester6", "$2a$10$lVkrOWmUYhHeK7i80M6NBu9aE0AuO0mzLdV1pBEmsRbCrxON2IIdy", "normal", "M", "Merca", "Mercado", "CEAT", 09166994203, "pe@up.edu.ph", 59, 177); /*pw: a*/

call addVenue(12.23, 32.33, "Los Banos, Laguna", "Copeland Gymasium");
call addVenue(44.23, 12.33, "Los Banos, Laguna", "Baker Hall");
call addVenue(01.42, 13.44, "Los Banos, Laguna", "Freedom Park");
call addVenue(76.00, 76.00, "Los Banos, Laguna", "Tambayan Natin");

call addEvent(2, "Malicsihan", "2017-04-13", "2017-04-23");
call addEvent(2, "Palicsihan", "2017-06-01", "2017-06-15");

call addEvent(3, "Malacasan", "2017-03-10", "2017-03-23");
call addEvent(3, "Mahinahan", "2017-05-29", "2017-06-07");
call addEvent(3, "Gualaman", "2017-07-07", "2017-07-08");
call addEvent(3, "Findapple", "2017-09-18", "2017-09-21");

call addEvent(4, "Halamanan", "2017-04-29", "2017-05-07");
call addEvent(4, "Sakbakan", "2017-09-12", "2017-09-20");
call addEvent(4, "Palacasan", "2017-10-09", "2017-10-21");

call addEvent(5, "Boy Voyage", "2017-04-13", "2017-04-23");
call addEvent(5, "King's Hill", "2017-06-01", "2017-06-15");

call addEvent(6, "TV Olympics", "2017-08-02", "2017-08-15");
call addEvent(6, "Movie Marathon", "2017-06-01", "2017-06-15");

call addEvent(7, "Malicsihan v2", "2018-04-13", "2018-04-23");
call addEvent(7, "Palicsihan v2", "2018-06-01", "2018-06-15");
call addEvent(7, "Findapple v2", "2018-09-18", "2018-09-21");
call addEvent(7, "TV Olympics v2", "2018-08-02", "2018-08-20");

call addSport("Basketball");
call addSport("Volleyball");
call addSport("Badminton");
call addSport("Phil. Games");
call addSport("Dota");
call addSport("Soccer");
call addSport("Javelin");

call addTeam("AiWanEl");
call addTeam("Elite Five");
call addTeam("Eight-Eleven");
call addTeam("Best 100");
call addTeam("Holyconcrete");
call addTeam("BeshieDesu");
call addTeam("WanTooFaiv");
call addTeam("TBA");				-- NOTE: DO NOT ERASE THESE TEAMS, TEAM ID OF TBAS ARE USED IN THE PROCESS
call addTeam(" TBA");				-- CHANGING THE ORDER, OR THE TEAM ID WOULD RESULT TO A BUG


call addGame(1, 1, 1, "2017-04-14", "08:00:00", 1, "Tylson Reci");
call addGame(2, 1, 1, "2017-04-15", "08:00:00", 1, "Gabriel Marco");
call addGame(3, 1, 1, "2017-04-17", "08:00:00", 1, "Aruvin San");
call addGame(5, 4, 1, "2017-04-20", "08:00:00", 5, "Precy Cinamon");

call attachSportToEvent(1, 1);
call attachSportToEvent(2, 1);
call attachSportToEvent(3, 1);
call attachSportToEvent(5, 1);

call addGame(4, 1, 2, "2017-06-01", "07:00:00", 5, "Tailoson Loo");
call addGame(1, 1, 2, "2017-06-03", "07:00:00", 1, "Tailoson Loo");
call addGame(2, 1, 2, "2017-06-04", "07:00:00", 1, "Tailoson Loo");
call addGame(6, 2, 2, "2017-06-07", "07:00:00", 1, "Tailoson Loo");
call addGame(7, 3, 2, "2017-06-10", "07:00:00", 1, "Tailoson Loo");

call attachSportToEvent(4, 2);
call attachSportToEvent(1, 2);
call attachSportToEvent(2, 2);
call attachSportToEvent(6, 2);
call attachSportToEvent(7, 2);

call addGame(1, 1, 3, "2017-03-10", "13:00:00", 1, "Memarina Rinsi");
call addGame(3, 1, 3, "2017-03-11", "14:00:00", 1, "Memarina Rinsi");
call addGame(7, 3, 3, "2017-03-14", "14:00:00", 1, "Memarina Rinsi");
call addGame(4, 1, 3, "2017-03-17", "12:00:00", 1, "Memarina Rinsi");

call attachSportToEvent(1, 3);
call attachSportToEvent(3, 3);
call attachSportToEvent(7, 3);
call attachSportToEvent(4, 3);

call addGame(2, 2, 4, "2017-05-29", "09:00:00", 1, "Granger Resticalo");
call addGame(3, 1, 4, "2017-05-30", "10:00:00", 1, "Granger Resticalo");
call addGame(4, 1, 4, "2017-05-31", "11:00:00", 1, "Granger Resticalo");
call addGame(5, 4, 4, "2017-06-02", "08:00:00", 5, "Peter Paul");
call addGame(7, 3, 4, "2017-06-03", "15:00:00", 1, "Granger Resticalo");

call attachSportToEvent(2, 4);
call attachSportToEvent(3, 4);
call attachSportToEvent(4, 4);
call attachSportToEvent(5, 4);
call attachSportToEvent(7, 4);

call addGame(1, 1, 5, "2017-07-07", "09:00:00", 1, "Sin Lee");
call addGame(2, 1, 5, "2017-07-07", "13:00:00", 1, "Sin Lee");
call addGame(1, 1, 5, "2017-07-08", "10:00:00", 1, "Sin Lee");

call attachSportToEvent(1, 5);
call attachSportToEvent(2, 5);
call attachSportToEvent(1, 5);

call addGame(4, 2, 6, "2017-09-18", "10:00:00", 2, "Aether Kayle");
call addGame(6, 2, 6, "2017-09-19", "08:00:00", 2, "Aether Kayle");
call addGame(7, 2, 6, "2017-09-20", "08:00:00", 2, "Aether Kayle");

call attachSportToEvent(4, 6);
call attachSportToEvent(6, 6);
call attachSportToEvent(7, 6);

call addGame(3, 1, 7, "2017-04-29", "12:00:00", 1, "Hicson Simpson");
call addGame(1, 1, 7, "2017-04-30", "08:00:00", 1, "Hicson Simpson");
call addGame(4, 1, 7, "2017-05-01", "08:00:00", 1, "Hicson Simpson");
call addGame(6, 2, 7, "2017-05-03", "08:00:00", 1, "Hicson Simpson");
call addGame(7, 2, 7, "2017-05-04", "08:00:00", 1, "Hicson Simpson");

call attachSportToEvent(3, 7);
call attachSportToEvent(1, 7);
call attachSportToEvent(4, 7);
call attachSportToEvent(6, 7);
call attachSportToEvent(7, 7);

call addGame(1, 1, 8, "2017-09-12", "07:00:00", 1, "Hayler Hays");
call addGame(2, 1, 8, "2017-09-13", "07:00:00", 1, "Hayler Hays");
call addGame(3, 1, 8, "2017-09-14", "07:00:00", 1, "Hayler Hays Jr.");
call addGame(4, 1, 8, "2017-09-15", "07:00:00", 1, "Hayler Hays Sr.");
call addGame(5, 4, 8, "2017-09-16", "07:00:00", 1, "Hayler Hays IV");
call addGame(6, 2, 8, "2017-09-17", "07:00:00", 1, "Hayler Hays III");
call addGame(7, 3, 8, "2017-09-18", "07:00:00", 1, "Hayler Hays VI");

call attachSportToEvent(1, 8);
call attachSportToEvent(2, 8);
call attachSportToEvent(3, 8);
call attachSportToEvent(4, 8);
call attachSportToEvent(5, 8);
call attachSportToEvent(6, 8);
call attachSportToEvent(7, 8);

call addGame(1, 1, 9, "2017-10-09", "07:00:00", 1, "Rais Kooker");
call addGame(3, 1, 9, "2017-10-11", "08:00:00", 1, "Belmer Broy");
call addGame(4, 2, 9, "2017-10-13", "09:00:00", 1, "Kris Lenter");
call addGame(5, 4, 9, "2017-10-15", "16:00:00", 1, "Ric Jordan");
call addGame(6, 2, 9, "2017-10-20", "16:00:00", 1, "Wallinston Dai");

call attachSportToEvent(1, 9);
call attachSportToEvent(3, 9);
call attachSportToEvent(4, 9);
call attachSportToEvent(5, 9);
call attachSportToEvent(6, 9);

call addGame(2, 1, 10, "2017-04-13", "09:00:00", 2, "Macy Lukeheart");
call addGame(3, 1, 10, "2017-04-14", "10:00:00", 1, "Landy Maligan");
call addGame(4, 2, 10, "2017-04-15", "09:00:00", 1, "Rhondo Raiser");
call addGame(5, 4, 10, "2017-04-17", "10:30:00", 5, "Macy Lukeheart");
call addGame(7, 3, 10, "2017-04-18", "09:00:00", 2, "Landy Maligan");

call attachSportToEvent(2, 10);
call attachSportToEvent(3, 10);
call attachSportToEvent(4, 10);
call attachSportToEvent(5, 10);
call attachSportToEvent(7, 10);

call addGame(1, 1, 11, "2017-06-01", "13:00:00", 1, "Landy Maligan");
call addGame(2, 1, 11, "2017-06-04", "10:00:00", 1, "Hicson Simpson");
call addGame(4, 1, 11, "2017-06-05", "09:00:00", 1, "Rhondo Raiser");
call addGame(5, 4, 11, "2017-06-10", "09:00:00", 5, "Landy Maligan");
call addGame(7, 3, 11, "2017-06-12", "08:00:00", 2, "Hicson Simpson");
call addGame(6, 2, 11, "2017-06-13", "15:00:00", 1, "Rhondo Raiser");

call attachSportToEvent(1, 11);
call attachSportToEvent(2, 11);
call attachSportToEvent(4, 11);
call attachSportToEvent(5, 11);
call attachSportToEvent(7, 11);
call attachSportToEvent(6, 11);

call addGame(1, 1, 12, "2017-08-03", "08:00:00", 1, "Ty Ruler");
call addGame(3, 1, 12, "2017-08-04", "09:00:00", 2, "Cram Recor");
call addGame(2, 1, 12, "2017-08-06", "08:00:00", 2, "Ayala Dora");
call addGame(4, 2, 12, "2017-08-10", "09:00:00", 2, "Enrich Belgaria");

call attachSportToEvent(1, 12);
call attachSportToEvent(3, 12);
call attachSportToEvent(2, 12);
call attachSportToEvent(4, 12);

call addGame(6, 2, 13, "2017-06-01", "10:00:00", 2, "Daimian Passimian");
call addGame(7, 3, 13, "2017-06-03", "11:00:00", 1, "Rudy Passimian");
call addGame(4, 1, 13, "2017-06-05", "12:00:00", 1, "Daimian Passimian");
call addGame(2, 2, 13, "2017-06-07", "13:00:00", 1, "Rudy Passimian");


call attachSportToEvent(6, 13);
call attachSportToEvent(7, 13);
call attachSportToEvent(4, 13);
call attachSportToEvent(3, 13);


call addGame(1, 1, 14, "2018-04-14", "08:00:00", 1, "Tylson Reci");
call addGame(2, 1, 14, "2018-04-15", "08:00:00", 1, "Gabriel Marco");
call addGame(3, 1, 14, "2018-04-17", "08:00:00", 1, "Aruvin San");
call addGame(5, 4, 14, "2018-04-20", "08:00:00", 5, "Precy Cinamon");


call attachSportToEvent(1, 14);
call attachSportToEvent(2, 14);
call attachSportToEvent(3, 14);
call attachSportToEvent(5, 14);


call addGame(4, 1, 2, "2018-06-01", "07:00:00", 5, "Tailoson Loo");
call addGame(1, 1, 2, "2018-06-03", "07:00:00", 1, "Tailoson Loo");
call addGame(2, 1, 2, "2018-06-04", "07:00:00", 1, "Tailoson Loo");
call addGame(6, 2, 2, "2018-06-07", "07:00:00", 1, "Tailoson Loo");
call addGame(7, 3, 2, "2018-06-10", "07:00:00", 1, "Tailoson Loo");

call attachSportToEvent(4, 15);
call attachSportToEvent(1, 15);
call attachSportToEvent(2, 15);
call attachSportToEvent(6, 15);
call attachSportToEvent(7, 15);


call addGame(4, 2, 6, "2018-09-18", "10:00:00", 2, "Aether Kayle");
call addGame(6, 2, 6, "2018-09-19", "08:00:00", 2, "Aether Kayle");
call addGame(7, 2, 6, "2018-09-20", "08:00:00", 2, "Aether Kayle");

call attachSportToEvent(4, 16);
call attachSportToEvent(6, 16);
call attachSportToEvent(7, 16);


call addGame(1, 1, 12, "2018-08-03", "08:00:00", 1, "Ty Ruler");
call addGame(3, 1, 12, "2018-08-04", "09:00:00", 2, "Cram Recor");
call addGame(2, 1, 12, "2018-08-06", "08:00:00", 2, "Ayala Dora");
call addGame(4, 2, 12, "2018-08-10", "09:00:00", 2, "Enrich Belgaria");

call attachSportToEvent(1, 17);
call attachSportToEvent(3, 17);
call attachSportToEvent(2, 17);
call attachSportToEvent(4, 17);


call teamJoinsEvent(1, 1);

call teamJoinsEvent(2, 2);

call teamJoinsEvent(3, 5);

call teamJoinsEvent(4, 11);

call teamJoinsEvent(5, 14);

call teamJoinsEvent(6, 16);

call teamJoinsEvent(7, 17);

call addSponsor("Aera IV");
call addSponsor("Bares Jr. IV");
call addSponsor("Capollo Electric Company");
call addSponsor("Dmeter Agriculture Expert Inc.");
call addSponsor("Ephaestus Inc.");
call addSponsor("Foseidon Water Supply");
call addSponsor("Gades Electric Company");
call addSponsor("Metal Company II");
call addSponsor("Wood Division V");

call sponsorEvent(1, 1);
call sponsorEvent(1, 2);
call sponsorEvent(1, 4);
call sponsorEvent(1, 6);
call sponsorEvent(1, 7);

call sponsorEvent(2, 1);
call sponsorEvent(2, 2);
call sponsorEvent(2, 3);
call sponsorEvent(2, 4);

call sponsorEvent(3, 1);
call sponsorEvent(3, 11);
call sponsorEvent(3, 13);
call sponsorEvent(3, 14);
call sponsorEvent(3, 15);
call sponsorEvent(3, 10);
call sponsorEvent(3, 9);


call sponsorEvent(4, 1);
call sponsorEvent(4, 2);
call sponsorEvent(4, 3);
call sponsorEvent(4, 4);
call sponsorEvent(4, 5);
call sponsorEvent(4, 6);


call sponsorEvent(5, 2);
call sponsorEvent(5, 3);
call sponsorEvent(5, 4);
call sponsorEvent(5, 5);
call sponsorEvent(5, 6);
call sponsorEvent(5, 7);
call sponsorEvent(5, 8);


call sponsorEvent(6, 7);
call sponsorEvent(6, 8);
call sponsorEvent(6, 9);
call sponsorEvent(6, 10);
call sponsorEvent(6, 11);
call sponsorEvent(6, 12);
call sponsorEvent(6, 13);
call sponsorEvent(6, 16);
call sponsorEvent(6, 17);


call sponsorEvent(7, 2);
call sponsorEvent(7, 10);
call sponsorEvent(7, 12);
call sponsorEvent(7, 13);
call sponsorEvent(7, 14);
call sponsorEvent(7, 15);


call sponsorEvent(8, 3);
call sponsorEvent(8, 4);
call sponsorEvent(8, 5);
call sponsorEvent(8, 6);
call sponsorEvent(8, 11);
call sponsorEvent(8, 12);
call sponsorEvent(8, 13);


call sponsorEvent(9, 1);
call sponsorEvent(9, 3);
call sponsorEvent(9, 5);
call sponsorEvent(9, 7);
call sponsorEvent(9, 15);
call sponsorEvent(9, 16);
call sponsorEvent(9, 17);

insert into team_plays_game (game_id, team_id, bet_count) values(1, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(1, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(2, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(2, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(3, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(3, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(4, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(4, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(5, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(5, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(6, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(6, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(7, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(7, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(8, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(8, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(9, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(9, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(10, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(10, 9, 0);


insert into team_plays_game (game_id, team_id, bet_count) values(11, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(11, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(12, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(12, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(13, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(13, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(14, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(14, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(15, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(15, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(16, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(16, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(17, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(17, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(18, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(18, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(19, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(19, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(20, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(20, 9, 0);


insert into team_plays_game (game_id, team_id, bet_count) values(21, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(21, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(22, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(22, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(23, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(23, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(24, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(24, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(25, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(25, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(26, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(26, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(27, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(27, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(28, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(28, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(29, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(29, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(30, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(30, 9, 0);

insert into team_plays_game (game_id, team_id, bet_count) values(31, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(31, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(32, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(32, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(33, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(33, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(34, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(34, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(35, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(35, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(36, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(36, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(37, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(37, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(38, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(38, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(39, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(39, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(40, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(40, 9, 0);

insert into team_plays_game (game_id, team_id, bet_count) values(41, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(41, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(42, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(42, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(43, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(43, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(44, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(44, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(45, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(45, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(46, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(46, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(47, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(47, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(48, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(48, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(49, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(49, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(50, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(50, 9, 0);

insert into team_plays_game (game_id, team_id, bet_count) values(51, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(51, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(52, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(52, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(53, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(53, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(54, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(54, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(55, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(55, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(56, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(56, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(57, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(57, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(58, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(58, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(59, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(59, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(60, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(60, 9, 0);

insert into team_plays_game (game_id, team_id, bet_count) values(61, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(61, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(62, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(62, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(63, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(63, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(64, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(64, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(65, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(65, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(66, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(66, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(67, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(67, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(68, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(68, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(69, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(69, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(70, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(70, 9, 0);


insert into team_plays_game (game_id, team_id, bet_count) values(71, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(71, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(72, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(72, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(73, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(73, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(74, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(74, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(75, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(75, 9, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(76, 8, 0);
insert into team_plays_game (game_id, team_id, bet_count) values(76, 9, 0);


insert into game_score (game_id, team_score_id, team_score) values(1, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(1, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(2, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(2, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(3, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(3, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(4, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(4, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(5, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(5, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(6, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(6, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(7, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(7, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(8, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(8, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(9, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(9, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(10, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(10, 9, 0);


insert into game_score (game_id, team_score_id, team_score) values(11, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(11, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(12, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(12, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(13, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(13, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(14, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(14, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(15, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(15, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(16, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(16, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(17, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(17, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(18, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(18, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(19, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(19, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(20, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(20, 9, 0);


insert into game_score (game_id, team_score_id, team_score) values(21, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(21, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(22, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(22, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(23, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(23, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(24, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(24, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(25, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(25, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(26, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(26, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(27, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(27, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(28, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(28, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(29, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(29, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(30, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(30, 9, 0);

insert into game_score (game_id, team_score_id, team_score) values(31, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(31, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(32, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(32, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(33, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(33, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(34, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(34, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(35, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(35, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(36, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(36, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(37, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(37, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(38, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(38, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(39, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(39, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(40, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(40, 9, 0);

insert into game_score (game_id, team_score_id, team_score) values(41, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(41, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(42, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(42, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(43, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(43, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(44, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(44, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(45, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(45, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(46, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(46, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(47, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(47, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(48, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(48, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(49, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(49, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(50, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(50, 9, 0);

insert into game_score (game_id, team_score_id, team_score) values(51, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(51, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(52, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(52, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(53, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(53, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(54, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(54, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(55, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(55, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(56, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(56, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(57, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(57, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(58, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(58, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(59, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(59, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(60, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(60, 9, 0);

insert into game_score (game_id, team_score_id, team_score) values(61, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(61, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(62, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(62, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(63, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(63, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(64, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(64, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(65, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(65, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(66, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(66, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(67, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(67, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(68, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(68, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(69, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(69, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(70, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(70, 9, 0);


insert into game_score (game_id, team_score_id, team_score) values(71, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(71, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(72, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(72, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(73, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(73, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(74, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(74, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(75, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(75, 9, 0);
insert into game_score (game_id, team_score_id, team_score) values(76, 8, 0);
insert into game_score (game_id, team_score_id, team_score) values(76, 9, 0);

insert into team_players(team_id, user_id, player_status) values(1, 1, "pending");
insert into team_players(team_id, user_id, player_status) values(1, 2, "pending");
insert into team_players(team_id, user_id, player_status) values(1, 3, "pending");
insert into team_players(team_id, user_id, player_status) values(1, 4, "pending");

insert into team_players(team_id, user_id, player_status) values(2, 1, "pending");
insert into team_players(team_id, user_id, player_status) values(2, 2, "pending");
insert into team_players(team_id, user_id, player_status) values(2, 3, "pending");
insert into team_players(team_id, user_id, player_status) values(2, 4, "pending");
insert into team_players(team_id, user_id, player_status) values(1, 5, "pending");

insert into team_players(team_id, user_id, player_status) values(3, 5, "pending");
insert into team_players(team_id, user_id, player_status) values(3, 6, "pending");
insert into team_players(team_id, user_id, player_status) values(3, 7, "pending");

insert into team_players(team_id, user_id, player_status) values(4, 6, "pending");
insert into team_players(team_id, user_id, player_status) values(4, 7, "pending");
insert into team_players(team_id, user_id, player_status) values(4, 1, "pending");
insert into team_players(team_id, user_id, player_status) values(4, 2, "pending");
insert into team_players(team_id, user_id, player_status) values(4, 3, "pending");

insert into team_players(team_id, user_id, player_status) values(5, 4, "pending");
insert into team_players(team_id, user_id, player_status) values(5, 5, "pending");
insert into team_players(team_id, user_id, player_status) values(5, 6, "pending");

insert into team_players(team_id, user_id, player_status) values(6, 7, "pending");
insert into team_players(team_id, user_id, player_status) values(6, 1, "pending");
insert into team_players(team_id, user_id, player_status) values(6, 2, "pending");
insert into team_players(team_id, user_id, player_status) values(6, 3, "pending");
insert into team_players(team_id, user_id, player_status) values(6, 4, "pending");

insert into team_players(team_id, user_id, player_status) values(7, 5, "pending");
insert into team_players(team_id, user_id, player_status) values(7, 6, "pending");
insert into team_players(team_id, user_id, player_status) values(7, 7, "pending");


call creatorApprovesPlayer(1, 1, 1);
call creatorApprovesPlayer(2, 1, 1);
call creatorApprovesPlayer(3, 1, 1);
call creatorApprovesPlayer(4, 1, 1);

call creatorApprovesPlayer(1, 2, 2);
call creatorApprovesPlayer(2, 2, 2);
call creatorApprovesPlayer(5, 2, 2);

call creatorApprovesPlayer(5, 3, 5);
call creatorApprovesPlayer(6, 3, 5);
call creatorApprovesPlayer(7, 3, 5);

call creatorApprovesPlayer(6, 4, 11);
call creatorApprovesPlayer(2, 4, 11);
call creatorApprovesPlayer(3, 4, 11);

call creatorApprovesPlayer(4, 5, 14);
call creatorApprovesPlayer(5, 5, 14);
call creatorApprovesPlayer(6, 5, 14);

call creatorApprovesPlayer(7, 6, 16);
call creatorApprovesPlayer(1, 6, 16);
call creatorApprovesPlayer(2, 6, 16);
call creatorApprovesPlayer(4, 6, 16);

call creatorApprovesPlayer(5, 7, 17);
call creatorApprovesPlayer(6, 7, 17);
call creatorApprovesPlayer(7, 7, 17);
