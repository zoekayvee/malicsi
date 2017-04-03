/*
CMSC 128 MalICSi Database

Go to directory where malicsidb.sql is located or enter full path to file then run:
	mysql -u root -p < malicsidb.sql

*/

DROP DATABASE `malicsiDB`;

CREATE DATABASE IF NOT EXISTS `malicsiDB`;

USE `malicsiDB`;

create table users(
	user_id 		int unsigned auto_increment,
	username 		varchar(50) not null,
	password 		varchar(100) not null,
	user_type 		enum('admin','normal'),
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

	UNIQUE			(event_name),
	constraint 		event_id_pk primary key(event_id),
	constraint 		event_user_id_fk foreign key(user_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

/*the triggers were tested up until here*/

create table team(
	team_id 		int unsigned auto_increment,
	team_name 		varchar(100) not null,

	UNIQUE			(team_name),
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

	UNIQUE			(sport_name),
	constraint		event_event_id foreign key(event_event_id) references event(event_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint		sport_id_pk primary key(sport_id)
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
	date_start		datetime,
	duration		int,
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
	-- USER
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
	-- USER INTERESTS
	CREATE TRIGGER userInterestInsert AFTER INSERT ON user_interests
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(NEW.user_id, concat("Created new interest : ", NEW.interests));
			END;
%%
	CREATE TRIGGER userInterestUpdate AFTER UPDATE ON user_interests
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat("Updated his/her interest : ", NEW.interests));
			END;
%%
	CREATE TRIGGER userInterestDelete AFTER DELETE ON user_interests
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat("Deleted his/her interest : ", OLD.interests));
			END;

%%
	-- SPONSOR
	CREATE TRIGGER sponsorInsert AFTER INSERT ON sponsor
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(sponsor_id, message) VALUES(NEW.sponsor_id, concat("Created new sponsor with sponsor name: ", NEW.sponsor_name));
			END;
%%
	CREATE TRIGGER sponsorUpdate AFTER UPDATE ON sponsor
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(sponsor_id, message) VALUES(OLD.sponsor_id, concat("Updated sponsor profile with sponsor name: ", NEW.sponsor_name));
			END;
%%
	CREATE TRIGGER sponsorDelete AFTER DELETE ON sponsor
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(sponsor_id, message) VALUES(OLD.sponsor_id, concat("Deleted sponsor: ", OLD.sponsor_name));
			END;
%%
	--SPONSOR OF EVENTS
CREATE TRIGGER sponsorEventInsert AFTER INSERT ON sponsor_events
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(sponsor_id, message) VALUES(NEW.sponsor_id, concat("Sponsor with ID: ", NEW.sponsor_id, "sponsored event with event ID: ",NEW.event_id ));
			END;
%%
	CREATE TRIGGER sponsorEventUpdate AFTER UPDATE ON sponsor_events
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(sponsor_id, message) VALUES(OLD.sponsor_id, concat("Sponsor with ID: ", OLD.sponsor_id, "updated sponsoring on event with event ID: ",OLD.event_id ));
			END;
%%
	CREATE TRIGGER sponsorEventDelete AFTER DELETE ON sponsor_events
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(sponsor_id, message) VALUES(OLD.sponsor_id, concat("Sponsor with ID: ", OLD.sponsor_id, "stopped sponsoring on event with event ID: ",OLD.event_id ));
			END;
%%
	--COMPETITOR/TEAM
	CREATE TRIGGER competitorInsert AFTER INSERT ON team
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(team_id, message) VALUES(NEW.team_id, concat("Created new competitor : ", NEW.team_name));
			END;
%%
	CREATE TRIGGER competitorUpdate AFTER UPDATE ON team
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(team_id, message) VALUES(OLD.team_id, concat("Updated the competitor : ", NEW.team_name));
			END;
%%
	CREATE TRIGGER competitortDelete AFTER DELETE ON team
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(team_id, message) VALUES(OLD.team_id, concat("Deleted the competitor : ", OLD.team_name));
			END;

%%
	-- EVENT
	CREATE TRIGGER eventInsert AFTER INSERT ON event
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(NEW.user_id, concat(" User ",NEW.user_id," created new event with event name: ", NEW.event_name));
			END;
%%

	CREATE TRIGGER eventUpdate AFTER UPDATE ON event
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat(" User ",OLD.user_id," Updated an event with event name: ", NEW.event_name));
			END;
%%
	CREATE TRIGGER eventDelete AFTER DELETE ON event
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(event_id, message) VALUES(OLD.event_id, concat("Deleted an event with event name: ", OLD.event_name));
			END;
%%
	-- VENUE
	CREATE TRIGGER venueInsert AFTER INSERT ON venue
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(venue_id, message) VALUES(NEW.venue_id, concat("Created new venue with name: ", NEW.venue_name));
			END;
%%
	CREATE TRIGGER venueUpdate AFTER UPDATE ON venue
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(venue_id, message) VALUES(OLD.venue_id, concat("Updated venue with name: ", NEW.venue_name));
			END;
%%
	CREATE TRIGGER venueDelete AFTER DELETE ON venue
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(venue_id, message) VALUES(OLD.venue_id, concat("Deleted venue with name: ", OLD.venue_name));
			END;
%%
	-- SPORTS
	CREATE TRIGGER sportInsert AFTER INSERT ON sport
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(sport_id, message) VALUES(NEW.sport_id, concat("Added sport with ID : ", NEW.sport_id));
			END;
%%
	CREATE TRIGGER sportUpdate AFTER UPDATE ON sport
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(sport_id, message) VALUES(OLD.sport_id, concat("Updated sport with ID : ", OLD.sport_id));
			END;
%%

	CREATE TRIGGER sportDelete AFTER DELETE ON sport
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(sport_id, message) VALUES(OLD.sport_id, concat("Deleted sport with ID : ", OLD.sport_id));
			END;
%%
	-- GAME
	CREATE TRIGGER gameInsert AFTER INSERT ON game
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(game_id, message) VALUES(NEW.game_id, concat("Added new game with ID : ", NEW.game_id));
			END;
%%
	CREATE TRIGGER gameUpdate AFTER UPDATE ON game
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(game_id, message) VALUES(OLD.game_id, concat("Updated new game with ID : ", OLD.game_id));
			END;
%%
	CREATE TRIGGER gameDelete AFTER DELETE ON game
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(game_id, message) VALUES(OLD.game_id, concat("Deleted new game with ID : ", OLD.game_id));
			END;
	-- TEAM's PLAYERS
	-- TEAM PLAYS IN EVENT
	-- TEAM PLAYS IN A GAME
%%
	/* END OF TRIGGERS */
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
	CREATE PROCEDURE userViewAllWinners(in userid int unsigned)
		BEGIN
			SELECT winner_team_id from game;
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " viewed all winners"));
		END;
%%
	CREATE PROCEDURE userViewWinnerInGame(in user_id int unsigned, in gameid int unsigned)
		BEGIN
			SELECT winner_team_id from game where game_id = gameid;
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid)," viewed winner of game(id): ", gameid));
		END;
%%
	/*ADDED Procedures*/
	CREATE PROCEDURE login(in uname varchar(50), in pass varchar(100))
		BEGIN
			SELECT user_id,username,user_type FROM users WHERE username = BINARY uname and password = BINARY pass;
		END;
%%
	CREATE PROCEDURE createUser(in uname varchar(50), in pass varchar(100), in utype enum('admin', 'normal'), in fname varchar(50), in lname varchar(50), in em varchar(100))
		BEGIN
			INSERT INTO users (username, password, user_type, firstname, lastname, email) VALUES (uname, pass, utype, fname, lname, em);
		END;
%%
	CREATE PROCEDURE updateUser(in uid int(10), in uname varchar(50), in pass varchar(100), in fname varchar(50), in lname varchar(50),in gtype enum('F','M') , in ucollege varchar(50), in contact varchar(50), in mail varchar(100),in loc varchar(100) ,in wt int(11), in ht int (11), in ag int(3))
		BEGIN
			UPDATE users SET username=uname, password=pass, firstname = fname, lastname = lname, gender=gtype,college = ucollege, contactno = contact, email = mail, location=loc, weight = wt, height = ht, age=ag WHERE user_id = uid;
		END;
%%
	CREATE PROCEDURE deleteUser(in uid int(10))
		BEGIN
			DELETE FROM event WHERE user_id = uid;
			DELETE FROM logs WHERE user_id = uid;
			DELETE FROM team_players WHERE user_id = uid;
			DELETE FROM user_interests WHERE user_id = uid;
			DELETE FROM users WHERE user_id LIKE uid;
		END;
%%
DELIMITER ;
