'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');

// ADDING GAME (VALUES - 'sport_id','venue_id','winner_team_id','referee')
exports.addGame = (req,res) =>{
	var query = 'call addGame(?,?,?,?,?,?,?)';
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
				var query2 = 'select last_insert_id() as game_id';
				var id2 = connection.query(query2,(err, rows) => { 
					var query3 = 'call insertTeamPlaysGame(?)';
					var id3 = connection.query(query3,[rows[0].game_id],(err, rows) => { });
				});

				console.log("Adding Game Success");
		    	res.send('Game Successfully added');
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

// VIEWING GAME THROUGH 'sport_id'
exports.viewGamesBySport = (req,res) =>{
	var query = 'call viewAllGamesInSport(?,?)';
	const data = [
		req.params.sport_id,
		req.body.event_event_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Viewing Game Successs");
				res.send(rows[0]);
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

// VIEWING INDIVIDUAL GAME THROUGH 'game_id' (JOINED WITH TABLES (VENUE, SPORTS, TEAM, TEAM_PLAYS_GAME`))
exports.viewGame = (req,res) =>{
	var query = 'SELECT distinct G.event_event_id,S.sport_name, G.game_id, A.team_name, A.team_id, T1.bet_count, T1.team_id, B.team_name as team_name_2, B.team_id as team_id_2, T2.bet_count as bet_count_2, T2.team_id as team_id_2,winner_team_id FROM team A, team B, game G, venue V, sport S,team_plays_game T1,team_plays_game T2,game_score GS, game_score GS2 WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = ?) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE game_id = ?) AND A.team_id != B.team_id AND S.sport_id = G.sport_id AND T1.team_id = A.team_id AND T2.team_id = B.team_id AND T1.game_id = T2.game_id AND T1.game_id = ? AND G.game_id = ? LIMIT 1';
	const data = [
		req.params.game_id,
		req.params.game_id,
		req.params.game_id,
		req.params.game_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Viewing Game Success");
				res.send(rows);
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

exports.betStatus = (req,res) =>{
	var query = 'call viewBetStatus(?,?)';
	const data = [
		req.params.user_id,
		req.params.game_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				res.send(rows[0]);
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

exports.bet = (req,res) =>{
	var query = 'call bet(?,?,?)';
	const data = [
		req.body.game_id,
		req.body.team_id,
		req.params.user_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Betting Success");
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

exports.getRanking = (req,res) =>{
	var query = 'call ranking(?, ?)';

	const data = [
		req.params.sport_id,
		req.body.event_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Retrieving data Success");
				res.send(rows[0]);
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}	

//returns team_name, team_id, wins and loss
exports.getOverallRanking = (req,res) =>{
	var query = 'SELECT tp.team_id AS team_id,t.team_name, (SELECT COUNT(*) FROM game WHERE winner_team_id = tp.team_id AND game.event_event_id = ?) AS wins,(SELECT COUNT(*) FROM game NATURAL JOIN team_plays_game AS tpg WHERE tpg.team_id = tp.team_id AND (winner_team_id!=tp.team_id AND game.event_event_id = ?)) AS loss FROM (SELECT DISTINCT team_id FROM game NATURAL JOIN team_plays_game WHERE event_event_id = ?) as tp NATURAL JOIN team t where t.team_name != "TBA" and t.team_name != " TBA"  ORDER BY wins DESC;';

	const data = [
		req.params.event_id,
		req.params.event_id,
		req.params.event_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Retrieving Overall Ranking Success");

				res.send(rows);
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}
//returns team_name, team_id, wins and loss
// SET @x=0;SELECT (@x:=@x+1) Rank, tp.team_id AS team_id,t.team_name, (SELECT COUNT(*) FROM game WHERE winner_team_id = tp.team_id AND game.event_event_id = ?) AS wins,(SELECT COUNT(*) FROM game NATURAL JOIN team_plays_game AS tpg WHERE tpg.team_id = tp.team_id AND (winner_team_id!=tp.team_id AND game.event_event_id = ?)) AS loss FROM (SELECT DISTINCT team_id FROM game NATURAL JOIN team_plays_game WHERE event_event_id = ?) as tp NATURAL JOIN team t where t.team_name != "TBA" and t.team_name != " TBA" and tp.team_id = ?;
exports.getRankingTeam = (req,res) =>{
	var query = 'SET @x=0;SELECT (@x:=@x+1) Rank, tp.team_id AS team_id,t.team_name, (SELECT COUNT(*) FROM game WHERE winner_team_id = tp.team_id AND game.event_event_id = ?) AS wins,(SELECT COUNT(*) FROM game NATURAL JOIN team_plays_game AS tpg WHERE tpg.team_id = tp.team_id AND (winner_team_id!=tp.team_id AND game.event_event_id = ?)) AS loss FROM (SELECT DISTINCT team_id FROM game NATURAL JOIN team_plays_game WHERE event_event_id = ?) as tp NATURAL JOIN team t where t.team_name != "TBA" and t.team_name != " TBA" and tp.team_id = ?;';

	const data = [
		req.params.event_id,
		req.params.event_id,
		req.params.event_id,
		req.body.team_id
	];
	        console.log(data);
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Retrieving  Ranking Success");

				res.send(rows);
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

// VIEWING GAME SCHEDULE THROUGH 'sport_id' (JOINED WITH TABLES (VENUE, GAME, TEAM, TEAM_PLAYS_GAME))
exports.viewScheds = (req,res) =>{
	var query = 'SELECT distinct G.game_id, G.date_start,V.venue_name, A.team_name, B.team_name as team_name_2, G.referee FROM team A, team B, game G, venue V, sport S, team_plays_game T1, team_plays_game T2 WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = ?) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = ?) AND A.team_id != B.team_id and V.venue_id = G.venue_id and G.sport_id = S.sport_id and G.sport_id = ? and T1.team_id = A.team_id and T2.team_id = B.team_id and T1.game_id = G.game_id and T2.game_id = G.game_id;';
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
	var query = 'SELECT distinct G.game_id, S.sport_name as sport_name,S.sport_id as sport_id, G.date_start,V.venue_name, A.team_name, A.team_id,  B.team_name as team_name_2, B.team_id as team_id_2, G.referee FROM team A, team B, game G, venue V, sport S, team_plays_game T1, team_plays_game T2 WHERE A.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = ?) AND B.team_id IN (SELECT team_id FROM team_plays_game WHERE G.sport_id = ?) AND A.team_id > B.team_id and A.team_id = T1.team_id and B.team_id = T2.team_id and T1.game_id = T2.game_id  and G.game_id = T1.game_id and V.venue_id = G.venue_id and G.sport_id = S.sport_id and G.sport_id = ? and G.event_event_id = ? order by game_id';
	const data = [
		req.params.sport_id,
		req.params.sport_id,
		req.params.sport_id,
		req.body.event_id
	];
	console.log(data);
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

exports.viewThreeScoreboard = (req,res) =>{
	var query = 'select game.game_id,sport_id,sport_name,event_event_id,date_start,winner_team_id,t.team_name as team,t2.team_name as team2,sc.team_score as score,sc2.team_score as score2 from game natural join sport,team t,team t2,game_score sc,game_score sc2 where date_start < curdate() and event_event_id = ? and t.team_id in (select team_id from team_plays_game where game_id = game.game_id) and t2.team_id in (select team_id from team_plays_game where game_id =  game.game_id) and t.team_id>t2.team_id and (sc.game_id = game.game_id and sc.team_score_id = t.team_id) and (sc2.game_id = game.game_id and sc2.team_score_id = t2.team_id) limit 3;';
	
	var id = connection.query(
		query,
		[req.params.event_id],
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

exports.viewGamesByEvent = (req,res) =>{
	var query = 'select game.game_id,sport_id,sport_name,event_event_id,date_start,winner_team_id,t.team_name as team,t2.team_name as team2,sc.team_score as score,sc2.team_score as score2 from game natural join sport,team t,team t2,game_score sc,game_score sc2 where event_event_id = ? and t.team_id in (select team_id from team_plays_game where game_id = game.game_id) and t2.team_id in (select team_id from team_plays_game where game_id =  game.game_id) and t.team_id>t2.team_id and (sc.game_id = game.game_id and sc.team_score_id = t.team_id) and (sc2.game_id = game.game_id and sc2.team_score_id = t2.team_id);';
	
	var id = connection.query(
		query,
		[req.params.event_id],
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
exports.viewCurrentGamesByEvent = (req,res) =>{
	var query = 'select game.game_id,sport_id,sport_name,event_event_id,date_start,winner_team_id,t.team_name as team,t2.team_name as team2,sc.team_score as score,sc2.team_score as score2 from game natural join sport,team t,team t2,game_score sc,game_score sc2 where date_start = curdate() and event_event_id = ? and t.team_id in (select team_id from team_plays_game where game_id = game.game_id) and t2.team_id in (select team_id from team_plays_game where game_id =  game.game_id) and t.team_id>t2.team_id and (sc.game_id = game.game_id and sc.team_score_id = t.team_id) and (sc2.game_id = game.game_id and sc2.team_score_id = t2.team_id);';
	
	var id = connection.query(
		query,
		[req.params.event_id],
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


exports.viewPastGamesByEvent = (req,res) =>{
	var query = 'select game.game_id,sport_id,sport_name,event_event_id,date_start,winner_team_id,t.team_name as team,t2.team_name as team2,sc.team_score as score,sc2.team_score as score2 from game natural join sport,team t,team t2,game_score sc,game_score sc2 where date_start < curdate() and event_event_id = 1 and t.team_id in (select team_id from team_plays_game where game_id = game.game_id) and t2.team_id in (select team_id from team_plays_game where game_id =  game.game_id) and t.team_id>t2.team_id and (sc.game_id = game.game_id and sc.team_score_id = t.team_id) and (sc2.game_id = game.game_id and sc2.team_score_id = t2.team_id);';
	
	var id = connection.query(
		query,
		[req.params.event_id],
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

exports.viewPastGamesUser = (req,res) =>{
	var query = 'select game.game_id,sport_id,sport_name,event_event_id,date_start,time_start,winner_team_id,t.team_name as team,t2.team_name as team2,sc.team_score as score,sc2.team_score as score2,v.venue_name from game natural join sport,team t,team t2,game_score sc,game_score sc2,venue v where date_start < curdate() and t.team_id in (select team_id from team_plays_game where game_id = game.game_id) and t2.team_id in (select team_id from team_plays_game where game_id =  game.game_id) and t.team_id>t2.team_id and (sc.game_id = game.game_id and sc.team_score_id = t.team_id) and (sc2.game_id = game.game_id and sc2.team_score_id = t2.team_id) and (t.team_id in (select distinct team_id from team_players where user_id = ?) or t2.team_id in (select distinct team_id from team_players where user_id = ?)) and v.venue_id = game.venue_id;';
	console.log("here: "+ req.params.user_id);
	var id = connection.query(
		query,
		[req.params.user_id,req.params.user_id],
		(err, rows) => {
			if(!err){
				console.log("Retrieving Past Games of User Success");
				res.send(rows);
			}
			else{
				console.log(err);
				res.send('Retrieving Past Games of User Failed');
			}
	})
}

exports.viewCurrentGamesByTeam = (req,res) =>{
	var query = 'select game.game_id,sport_id,sport_name,event_event_id,date_start,time_start,winner_team_id,t.team_name as team,t2.team_name as team2,sc.team_score as score,sc2.team_score as score2,v.venue_name from game natural join sport,team t,team t2,game_score sc,game_score sc2,venue v where date_start = date_add(curdate(),interval ? day ) and t.team_id in (select team_id from team_plays_game where game_id = game.game_id) and t2.team_id in (select team_id from team_plays_game where game_id =  game.game_id) and t.team_id>t2.team_id and (sc.game_id = game.game_id and sc.team_score_id = t.team_id) and (sc2.game_id = game.game_id and sc2.team_score_id = t2.team_id) and (t.team_id = ? or t2.team_id = ?) and v.venue_id = game.venue_id;';

	const data = [
		req.body.interval,
		req.params.team_id,
		req.params.team_id
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
exports.getDate = (req,res) =>{
	var query = 'select date_add( curdate(), interval ? day ) as date;';
	const data = [
		req.params.interval
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				res.send(rows);
			}
			else{
				res.send('Server Error');
			}
		})
}

exports.viewUpcomingGamesByEvent = (req,res) =>{
	var query = 'select game.game_id,sport_id,sport_name,event_event_id,date_start,winner_team_id,t.team_name as team,t2.team_name as team2,sc.team_score as score,sc2.team_score as score2 from game natural join sport,team t,team t2,game_score sc,game_score sc2 where date_start > curdate() and event_event_id = ? and t.team_id in (select team_id from team_plays_game where game_id = game.game_id) and t2.team_id in (select team_id from team_plays_game where game_id =  game.game_id) and t.team_id>t2.team_id and (sc.game_id = game.game_id and sc.team_score_id = t.team_id) and (sc2.game_id = game.game_id and sc2.team_score_id = t2.team_id);';
	
	var id = connection.query(
		query,
		[req.params.event_id],
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

exports.getScores = (req,res) => {
	var query = 'call viewScores(?, ?)';
	const data = [
		req.params.game_id,
		req.params.team_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Retrieving score Success");
				res.send(rows[0]);
			}
			else{
				console.log(err);
				res.send('Server Error');
			}

	})

}

exports.updateScores = (req,res) =>{
	var query = 'UPDATE game_score SET team_score = ? WHERE game_id = ? and team_score_id = ?;';
	const data = [
		req.body.score1,
		req.params.game_id,
		req.body.team_id
	];
	const data2 = [
		req.body.score2,
		req.params.game_id,
		req.body.team_id_2
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
			var id2 = connection.query(
				query,
				data2,
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
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

exports.viewAllAcceptedGames=(req,res)=>{
	var query = 'select * from (select * from (select event_id as event_event_id,status from event)a natural join game where status="accepted")b natural join sport';
	var id = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Viewing All Games Success");
				res.send(rows);
				//res.send(rows); if error, try this line of code
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

// VIEWING ALL GAMES 
exports.viewAllGames = (req,res) =>{
	var query = 'call viewAllGames'; 
	var id = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Viewing All Games Success");
				res.send(rows[0]);
				//res.send(rows); if error, try this line of code
			}
			else{
				console.log(err);
				res.send('Server Error');
			}
	})
}

// UPDATING GAME THROUGH 'game_id' (VALUES 'sport_id','venue_id','referee')
exports.updateGame = (req,res) =>{
	var query = 'call updateGame(?,?,?,?,?,?,?,?)';
	const data = [
		req.body.sport_id,
		req.body.venue_id,
		req.body.event_id,
		req.body.date_start,
		req.body.time_start,
		req.body.duration,
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
	var query = 'call deleteGame(?)';
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
	var query = 'call deleteAllGames()';
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