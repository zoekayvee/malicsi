'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');
///CRUDE EVENT///

exports.login=(req,res)=>{
	const user = {
		username: req.body.username,
		password: req.body.password
	};

	const query_string = 'call login(?,?)';
	const req_data= [user.username, user.password];

	connection.query(query_string,req_data, (err,rows)=>{
		//this is where the connection to the database is being done, the rows will acquire the result of the query
		if(!err) {
			if(rows[0]){
				req.session.accountid = rows[0][0].user_id
				var json =  JSON.parse((JSON.stringify(req.session)));
				console.log(json);
				res.json({
					redirect: '/'
				});
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
			res.json({
				redirect: '/'
			});
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