'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');
var logQuery = 'INSERT INTO logs(user_id,log_timestamp,message) VALUES(?,curdate(),?);';

exports.addGame = (req,res) =>{
	var query = 'INSERT INTO game(sport_id,venue_id,winner_team_id,referee) VALUES(?,?,?,?)';
	const data = [
		req.body.sport_id,
		req.body.venue_id,
		req.body.winner_team_id,
		req.body.referee
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Adding Game Success");
		    	res.send('Game Successfully added');
				connection.query(logQuery, [null,'Added Game # '], (err,rows) => {})
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

exports.viewGameBySportId = (req,res) =>{
	// SELECT distinct G.game_id, G.date_start,V.venue_name, A.team_name, B.team_name as team_name_2	, G.referee FROM team A, team B, game G, venue V, sport S WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = ?) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = ?) AND A.team_id != B.team_id and V.venue_id = G.venue_id and G.sport_id = S.sport_id and G.sport_id = ?
	var query = 'SELECT * FROM game WHERE sport_id = ?';
	const data = [
		req.params.sport_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Viewing Game Successs");
				res.send(rows);
				// connection.query(logQuery, [null,'Viewed Game # '], (err,rows) => {})
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

exports.viewGame = (req,res) =>{
	// SELECT G.game_id,, A.team_name, B.team_name as team_name_2 FROM team A, team B, game G, venue V, sport S WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = ?) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = ?) AND A.team_id != B.team_id;
	// var query = 'SELECT S.sport_name, G.game_id, A.team_name, B.team_name as team_name_2 FROM team A, team B, game G, venue V, sport S WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = ?) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = ?) AND A.team_id != B.team_id AND S.sport_id = G.sport_id LIMIT 1';
	var query = 'SELECT distinct S.sport_name, G.game_id, A.team_name, T1.score, T1.bet_count, B.team_name as team_name_2, T2.score as score_2, T2.bet_count as bet_count_2 FROM team A, team B, game G, venue V, sport S,team_plays_game T1,team_plays_game T2 WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = ?) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = ?) AND A.team_id != B.team_id AND S.sport_id = G.sport_id AND T1.team_id = A.team_id AND T2.team_id = B.team_id AND T1.game_id = T2.game_id AND T1.game_id = ? AND G.game_id = ? LIMIT 1';
	const data = [
		req.params.game_id,
		req.params.game_id,
		req.params.game_id,				
		req.params.game_id
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Viewing Game Success");
				res.send(rows[0]);
				connection.query(logQuery, [null,'Viewed Game # '], (err,rows) => {})
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

exports.viewScheds = (req,res) =>{
	// SELECT distinct G.game_id, S.sport_name, V.venue_name, A.team_name, B.team_name, G.referee FROM team A, team B, game G, venue V, sport S WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = 1) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = 1) AND A.team_id != B.team_id and G.game_id = 1 and V.venue_id = G.venue_id and G.sport_id = S.sport_id and G.sport_id = 1;

	// SELECT G.game_id, V.venue_name, A.team_name, B.team_name, G.referee FROM team A, team B, game G, venue V WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = 1) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = 1) AND A.team_id != B.team_id and G.game_id = 1 and V.venue_id = 1;
	// SELECT distinct G.game_id, G.date_start,V.venue_name, A.team_name, B.team_name, G.referee FROM team A, team B, game G, venue V, sport S WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = 1) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = 1) AND A.team_id != B.team_id and G.game_id = 1 and V.venue_id = G.venue_id and G.sport_id = S.sport_id and G.sport_id = 1 LIMIT 1;
	// var query = 'select game_id,date_start,venue_name,team_name,referee from game natural join sport natural join venue natural join team where sport_id = ? order by game_id';
	var query = 'SELECT distinct G.game_id, G.date_start,V.venue_name, A.team_name, B.team_name as team_name_2	, G.referee FROM team A, team B, game G, venue V, sport S WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = ?) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = ?) AND A.team_id != B.team_id and V.venue_id = G.venue_id and G.sport_id = S.sport_id and G.sport_id = ?';
	const data = [
		req.params.sport_id,
		req.params.sport_id,
		req.params.sport_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Retrieving data Success");
				res.send(rows);
				// connection.query(logQuery, [null,'Viewed All Games'], (err,rows) => {})
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

exports.viewAllGames = (req,res) =>{
	var query = 'SELECT * FROM game';
	var id = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Viewing All Games Success");
				res.send(rows);
				connection.query(logQuery, [null,'Viewed All Games'], (err,rows) => {})
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

exports.updateGame = (req,res) =>{
	var query = 'UPDATE game SET sport_id = ?,venue_id = ?,referee = ? WHERE game_id = ?';
	const data = [
		req.body.sport_id,
		req.body.venue_id,
		req.body.referee,
		req.params.game_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Updating Game Success");
				res.send("Game Successfully Updated");
				connection.query(logQuery, [null,'Updated Game # '], (err,rows) => {})
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

exports.deleteGame = (req,res) =>{
	var query = 'DELETE FROM game WHERE game_id = ?';
	const data = [
		req.params.game_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Deleting Game Success");
				res.send("Game Successfully Deleted");
				connection.query(logQuery, [null,'Deleted Game # '], (err,rows) => {})
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

exports.deleteAllGames = (req,res) =>{
	var query = 'DELETE FROM game';
	var id = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Deleting All Games Success");
				res.send("All Games Successfully Deleted");
				connection.query(logQuery, [null,'Deleted All Games'], (err,rows) => {})
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}
