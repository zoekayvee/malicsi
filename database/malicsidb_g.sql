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