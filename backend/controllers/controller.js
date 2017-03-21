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

	const newUser = {
		username: req.body.username,
		password: req.body.password,
		firstname: req.body.firstname,
		lastname: req.body.lastname
	};

	const query_string = 'INSERT INTO users (username, password, user_type, firstname, lastname) VALUES (?,?,?,?,?)';
	const req_data= [newUser.username, newUser.password, 'normal', newUser.firstname, newUser.lastname];
	
	connection.query(query_string, req_data,(err, result)=> {
		if (!err) {
    		res.status(200).send(result);
		} else {
			console.log(err);
			res.status(500).send(err);
		}
   });
}

// removes user by username
exports.removeUser=(req,res)=>{
		const user = {
			username : req.body.username
		};

		const query_string = 'DELETE FROM user WHERE username = ?';
		const req_data = [user.username];
		connection.query(query_string, req_data,(err,result) => {
			if (!err) {
    		res.status(200).send(result);
			} else {
				console.log(err);
				res.status(500).send(err);
			}
		});
}

exports.updateUser=(req,res)=>{
		const user = {
			oldUsername:req.body.oldUsername,
			username: req.body.username,
			password: req.body.password,
			firstname: req.body.firstname,
			lastname: req.body.lastname	
		};

		const query_string = 'UPDATE user SET username = ?,password = ?,firstname = ?,lastname = ? where username = ?';
		const req_data = [user.username,user.password,user.firstname,user.lastname,user.oldUsername];
		connection.query(query_string, req_data,(err,result) => {
			if (!err) {
    		res.status(200).send(result);
			} else {
				console.log(err);
				res.status(500).send(err);
			}
		});
}

exports.viewUsers=(req,res)=>{
	const query_string = "SELECT user_id,username FROM user";

	connection.query(query_string,null,(err,result) =>{
		if (!err) {
    		res.status(200).send(result);
			} else {
				console.log(err);
				res.status(500).send(err);
			}
	});
}

//getUser - retrieves only ONE user (gets user by ID)
exports.getUser=(req, res)=>{

	const _user = {
		user_id: req.body.user_id
	};

	const query_string = 'SELECT user_id, username, firstname, lastname, college, contactno, email, weight, height FROM user WHERE user_id = ?';
	const req_data = [_user.user_id];

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

//userJoinsTeam - use team_players table to add the user
exports.userJoinsTeam=(req, res)=>{

	const _user = {
		team_id: req.body.team_id,
		user_id: req.body.user_id
	};

	const query_string = 'INSERT INTO team_players (team_id, user_id) VALUES (?,?)';
	const req_data = [_user.team_id, _user.user_id];

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

// get all competitors
exports.getCompetitors=(req, res)=>{
	const query_string = 'SELECT t1.team_name FROM team t1, team_plays_game t2 WHERE t1.team_id = t2.team_id';

	connection.query(query_string, null, (err,result)=>{
		if(!err){
			res.status(200).send(result);
		}
		else{
			console.log(err);
			res.status(500).send(err);
		}
	});
}

exports.viewLog = (req,res) => {
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

//getUsers- for profile and other fxns
//getUsers
//getUserInterests
//userJoinsTeam -use team_players table to add the user
//joinedTeams - use team_players, team, user tables
//getUserLogs - use logs and user tables (natural join niyo na lang dahil sa user_id)
//getparticipatingEvent - use  event and user tables (natural join niyo na lang)

//dagdagan niyo pa ayaw ko na mag-isip T_T