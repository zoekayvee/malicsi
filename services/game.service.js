'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');

// ADDING GAME (VALUES - 'sport_id','venue_id','winner_team_id','referee')
exports.addGame = (req,res) =>{
	var query = 'INSERT INTO game(sport_id,venue_id,event_event_id,date_start,time_start,duration,referee) VALUES(?,?,?,?,?,?,?)';
	var query1 = 'SELECT game_id FROM game WHERE game_id = LAST_INSERT_ID()';
	var query2 = 'INSERT INTO team_plays_game(game_id,team_id,bet_count) VALUES(?,1,0),(?,2,0)';
	const data = [
		req.body.sport_id,
		req.body.venue_id,
		req.body.event_id,
		req.body.date_start,
		req.body.time_start,
		req.body.duration,
		req.body.referee
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Adding Game Success");
		    	res.send('Game Successfully added');
		    	var con1 = connection.query( query1,  (err,rows) => {
		    		const data2 = [
						rows[0].game_id,
						rows[0].game_id
					];
					console.log(data2 + "HERERERE");
		    		var con2 = connection.query( query2, data2, (err,rows) => {} );
		    	} );
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

// VIEWING GAME THROUGH 'sport_id'
exports.viewGamesBySport = (req,res) =>{
	var query = 'SELECT * FROM game WHERE sport_id = ? and event_event_id = ? order by sport_id';
	const data = [
		req.params.sport_id,
		req.body.event_event_id
	];
	console.log("eventid" + req.body.event_event_id);
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Viewing Game Successs");
				res.send(rows);
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

// VIEWING INDIVIDUAL GAME THROUGH 'game_id' (JOINED WITH TABLES (VENUE, SPORTS, TEAM, TEAM_PLAYS_GAME`))
exports.viewGame = (req,res) =>{
	var query = 'SELECT distinct S.sport_name, G.game_id, A.team_name, GS.team_score as score, T1.bet_count, T1.team_id, B.team_name as team_name_2, GS2.team_score as score_2, T2.bet_count as bet_count_2, T2.team_id as team_id_2 FROM team A, team B, game G, venue V, sport S,team_plays_game T1,team_plays_game T2,game_score GS, game_score GS2 WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = ?) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = ?) AND A.team_id != B.team_id AND S.sport_id = G.sport_id AND T1.team_id = A.team_id AND T2.team_id = B.team_id AND T1.game_id = T2.game_id AND T1.game_id = ? AND G.game_id = ? and T1.team_id = GS.team_score_id and T2.team_id = GS2.team_score_id LIMIT 1';
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
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

exports.bet = (req,res) =>{
	var query = 'UPDATE team_plays_game set bet_count = bet_count + 1 WHERE game_id = ? and team_id = ?';
	const data = [
		req.body.game_id,
		req.body.team_id
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Betting Success");
				// res.send(rows[0]);
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

// VIEWING GAME SCHEDULE THROUGH 'sport_id' (JOINED WITH TABLES (VENUE, GAME, TEAM, TEAM_PLAYS_GAME))
exports.viewScheds = (req,res) =>{
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
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

// VIEWING LEADERBOARDS THROUGH 'sport_id' (TABLES (GAME, SPORT, VENUE, TEAM, TEAM_PLAYS_GAME))
exports.viewLeaderboards = (req,res) =>{
	// SELECT distinct G.game_id, G.date_start,V.venue_name, A.team_name, T1.score, B.team_name as team_name_2, T2.score as score2 , G.referee FROM team A, team B, game G, venue V, sport S, team_plays_game T1, team_plays_game T2 WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = 1) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = 1) AND A.team_id != B.team_id and A.team_id = T1.team_id and B.team_id = T2.team_id and G.game_id = T1.game_id and V.venue_id = G.venue_id and G.sport_id = S.sport_id and G.sport_id = 1
	var query = 'SELECT distinct G.game_id, G.date_start,V.venue_name, A.team_name, GS.team_score as score, B.team_name as team_name_2, GS2.team_score as score2 , G.referee FROM team A, team B, game G, venue V, sport S, team_plays_game T1, team_plays_game T2, game_score GS, game_score GS2 WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = ?) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = ?) AND A.team_id != B.team_id and A.team_id = T1.team_id and B.team_id = T2.team_id and T1.game_id = T2.game_id  and G.game_id = T1.game_id and V.venue_id = G.venue_id and G.sport_id = S.sport_id and G.sport_id = ? and T1.game_id = GS.game_id and T2.game_id = GS2.game_id';
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
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

// VIEWING ALL GAMES 
exports.viewAllGames = (req,res) =>{
	var query = 'SELECT * FROM game';
	var id = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Viewing All Games Success");
				res.send(rows);
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

// UPDATING GAME THROUGH 'game_id' (VALUES 'sport_id','venue_id','referee')
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
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

// DELETING GAME THROUGH 'game_id'
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
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

// DELETING ALL GAMES 
exports.deleteAllGames = (req,res) =>{
	var query = 'DELETE FROM game';
	var id = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Deleting All Games Success");
				res.send("All Games Successfully Deleted");
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}
