'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');

// viewAllUsers - views all users
exports.viewAllUsers=(req,res)=>{
	const query_string = 'call viewUsers()';

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

		const query_string = 'call updateUser(?,?,?,?,?,?,?,?)';
		const req_data = [
			req.params.user_id,
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

	const query_string = 'call createCompetitor(?,?)';
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

	const query_string = 'call updateCompetitor(?,?,?,?)';
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
	const query_string = 'call deleteCompetitor(?)';
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
	const query_string = 'SELECT user_id,message FROM logs';

	connection.query(query_string, null, (err,result) =>{
		if(!err){
			res.status(200).send(result);
		}
		else{
			console.log(err);
			res.status(500).send(err);
		}
	});
}