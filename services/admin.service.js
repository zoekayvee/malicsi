'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.viewAllUsers=(req,res)=>{
	const query_string = 'SELECT * FROM users;';

	connection.query(query_string,null,(err,result) =>{
		if (!err) {
    		res.status(200).send(result);
			} else {
				console.log(err);
				res.status(500).send(err);
			}
	});
}
// removeUser - removes all instances of user in database (uses user_id)
exports.removeUser=(req,res)=>{
	
		const query_string = 'call deleteUser(?)';
		const req_data = [req.params.user_id];
		connection.query(query_string, req_data,(err,result) => {
			if (!err) {
    		res.status(200).send(result);
			} else {
				console.log(err);
				res.status(500).send(err);
			}
		});
}
exports.updateUserPassword= (req,res) =>{
	// const salt = bcrypt.genSaltSync(saltRounds);
	// const hash = bcrypt.hashSync(req.body.password, salt);

	// const query_string = 'UPDATE users SET password = ? WHERE user_id = ?';
	// const req_data = [hash,
	// 				  req.params.user_id];
 //    connection.query(query_string, req_data, (err,result) => {
 //    	if (!err) {
	// 		res.status(200).send(result);
	// 		} else {
	// 			console.log(err);
	// 			res.status(500).send(err);
	// 		}
 //    })

 	if(req.body.flag === "false"){
		//password not yet encrypted
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(req.body.password, salt);
		req.body.password=hash;
	}

	const query_string = 'UPDATE users SET username=?,password=?,college=?,height=?,weight=?,firstname=?,lastname=?,email=?,contactno=?,user_type=? WHERE user_id=?';

	const req_data = [
		req.body.username,
		req.body.password,
		req.body.college,
		req.body.height,
		req.body.weight,
		req.body.firstname,
		req.body.lastname,
		req.body.email,
		req.body.contactno,
		req.body.user_type,
		req.params.user_id
	];    

	connection.query(query_string, req_data, (err,result)=>{
		if(!err){
			res.status(200).send(result);
		}
		else{
			console.log(err);
			res.status(500).send(err);
		}
	})
} 

exports.approveUser = (req,res) =>{
	const query_string = 'UPDATE users SET user_type = "normal" WHERE user_id = ?';
	const req_data = [req.params.user_id];
    connection.query(query_string, req_data, (err,result) => {
    	if (!err) {
			res.status(200).send(result);
			} else {
				console.log(err);
				res.status(500).send(err);
			}
    })
} 

// addCompetitor - adds teams into game (makes use of tables: team, team_plays_game, game)
exports.addCompetitor = (req,res)=>{
	const competitor = {
		game_id: req.body.game_id,
		team_id: req.body.team_id
	};

	const query_string = 'INSERT INTO team_plays_game (game_id, team_id) VALUES (?,?)';
	const req_data = [competitor.game_id, competitor.team_id];

	connection.query(query_string, req_data, (err, result)=>{
		if(!err){
			res.status(200).send(result);
		}
		else{
			console.log(err);
			res.status(500).send(err);
		}
	});
}
// updateCompetitor - updates a team's score and bet count (specify which game)
exports.updateCompetitor=(req,res)=>{
	const query_string = 'UPDATE team_plays_game SET score = ?, bet_count = ? WHERE team_id = ? AND game_id = ?';
	const req_data = [
		req.body.score,
		req.body.bet_count,
		req.params.team_id,
		req.body.game_id
	];

	connection.query(query_string, req_data, (err,result)=>{
		if(!err){
			res.status(200).send(result);
		}
		else{
			console.log(err);
			res.status(500).send(err);
		}
	});
}

// deleteCompetitor - deletes a competitor from team_plays_game table
exports.deleteCompetitor=(req,res)=>{
	const query_string = 'DELETE FROM team_plays_game WHERE team_id = ?';
	const req_data = [req.params.team_id];

	connection.query(query_string, req_data, (err,result)=>{
		if(!err){
			res.status(200).send(result);
		}
		else{
			console.log(err);
			res.status(500).send(err);
		}
	});
}

exports.viewLogs=(req,res)=>{
	const query_string = 'SELECT DATE_FORMAT(log_timestamp,"%b %e %Y %r") Date, timestampdiff(minute,log_timestamp,now())Minutes,timestampdiff(hour,log_timestamp,now())Hour,TIME_TO_SEC(TIMEDIFF(now(),log_timestamp)) Seconds,message from logs where user_id = ? order by log_timestamp desc';
	const req_data = [req.params.user_id]
	connection.query(query_string, req_data, (err,result) =>{
		if(!err){
			res.status(200).send(result);
		}
		else{
			console.log(err);
			res.status(500).send(err);
		}
	});	
}
exports.viewAllLogs=(req,res)=>{
	const query_string = 'SELECT DATE_FORMAT(log_timestamp,"%b %e %Y %r") Date, timestampdiff(minute,log_timestamp,now())Minutes, timestampdiff(hour,log_timestamp,now())Hour,TIME_TO_SEC(TIMEDIFF(now(),log_timestamp)) Seconds,message from logs order by log_timestamp desc';
	connection.query(query_string, null, (err,result) =>{
		if(!err){
			res.status(200).send(result);
			console.log(result);
		}
		else{
			console.log(err);
			res.status(500).send(err);
		}
	});	
}


exports.addUser=(req,res)=>{
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(req.body.password, salt);

	//automatic normal user
	const query_string = 'INSERT INTO users (username, password, user_type, firstname, lastname, email,height,weight,college,contactno) VALUES (?,?,?,?,?,?,?,?,?,?)';
	const req_data = [
		req.body.username,
		hash,
		'normal',
		req.body.firstname,
		req.body.lastname,
		req.body.email,
		req.body.height,
		req.body.weight,
		req.body.college,
		req.body.contactno
	];
	
	connection.query(query_string, req_data, (err,rows)=>{
		if(!err){
			res.status(200).send(rows);
		}
		else{
			console.log(err);
			res.status(500).send(err);
		}
	});
}

exports.getUsersOfEvent = (req, res) =>  {
	const query_string = 'SELECT * from event NATURAL JOIN users';

	connection.query(query_string,(err,result) =>{
		if (!err) {
			console.log(result);
    		res.status(200).send(result);
		} else {
			console.log(err);
			res.status(500).send(err);
		}
	});
}