/*
CMSC 128 MalICSi Database

Go to directory where malicsidb.sql is located or enter full path to file then run:
	mysql -u root -p < malicsidb.sql

*/
DROP USER "projectOneTwoEight"@"localhost";

CREATE USER "projectOneTwoEight"@"localhost" IDENTIFIED BY "password";

GRANT ALL PRIVILEGES ON malicsiDB.* TO "projectOneTwoEight"@"localhost" WITH GRANT OPTION;

DROP DATABASE IF EXISTS `malicsiDB`;

CREATE DATABASE IF NOT EXISTS `malicsiDB`;

USE `malicsiDB`;

create table users(
	user_id 		int unsigned auto_increment,
	username 		varchar(50) not null,
	password 		varchar(50) not null,
	user_type 		enum('admin','normal'),
	firstname 		varchar(50) not null,
	lastname 		varchar(50) not null,
	college 		varchar(50),
	contactno 		varchar(50),
	email 			varchar(100),
	weight 			int,
	height 			int,

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
	duration 		date,
	constraint 		event_id_pk primary key(event_id),
	constraint 		event_user_id_fk foreign key(user_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table team(
	team_id 		int unsigned auto_increment,
	team_name 		varchar(100) not null,
	constraint 		team_id_pk primary key(team_id)
);

create table team_players(
	team_id 		int unsigned,
	user_id 		int unsigned,
	constraint 		team_id_fk foreign key(team_id) references team(team_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		user_id_fk foreign key(user_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table team_joins_event(
	event_id 		int unsigned,
	team_id 		int unsigned,
	constraint 		event_id_pk primary key(event_id),
	constraint 		team_id_joins_event_fk foreign key(team_id) references team(team_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		team_joins_event_id_fk foreign key(event_id) references event(event_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table sport(
	sport_id 		int unsigned auto_increment,
	event_event_id	int unsigned,
	sport_name		varchar(100),
	constraint		event_event_id foreign key(event_event_id) references event(event_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint		sport_id_pk primary key(sport_id)
);

create table venue(
	venue_id 		int unsigned auto_increment,
	latitude 		float,
	longitude		float,
	address 		varchar(150),
	venue_name 		varchar(100),
	constraint 		venue_id_pk primary key(venue_id)
);


create table game(
	game_id 		int unsigned auto_increment,
	sport_id 		int unsigned,
	venue_id 		int unsigned,
	winner_team_id	int unsigned default NULL, 
	referee 		varchar(100),
	constraint 		venue_id foreign key(venue_id) references venue(venue_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		game_id_pk primary key(game_id)
);

create table team_plays_game(
	game_id 		int unsigned,
	team_id 		int unsigned,
	score 			int,
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
	CREATE TRIGGER userDelete AFTER DELETE ON users
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat("Deleted user: ", OLD.username));
			END;
%%
--PROCEDURES--
	--CRUD FOR SPORTS
	CREATE PROCEDURE sportInsert(in userid int unsigned, in eventid int unsigned, in sportname varchar(100))
		BEGIN
			INSERT INTO sport(event_event_id, sport_name) VALUES(eventid, sport_name);
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " added new Sport"));
		END;
%%

	CREATE PROCEDURE sportDelete(in userid int unsigned, in sportid int unsigned)
		BEGIN
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " delete sport ", (select sport_name from sport where sport_id = sportid)));
			DELETE FROM sport where sport_id = sportid;
		END;
%%

	CREATE PROCEDURE sportUpdate(in userid int unsigned, in sportid int unsigned, in newSportName varchar(100))
		BEGIN
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " updated", (select sport_name from sport where sport_id = sportid)," sport"));
			UPDATE sport SET sport_name = newSportName where sport_id = sportid;
		END;
%%

	CREATE PROCEDURE userViewAllSports(in userid int)
		BEGIN
			SELECT * from sport;
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid)," viewed all sports"));
		END;
%%

	CREATE PROCEDURE useViewSport(in userid int, in sportid int)
		BEGIN
			SELECT * FROM sport where spor_id = sportid;
			INSERT INTO Logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid)," viewed sport with id: ", sportid));
		END;
%%
	--CRUD FOR GAMES--
	CREATE PROCEDURE addGame(in userid int unsigned, in sportid int unsigned, in venueid int unsigned, in ref varchar(100))
		BEGIN
			INSERT INTO game(sport_id, venue_id, referee) VALUES(sportid, venueid, ref);
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " added new game"));
		END;
%%

	CREATE PROCEDURE deleteGame(in userid int unsigned, in gameid int unsigned)
		BEGIN
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " delete a sport"));
			DELETE FROM game where game_id = gameid;
		END;
%%
	
	CREATE PROCEDURE updateGame(in userid int unsigned, in gameid int unsigned, in newVenue int unsigned, in newSportId int unsigned)
		BEGIN
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " updated a game"));
			UPDATE game SET sport_id = newSportId, venue_id = newVenue where game_id = gameid;
		END;
%%
	CREATE PROCEDURE userViewAllGames(in userid int unsigned)
		BEGIN
			SELECT * FROM game;
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " viewed all games"));
		END;	
%%
	CREATE PROCEDURE userViewGame(in userid int unsigned, in gameid int unsigned)
		BEGIN
			SELECT * FROM game where game_id = gameid;
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid)," viewed game with id: ", gameid));
		END;
%%
	--Winner ADD--
	CREATE PROCEDURE addWinner(in userid int unsigned, in gameid int unsigned, in winnerid int unsigned)
		BEGIN
			UPDATE game SET winner_team_id = winnerid where game_id = gameid;
			INSERT INTO logs(useri_id, message) VALUES(userid, concat((select username from users where user_id = userid), " set ",(select team_name from team where team_id = winnerid), " as winner of game ", gameid));
		END;
%%

	CREATE PROCEDURE userViewAllWinners(in userid int unsigned)
		BEGIN
			SELECT winner_team_id from game;
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from user where user_id = userid), " viewed all winners"));
		END;
%%

	CREATE PROCEDURE userViewWinnerInGame(in user_id int unsigned, in gameid int unsigned)
		BEGIN
			SELECT winner_team_id from game where game_id = gameid;
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid)," viewed winner of game(id): ", gameid));
		END;
%%
	--User view Logs--
	CREATE PROCEDURE userViewLogs(in userid int unsigned)
		BEGIN
			SELECT * FROM logs;
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " viewed the logs"));
		END;

%%
DELIMITER ;