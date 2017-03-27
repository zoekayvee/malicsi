<<<<<<< HEAD
=======
/*
CMSC 128 MalICSi Database

Go to directory where malicsidb.sql is located or enter full path to file then run:
	mysql -u root -p < malicsidb.sql

*/
--comment 1st line on the first run || if user does not existssssss
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


create table venue(
	venue_id 		int unsigned auto_increment,
	latitude 		float,
	longitude		float,
	address 		varchar(150),
	venue_name 		varchar(100),
	constraint 		venue_id_pk primary key(venue_id)
);

create table sport(
	sport_id 		int unsigned auto_increment,
	sport_name		varchar(100),
	sport_event_id 	int unsigned,
	constraint		sport_id_pk primary key(sport_id),
	constraint 		sport_event_id_fk foreign key(sport_event_id) references event(event_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table game(
	game_id 		int unsigned auto_increment,
	sport_id 		int unsigned,
	venue_id 		int unsigned,
	winner_team_id	int unsigned,
	referee 		varchar(100),
	constraint 		game_id_pk primary key(game_id),
	constraint 		sport_id_fk foreign key(sport_id) references sport(sport_id) ON DELETE CASCADE ON UPDATE CASCADE,
	constraint 		venue_id_fk	foreign key(venue_id) references venue(venue_id) ON DELETE CASCADE ON UPDATE CASCADE
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
---TRIGGERS---
	--USER INSERT AND DELETE--
	CREATE TRIGGER userInsert AFTER INSERT ON users
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(NEW.user_id, concat("Created new user with username: ", NEW.username));
			END; 
%%
	CREATE TRIGGER userDelete AFTER DELETE ON users
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat("Deleted user: ", OLD.username));
			END;
%%
	CREATE TRIGGER userCreateEvent AFTER INSERT ON event
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(NEW.user_id, concat((select username from users where user_id = NEW.user_id)," created new event"));
			END;
%%
--PROCEDURES--
	--SPORTS--
	CREATE PROCEDURE sportUpdate(in userid int unsigned, in sportid int unsigned, in sportname varchar(100))
		BEGIN
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " updated ", (select sport_name from sport where sport_id = sportid), "'s name to", sportname));
		
			UPDATE sport SET sport_name = sportname where sport_id = sportid;
		END;

%%
	CREATE PROCEDURE userViewAllSports(in userid int unsigned)
		BEGIN
			SELECT * from sport;
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid)," viewed all sports"));
		END;

%%
	CREATE PROCEDURE userViewSport(in userid int unsigned, in sportid int unsigned)
		BEGIN
			SELECT * FROM sport where sport_id = sportid;
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid)," viewed sport with id: ", (select sport_name from sport where sport_id = sportid)));
		END;

%%
	--GAME--
	CREATE PROCEDURE gameUpdate(in userid int unsigned, in gameid int unsigned, in winnerTeamId int unsigned)
		BEGIN
			INSERT INTO logs(user_id, message) VALUES(userid, concat((select username from users where user_id = userid), " updated game "));
		
			UPDATE game SET winner_team_id = winnerTeamId where game_id = gameid;
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
	--View WINNERS--
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
<<<<<<< HEAD
DELIMITER ;
>>>>>>> 5a6394d17c265f7ef6d52968c0ac5749adbb4d4a
=======
	CREATE PROCEDURE insertDummyUser()
		BEGIN
			INSERT INTO users(username, password, user_type, firstname, lastname, college, contactno, email, weight, height) VALUES("Tester", password("test"), "admin", "Nn", "Mm","CAS", 09166994203, "nMm@asdf.com", 1, 1);
		END;
%%
DELIMITER ;
>>>>>>> 3ae493ea4ef9832602aedc86341ca0d7c0817e52
