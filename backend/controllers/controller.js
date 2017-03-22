'use strict'
const connection = require(__dirname + '/../lib/mysql');
var path = require('path');
///CRUDE EVENT///

//pa-change na lang ng convention of names for the master branch
exports.login=(req,res)=>{
	const user = {
		username: req.body.username,
		password: req.body.password
	};

	const query_string = 'SELECT username, password from user where username = BINARY ? AND password = BINARY ?';
	const req_data= [user.username, user.password];

	connection.query(query_string,req_data, (err,rows)=>{
		//this is where the connection to the database is being done, the rows will acquire the result of the query


		/*if(!req.body.username || !req.body.password) {
		    res.json({
				redirect: '/login' //landing page 
			});
		} */

		//I made this as a comment because the front-end/middleware can handle empty inputs

		if(!err) {
			/*if (req.session.username != undefined && req.session.username != rows[0].username){
	        	console.log('Login session is not yet finished...');
	            return res.status(404).send({message: 'Login session is not yet finished.'});
			}*/
			//I made this as a comment because I don't know if it is needed or not

			if(rows[0]){
				req.session.username = req.body.username
				res.status(200).send({message: 'valid account'});
				/*res.json({
					redirect: '/' //produces error , but needed
				});*/
			}
			else{
				res.json({
					redirect: '/login'
				});
			}
		}
		else
			//throw err;
			res.status(500).send(err);

	});

}

exports.logout=(req,res)=>{
	if(req.session){
		req.session.destroy(function(err){
			/*res.json({
				redirect: '/' //produces error
			});*/
		});
	}
}

exports.registerUser=(req,res)=>{
	//automatic normal user

	const query_string = 'call createUser(?,?,?,?,?)';
	const req_data = [
		req.body.username,
		req.body.password,
		'normal',
		req.body.firstname,
		req.body.lastname
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

// viewUser - views a user by ID (user_id)
exports.viewUser=(req, res)=>{

	const query_string = 'call viewUser(?)';
	const req_data = [req.params.user_id]

	connection.query(query_string, req_data, (err,result)=>{
		if(!err){
			res.status(200).send(result[0]);
		}
		else{
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

//userJoinsTeam - use team_players table to add the user
exports.userJoinsTeam=(req, res)=>{

	const query_string = 'call joinUserToTeam(?,?)';
	const req_data = [
		req.body.team_id,
		req.body.user_id
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

// viewAllCompetitors - views all competitors (teams) in a specific game;
exports.viewAllCompetitors=(req, res)=>{
	const query_string = 'call viewCompetitors(?)';
	const req_data = [req.params.game_id];

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

// viewCompetitor - views a specific competitor (by team_id)
exports.viewCompetitor=(req, res)=>{

	const query_string = 'call viewCompetitor(?)';
	const req_data = [req.params.team_id];

	connection.query(query_string, req_data, (err,result)=>{
		if(!err){
			res.status(200).send(result[0]);
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