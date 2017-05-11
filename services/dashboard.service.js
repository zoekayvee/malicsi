'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');

exports.viewCurrentGame =  (req,res) => {
	const query_string = "SELECT venue_name, sport_name,game_id,DATE_FORMAT(date_start,'%M %e %Y') Date from game natural join sport natural join venue WHERE DATEDIFF(NOW(),date_start) = 0";
	//select current game on current event
	connection.query(query_string,null,(err,rows) =>{
		if(!err){
			res.status(200).send(rows);
		}
		else{
			res.status(500).send(err);
		}
	})
}
exports.viewUpcomingGame = (req,res) => {
	const query_string = "SELECT venue_name, sport_name,game_id,DATE_FORMAT(date_start,'%M %e %Y') Date from game natural join sport natural join venue WHERE DATEDIFF(date_start,NOW()) < 3 AND DATEDIFF(NOW(),date_start) != 0 ORDER BY Date ASC";
	//Check the next games in reference with the current game. e.g. If today is monday, select games on Tuesday
	connection.query(query_string,null,(err,rows) =>{
		if(!err){
			res.status(200).send(rows);
		}
		else{
			res.status(500).send(err);
		}
	})

}

exports.viewTeamPlayGame = (req,res) => {

	const query_string = "SELECT * FROM team NATURAL JOIN team_plays_game ORDER BY score DESC";


	connection.query(query_string,null,(err,rows) =>{
		if(!err){
			res.status(200).send(rows);
		}
		else{
			res.status(500).send(err);
		}
	})
}

exports.viewLatestEvent = (req,res) => {
	const query_string = "SELECT event_name,event.event_id,date_start,user_event.user_id User_From_Event from event JOIN user_event ON event.event_id = user_event.event_id where user_event.user_id = ? ORDER BY date_start";
	const data = [req.params.user_id];

	connection.query(query_string,data,(err,rows) =>{
		if(!err){
			res.status(200).send(rows[0]);
		}
		else{
			res.status(500).send(err);
		}
	})
}

exports.getPlayerRequests = (req, res, next) => {
	var query = 'select * from (select * from (select * from (select * from ( select event_id,event_name,date_start,date_end from users NATURAL JOIN event where event.status="accepted" and users.user_id=?)a natural join team_joins_event)b NATURAL JOIN team)c NATURAL JOIN team_players)d NATURAL JOIN users';
	const data = [
		req.params.user_id
	];
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);
				res.status(200).send(row);
				
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.approveTeamPlayer = (req,res) =>{
	const query_string = 'call creatorApprovesPlayer(?,?,?)';
	const req_data = [
		req.body.user_id,
		req.body.team_id,
		req.body.event_id
	];
    connection.query(query_string, req_data, (err,result) => {
    	if (!err) {
			res.status(200).send(result);
			} else {
				console.log(err);
				res.status(500).send(err);
			}
    })
} 

exports.disapproveTeamPlayer = (req,res) =>{
	const query_string = 'call creatorDisapprovesPlayer(?,?)';
	const req_data = [
		req.body.user_id,
		req.body.team_id
	];
    connection.query(query_string, req_data, (err,result) => {
    	if (!err) {
			res.status(200).send(result);
			} else {
				console.log(err);
				res.status(500).send(err);
			}
    })
} 

exports.viewEventUsingInterest = (req,res) => {
	const query_string = "SELECT DISTINCT event_id,event_name,sport_name FROM event JOIN (SELECT * from event_has_sport JOIN (select * from user_interests JOIN sport on user_interests.interests = sport_name where user_id=?) B ON B.sport_id = event_has_sport.h_sport_id) C ON event.event_id =h_event_id WHERE event_id NOT IN (SELECT event_id from user_event WHERE user_id = ?) and status='accepted'";
	const data = [req.params.user_id,req.params.user_id];

	connection.query(query_string,data,(err,rows) =>{
		if(!err){
			res.status(200).send(rows);
		}
		else{
			console.log(err)
			res.status(500).send(err);
		}
	})
}