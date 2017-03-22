/*
CMSC 128 MalICSi Database

Go to directory where malicsidb.sql is located or enter full path to file then run:
	mysql -u root -p < malicsidb.sql

*/
drop database if exists malicsiDB;
create database malicsiDB;
use malicsiDB;

create table user(
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
	constraint 		user_id_pk primary key(user_id)
);

create table user_interests(
	user_id 		int unsigned,
	interests 		varchar(50),
	constraint 		user_interests_fk foreign key(user_id) references user(user_id)
);

create table logs(
	log_id 			int unsigned auto_increment,
	user_id 		int unsigned,
	log_timestamp 	date,
	message 		varchar(100),
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
	constraint 		event_user_id_fk foreign key(user_id) references user(user_id)
);

create table team(
	team_id 		int unsigned auto_increment,
	team_name 		varchar(100) not null,
	constraint 		team_id_pk primary key(team_id)
);

create table team_players(
	team_id 		int unsigned,
	user_id 		int unsigned,
	constraint 		team_id_fk foreign key(team_id) references team(team_id),
	constraint 		user_id_fk foreign key(user_id) references user(user_id)
);

create table team_joins_event(
	event_id 		int unsigned,
	team_id 		int unsigned,
	constraint 		event_id_pk primary key(event_id),
	constraint 		team_id_joins_event_fk foreign key(team_id) references team(team_id),
	constraint 		team_joins_event_id_fk foreign key(event_id) references event(event_id)
);

create table game(
	game_id 		int unsigned auto_increment,
	referee 		varchar(100),
	constraint 		game_id_pk primary key(game_id)
);

create table team_plays_game(
	game_id 		int unsigned auto_increment,
	team_id 		int unsigned,
	score 			int,
	bet_count 		int,
	constraint 		team_plays_game_id_fk foreign key(game_id) references game(game_id),
	constraint 		team_id_plays_game_fk foreign key(team_id) references team(team_id)

);

create table sport(
	sport_id 		int unsigned auto_increment,
	sport_name		varchar(100),
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

create table sponsor(
	sponsor_id 		int unsigned auto_increment,
	sponsor_name 	varchar(100),
	constraint 		sponsor_id_pk primary key(sponsor_id)
);

create table sponsor_events(
	sponsor_id 		int unsigned,
	event_id 		int unsigned,
	constraint 		sponsor_id_fk foreign key(sponsor_id) references sponsor(sponsor_id),
	constraint 		event_id_fk foreign key(event_id) references event(event_id)	
);

/* PROCEDURES */

/*CREATE USER/REGISTER*/
delimiter //
CREATE PROCEDURE createUser(in uname varchar(50), in pass varchar(50), in utype enum('admin', 'normal'), in fname varchar(50), in lname varchar(50))
BEGIN
	INSERT INTO user (username, password, user_type, firstname, lastname) VALUES (uname, ENCODE(pass, uname), utype, fname, lname);
END //
delimiter ;

/*VIEW ALL USERS*/
delimiter //
CREATE PROCEDURE viewUsers()
BEGIN
	SELECT * FROM user;
END //
delimiter ;

/*VIEW USER BY ID*/
delimiter //
CREATE PROCEDURE viewUser(in uid int(10))
BEGIN
	SELECT * FROM user WHERE user_id = uid;
END //
delimiter ;

/*UPDATE USER*/
delimiter //
CREATE PROCEDURE updateUser(in uid int(10), in fname varchar(50), in lname varchar(50), in ucollege varchar(50), in contact varchar(50), in mail varchar(100), in wt int(11), in ht int (11))
BEGIN
	UPDATE user SET firstname = fname, lastname = lname, college = ucollege, contactno = contact, email = mail, weight = wt, height = ht
	WHERE user_id = uid;
END //
delimiter;

/*CHANGE USER PASSWORD*/
delimiter //
CREATE PROCEDURE changePassword(in uname varchar(50), in pass varchar(50))
BEGIN
	UPDATE user SET password = ENCODE(pass, uname)
	WHERE username = uname;
END //
delimiter ;

/*DELETE USER*/
delimiter //
CREATE PROCEDURE deleteUser(in uid int(10))
BEGIN
	DELETE FROM event WHERE user_id = uid;
	DELETE FROM logs WHERE user_id = uid;
	DELETE FROM team_players WHERE user_id = uid;
	DELETE FROM user_interests WHERE user_id = uid;
	DELETE FROM user WHERE user_id LIKE uid;
END //
delimiter ;


/*CREATE COMPETITOR*/
delimiter //
CREATE PROCEDURE createCompetitor(in gid int(10), in tid int(10))
BEGIN
	INSERT INTO team_plays_game (game_id, team_id) VALUES (gid, tid);
END //
delimiter ;

/*VIEW ALL COMPETITORS*/
delimiter //
CREATE PROCEDURE viewCompetitors(in gid int(10))
BEGIN
	SELECT * FROM team t1, team_plays_game t2 WHERE t1.team_id = t2.team_id AND t2.game_id = gid;
END //
delimiter ;

/*VIEW COMPETITOR BY ID*/
delimiter //
CREATE PROCEDURE viewCompetitor(in tid int(10))
BEGIN
	SELECT * FROM team t1, team_plays_game t2 WHERE t1.team_id = tid AND t1.team_id = t2.team_id;
END //
delimiter ;

/*UPDATE COMPETITOR INFORMATION*/
delimiter //
CREATE PROCEDURE updateCompetitor(in sc int(11), in bet int(11), in tid int(10), in gid int(10))
BEGIN
	UPDATE team_plays_game SET score = sc, bet_count = bet WHERE team_id = tid AND game_id = gid;
END //
delimiter ;

/*DELETE COMPETITOR*/
delimiter //
CREATE PROCEDURE deleteCompetitor(in tid int(10))
BEGIN
	DELETE FROM team_plays_game WHERE team_id = tid;
END //
delimiter ;

/*INSERT USER TO TEAM*/
delimiter //
CREATE PROCEDURE joinUserToTeam(in tid int(10), in uid int(10))
BEGIN
	INSERT INTO team_players (team_id, user_id) VALUES (tid, uid);
END //
delimiter ;


INSERT INTO user (user_type, username, password, firstname, lastname) VALUES ('admin', 'klmtan', ENCODE('katkat', 'klmtan'), 'Katherine Loren', 'Tan');
INSERT INTO user (user_type, username, password, firstname, lastname) VALUES ('normal', 'messi', ENCODE('messi', 'messi'), 'DoYouLike','Messi');