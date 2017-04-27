'use strict'
const connection = require(__dirname + '/../db-connection.js');
var path = require('path');

exports.addTeam = (req, res, next) => {
	var query = 'call addTeam(?)';
	const data = [
		req.body.team_name
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Success");
				res.status(200).send("Success");
				return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.viewTeam = (req, res, next) => {
	var query = 'select * from team where team_id = ?';
	const data = [
		req.params.team_id
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);
				console.log("Success");
				res.status(200).send(row);
				//return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.viewAllTeam = (req, res, next) => {
	var query = 'call viewAllTeams()';

		var id = connection.query(
		query,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Success");
				res.status(200).send(row);
				//return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.viewTeamsInGame = (req, res, next) => {
	var query = 'select * from team where team_id NOT IN (select team_id from team_plays_game where game_id = ?)';

	var id = connection.query(
		query,
		[req.params.game_id],
		(err, row, fields) => {
			if(!err){
				console.log("Success viewing available teams");
				console.log(req.params.game_id);
				res.status(200).send(row);
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.viewAvailableTeams = (req, res, next) => {
	var query = 'select * from team where team_id != 1 and team_id != 2 and team_id != ?';

		var id = connection.query(
		query,
		[req.params.team_id],
		(err, row, fields) => {
			if(!err){
				console.log("Success viewing available teams");
				console.log(req.params.team_id);
				res.status(200).send(row);
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.updateTeam = (req, res, next) => {
	var query = 'call updateTeam(?,?)';
	const data = [
		req.body.team_id,
		req.body.team_name
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Update Team Success");
				res.status(200).send("Update Team Success");
				return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.deleteTeam = (req, res, next) => {
	console.log(1);
	var query = 'call deleteTeam(?)';
	const data = [
		req.params.team_id
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Delete Team Success");
				res.status(200).send("Delete Team Success");
				return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.deleteTeamFromEvent = (req, res, next) => {
	console.log(1);
	var query = 'delete from team_joins_event where team_id = ? and event_id = ?';
	const data = [
		req.body.team_id,
		req.body.event_id
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Delete Team Success");
				res.status(200).send("Delete Team Success");
				return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}




exports.teamJoinEvent = (req, res, next) => {
	var query = 'call teamJoinsEvent(?,?)';
	const data = [
		req.body.team_id,
		req.body.event_id
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Update Team Join Event Success");
				res.status(200).send("Update Team Join Event Success");
				return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.teamPlayGame = (req, res, next) => {
	var query = 'call updateTeamPlaysGame(?,?,?)';
	const data = [
		req.body.team_id,
		req.body.game_id,
		req.body.default_team_id
	];
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);
				console.log("Update Team Play Game Success");
				res.status(200).send("Update Team Play Game Success");
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}


exports.userJoinTeam = (req,res, next) => {
	var query = 'insert into team_players(team_id,user_id,player_status) values (?,?,?)';
	const data = [
		req.body.team_id,
		req.body.user_id,
		'pending'
		];

		var id = connection.query(
			query,
			data,
			(err,row,fields) => {
				if(!err){
					console.log(row);
					res.status(200).send(row);
					return row
				}
				else{
					console.log(err);
					res.status(500).send('server error');
				}
			})
}

exports.updateTeamPlayerStatus = (req,res, next) => {
	var query = 'UPDATE team_players SET player_status=? where team_id=? and user_id=?';
	const data = [
		req.body.status,
		req.body.team_id,
		req.body.user_id
		];

		var id = connection.query(
			query,
			data,
			(err,row,fields) => {
				if(!err){
					console.log(row);
					res.status(200).send(row);
					return row
				}
				else{
					console.log(err);
					res.status(500).send('server error');
				}
			})
}

exports.getTeamPlayers = (req,res, next) => {
	var query = 'select * from (select * from team_players natural join team)a natural join users where a.team_id=?';
	const data = [
		req.params.team_id
		];

		var id = connection.query(
			query,
			data,
			(err,row,fields) => {
				if(!err){
					console.log(row);
					res.status(200).send(row);
					return row
				}
				else{
					console.log(err);
					res.status(500).send('server error');
				}
			})
}

exports.deleteTeamPlayer = (req,res, next) => {
	var query = ' delete from team_players where team_id=? and user_id=?';
	const data = [
		req.params.team_id,
		req.body.user_id
		];
		var id = connection.query(
			query,
			data,
			(err, row, fields) => {
				if(!err){
					console.log(row);
					return row
				}
				else{
					console.log(err);
					res.status(500).send('Server error');
				}
		});
}


exports.getTeamId = (req, res, next) => {
	var query = 'select team_id from team where team_name = ?';
	const data = [
		req.params.team_name
		];

		var id = connection.query(
			query,
			data,
			(err,row,fields) => {
				if(!err){
					console.log(row);
					res.status(200).send(row);
					return row
				}
				else{
					console.log(err);
					res.status(500).send('server error');
				}
			})
}

exports.viewTeamPerEvent = (req,res,next) => {
	var query = 'select distinct  A.*, B.* from event as A join team as B JOIN team_joins_event as C where A.event_id = ? and A.event_id = C.event_id and B.team_id = C.team_id';
	const data = [
		req.params.event_id
	];
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Success");
				res.status(200).send(row);
				//return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}