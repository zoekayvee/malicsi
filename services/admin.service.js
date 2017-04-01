'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');
var CryptoJS = require('crypto-js');
// viewAllUsers - views all users
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

// updateUser - updates user information (uses user_id)
exports.updateUser=(req,res)=>{

		const query_string = 'call updateUser(?,?,?,?,?,?,?,?,?,?)';
		const req_data = [
			req.params.user_id,
			req.body.username,
			CryptoJS.AES.encrypt(req.body.password, req.body.username).toString(),
			req.body.firstname,
			req.body.lastname,
			req.body.college,
			req.body.contactno,
			req.body.email,
			req.body.weight,
			req.body.height
		];
		connection.query(query_string, req_data,(err,result) => {
			if (!err) {
    		res.status(200).send(result);
			} else {
				console.log(err);
				res.status(500).send(err);
			}
		});
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
	const query_string = "SELECT users.user_id,message,firstname FROM logs RIGHT JOIN users ON logs.user_id = users.user_id";

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
