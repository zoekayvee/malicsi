'use strict'
const connection = require(__dirname + '/../mysql/mysql');
var path = require('path');

exports.addGame = (req,res) =>{
	var query = 'INSERT INTO game(sport_id,referee,winner_team_id) VALUES(?,?,?)';
	const data = [
		req.body.sport_id,
		req.body.referee,
		req.body.winner_team_id
	];
	var id = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Adding Game Success");
		    	res.send('Game Successfully added');
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

exports.viewGame = (req,res) =>{
	var query = 'SELECT * FROM game WHERE game_id = ?';
	const data = [
		req.params.game_id
	];
	console.log(data);
	var id = connection.query(
		query,
		[req.params.game_id],
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

exports.updateGame = (req,res) =>{
	var query = 'UPDATE game SET sport_id = ?,referee = ?';
	const data = [
		req.body.sport_id,
		req.body.referee
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

exports.deleteGame = (req,res) =>{
	var query = 'DELETE FROM game WHERE game_id = ?';
	const data = [
		req.body.game_id
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


exports.addSport = (req,res) =>{
	var query = 'INSERT INTO sport(sport_name) VALUES(?)';
	const data = [
		req.body.sport_name
	];

	var con = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Adding Sport Success");
		    	res.send('Sport Successfully added');
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

exports.viewSports = (req,res) =>{
	var query = 'SELECT * from sport where sport_id = ?';
	const data = [
		req.params.sport_id
	];
	var con = connection.query(
		query,
		data,
		(err, rows) =>{
			if(!err){
				console.log("Viewing Sport Success");
				res.send(rows[0]);
			}
			else{
				console.log(err)
				res.status(500).send("Server Error")
			}
	}) 
}

exports.viewAllSports = (req,res) =>{
	var query = 'SELECT * FROM sport';
	var con = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Viewing All Sports Success");
				res.send(rows);
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}

	})
}

exports.updateSport = (req,res) =>{
	var query = 'UPDATE sport SET sport_id = ?';
	const data = [
		req.params.sport_id
	];

	var con = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Updating Sport Success");
				res.send("Sport Successfully Updated");
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

exports.deleteSport = (req,res) =>{
	var query = 'DELETE FROM sport where sport_id = ?';
	const data = [
		req.params.sport_id
	];
	var con = connection.query(
		query,
		data,
		(err, rows) =>{
			if(!err){
				console.log("Deleting Sport Success");
				res.send("Sport Successfully Deleted");
			}
			else{
				console.log(err);
				res.status(500).send("Server Error")
			}

	})
}

exports.deleteAllSports = (req,res) =>{
	var query = 'DELETE FROM sport';
	var con = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Deleting All Sports Success");
				res.send("All Sports Successfully Deleted");
			}
			else{
				console.log(err);
				res.status(500).send("Server Error")
			}
	})
}



exports.addWinner = (req,res) =>{
	var query = 'UPDATE game SET winner_team_id = ? where game_id = ?';
	const data = [
		req.body.winner_team_id,
		req.body.game_id
	];

	var con = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Adding Winner Success");
		    	res.status(200).send('Winner Successfully added');
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

exports.viewWinner = (req,res) =>{
	var query = 'SELECT winner_team_id, game_id from game where game_id = ?';
	const data = [
		req.body.game_id
	];

	var con = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Viewing Winner Success");
				res.send(rows[0]);
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

exports.viewAllWinners = (req,res) =>{
	var query = 'SELECT winner_team_id,game_id from game';
	var con = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Viewing All Winner Success");
				res.send(rows);
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

exports.updateWinner = (req,res) =>{
	var query = 'UPDATE game SET winner_team_id = ? where game_id = ?';
	const data = [
		req.body.winner_team_id,
		req.body.game_id
	];

	var con = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Updating Winner Success");
				res.send("Winner Successfully Updated");
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

exports.deleteWinner = (req,res) =>{
	var query = 'UPDATE game SET winner_team_id = NULL where game_id = ?';
	const data = [
		req.body.game_id
	];

	var con = connection.query(
		query,
		data,
		(err, rows) => {
			if(!err){
				console.log("Deleting Winner Success");
				res.send("Winner Successfully Deleted");
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

exports.deleteAllWinners = (req,res) =>{
	var query = 'UPDATE game SET winner_team_id = NULL';

	var con = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Deleting All Winners Success");
				res.send("All Winners Successfully Deleted");
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

