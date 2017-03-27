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

<<<<<<< HEAD
/*ADD EVENT*/
delimiter //
	create procedure addEvent(
							  in userId int,
							  in eventName varchar(100),
							  in dateStart date,
							  in dateEnd date
							  )
	BEGIN
		insert into event(user_id,event_name,date_start,date_end,duration)  
		values(
			userId,
			eventName,
			dateStart,
			dateEnd,
			datediff(dateStart,dateEnd)
			);
	END;
	//
delimiter ;


/*VIEW EVENT*/
delimiter //
	create procedure viewEvent(
							 in eventId INT(5)
							  )
	BEGIN
		select * from event where event_id = eventId;
	END;
	//
delimiter ;


/*VIEW ALL EVENT*/
delimiter //
	create procedure viewAllEvent()
	BEGIN
		select * from event;
	END;
	//
delimiter ;


/*UPDATE EVENT*/
delimiter //
	create procedure updateEvent(
							 in eventId int,
							 in eventName VARCHAR(100),
							 in allowReg boolean,
							 in dateStart date,
							 in dateEnd date
							 )
	BEGIN
		update event set event_name = eventName, allow_reg = allowReg, date_start = dateStart, date_end = dateEnd, duration = datediff(dateStart,dateEnd) where event_id = eventId; 
	END;
	//
delimiter ;


/*DELETE EVENT*/
delimiter //
	create procedure deleteEvent(
							 in eventId int
							 )
	BEGIN
		delete from event where event_id = eventId;
	END;
	//
delimiter ;


/*ADD TEAM*/
delimiter //
	create procedure addTeam(
							  in teamName varchar(100)
							  )
	BEGIN
		insert into team(team_name)  
		values(
			teamName
			);
	END;
	//
delimiter ;

/*VIEW TEAM*/
delimiter //
	create procedure viewTeam(
							  in teamiD int
							  )
	BEGIN
		select * from team where team_id = teamiD;
	END;
	//
delimiter ;

/*VIEW ALL TEAMS*/
delimiter //
	create procedure viewAllTeam()
							  
	BEGIN
		select * from team;
	END;
	//
delimiter ;



/*UPDATE TEAM*/
delimiter //
	create procedure updateTeam(
							 in teamId int,
							 in teamName varchar(100)							 
							 )
	BEGIN
		update team set team_name = teamName where team_id = teamId; 
	END;
	//
delimiter ;


/*DELETE TEAM*/
delimiter //
	create procedure deleteTeam(
							 in teamId int
							 )								 
	BEGIN
		delete from team where team_id = teamId; 
	END;
	//
delimiter ;


/*TEAM JOIN EVENT*/
delimiter //
	create procedure teamJoinEvent(
							 in teamId int,
							 in eventId int
							 )
	BEGIN
		insert into team_joins_event(event_id,team_id) values(eventId,teamId);
	END;
	//
delimiter ;


/*TEAM PLAY GAME*/
delimiter //
	create procedure teamPlayGame(
							 in teamId int,
							 in gameId int
							 )
	BEGIN
		insert into team_plays_game(game_id,team_id,score,bet_count) values(gameId,teamId,0,0);
	END;
	//
delimiter ;

/*ADD SPONSOR*/
delimiter //
	create procedure addSponsor(
							  in sponsor_name varchar(100)
							  )
	BEGIN
		insert into sponsor(sponsor_name)  
		values(
			
			sponsor_name
			);
	END;
	//
delimiter ;


/*ADD SPONSOR EVENT*/
delimiter //
	create procedure sponsorEvent(
							  in sponsorId int,
							  in eventId int
							  )
	BEGIN
		insert into sponsor_events(sponsor_id, event_id)  
		values(
			sponsorId,
			eventId
			);
	END;
	//
delimiter ;

/*VIEW ALL SPONSORS*/
delimiter //
	create procedure viewAllSponsors()
	BEGIN
		select * from sponsor;
	END;
	//
delimiter ;

/*VIEW SPONSOR*/
delimiter //
	create procedure viewSponsor(
								in sponsorId int
		)
	BEGIN
		select * from sponsor where sponsor_id = sponsorId;
	END;
	//
delimiter ;



/*VIEW SPONSOR BY EVENT*/
delimiter //
	create procedure viewSponsorByEvent(
								in eventId int
		)
	BEGIN
		select * from sponsor_events where event_id = eventId;
	END;
	//
delimiter ;




/*UPDATE SPONSOR*/
delimiter //
	create procedure updateSponsor(
							 in sponsorId int,
							 in sponsorName varchar(100)
							 )
	BEGIN
		update sponsor set sponsor_name=sponsorName where sponsor_id=sponsorId;
	END;
	//
delimiter ;

/*DELETE SPONSOR*/
delimiter //
	create procedure deleteSponsor(
							 in sponsorId int
							 )
	BEGIN
		delete from sponsor where sponsor_id = sponsorId;
	END;
	//
delimiter ;


insert into user(username,password,firstname,lastname) values ('dummy','dummy','dummy','dummy');
=======
/* PROCEDURES */

/* LOGIN */
delimiter //
CREATE PROCEDURE login(in uname varchar(50), in pass varchar(50))
BEGIN
    SELECT user_id,username FROM user WHERE username = BINARY uname and password = BINARY ENCODE(pass, uname);
END
//
delimiter ;

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
delimiter ;

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

/*INSERT INTO user (user_type, username, password, firstname, lastname) VALUES ('admin', 'klmtan', ENCODE('katkat', 'klmtan'), 'Katherine Loren', 'Tan');
INSERT INTO user (user_type, username, password, firstname, lastname) VALUES ('normal', 'messi', ENCODE('messi', 'messi'), 'DoYouLike','Messi');
*/
call createUser('jccabanlong', 'password1', 'normal', 'John Cristopher', 'Cabanlong');
call createUser('ayaseco', 'password2', 'normal', 'Aizaya', 'Seco');
call createUser('norielsotto', 'password3', 'normal', 'Noriel', 'Sotto');
call createUser('zoevillanueva', 'password4', 'normal', 'Zoe Kirsten', 'Villanueva');
call createUser('marcomanongsong', 'password5', 'normal', 'Marco', 'Manongsong');
call createUser('nj isip', 'password6', 'normal', 'NJ', 'Isip');
call createUser('krisantaagdan', 'password7', 'normal', 'Krisanta', 'Agdan');
call createUser('josephgonzales', 'password8', 'normal', 'Joseph Gabriel', 'Gonzales');
call createUser('jilliancada', 'password9', 'normal', 'Jillian', 'Cada');
call createUser('ianvalle', 'password10', 'normal', 'Ian Dominic', 'Valle');
call createUser('ivanalberto', 'password11', 'normal', 'Ivan', 'Alberto');
call createUser('yvesstaana', 'password12', 'normal', 'Yves', 'Sta. Ana');
call createUser('loisgo', 'password13', 'normal', 'Lois', 'Go');
call createUser('vanessaromero', 'password14', 'normal', 'Vanessa', 'Romero');
call createUser('annejerusalem', 'password15', 'normal', 'Anne', 'Jerusalem');
call createUser('isaaccarvajal', 'password16', 'normal', 'Nathaniel Isaac', 'Carvajal');
call createUser('gelloguiam', 'password17', 'normal', 'Gello', 'Guiam');
call createUser('jessicavaldez', 'password18', 'normal', 'Jessica', 'Valdez');
call createUser('vinceliwag', 'password19', 'normal', 'Jay Vince', 'Liwag');
call createUser('jianredfaustino', 'password20', 'normal', 'Jianred', 'Faustino');
call createUser('elektrafeir', 'password21', 'normal', 'Elektra', 'Feir');
>>>>>>> 6f2cce2764e1a72460c89b94cc4a6b0e3e3f4b2c
