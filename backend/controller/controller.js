'use strict'
const connection = require(__dirname + '/../mysql/mysql');
var path = require('path');

exports.addGame = (req,res,next) =>{
	var query = 'INSERT INTO game(sport_id,referee,winner_team_id) VALUES(?,?,?)';
	const data = [
		req.body.sport_id,
		req.body.referee,
		req.body.winner_team
	];
	var id = connection.query(
		query,
		data,
		(err, res, fields) => {
			if(!err){
				console.log("Adding Game Success");
				res.status(200).send("Success");
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

exports.viewGame = (req,res,next) =>{
	var query = 'SELECT * FROM game WHERE game_id = ?';
	const data = [
		req.body.game_id
	];
	var id = connection.query(
		query,
		data,
		(err, res, fields) => {
			if(!err){
				console.log("Viewing Game Success");
				res.status(200).send("Success");
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

exports.viewAllGames = (req,res,next) =>{
	console.log("Viewing All Games Success");
	var query = 'SELECT * FROM game';
	var id = connection.query(
		query,
		(err, res, fields) => {
			if(!err){
				console.log("Viewing All Games Success");
				res.status(200).send("Success");
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

exports.updateGame = (req,res,next) =>{
	var query = 'UPDATE game SET sport_id = ?,referee = ?';
	const data = [
		req.body.sport_id,
		req.body.referee
	];
	var id = connection.query(
		query,
		data,
		(err, res, fields) => {
			if(!err){
				console.log("Updating Game Success");
				res.status(200).send("Success");
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

exports.deleteGame = (req,res,next) =>{
	var query = 'DELETE FROM game WHERE game_id = ?';
	const data = [
		req.body.game_id
	];
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log("Deleting Game Success");
				res.status(200).send("Success");
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

exports.deleteAllGames = (req,res,next) =>{
	var query = 'DELETE FROM game';
	var id = connection.query(
		query,
		(err, res, fields) => {
			if(!err){
				console.log("Deleting All Games Success");
				res.status(200).send("Success");
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}
	})
}

exports.addSport = (req,res,next) =>{
	var query = 'INSERT INTO sport(sport_name) VALUES(?)';
	const data = [
		req.body.sport_name
	];

	var con = connection.query(
		query,
		data,
		(err, res, fields) => {
			if(!err){
				console.log(res);
				res.status(200).send("Success");
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

exports.viewSports = (req,res,next) =>{
	var query = 'SELECT * from sport where sport_id = ?';
	const data = [
		req.body.sport_id
	];
	var con = connection.query(
		query,
		data,
		(err, res, fields) =>{
			if(!err){
				console.log(res);
				res.status(200).send("Success");
			}
			else{
				console.log(err)
				res.status(500).send("Server Error")
			}
	}) 
}

exports.viewAllSports = (req,res,next) =>{
	var query = 'SELECT * FROM sport';
	var con = connection.query(
		query,
		(err, res, fields) => {
			if(!err){
				console.log(row);
				res.status(200).send("Success");
			}
			else{
				console.log(err);
				res.status(500).send('Server Error');
			}

	})
}

exports.updateSport = (req,res,next) =>{
	var query = 'UPDATE sport SET sport_name = ?';
	const data = [
		req.body.sport_name
	];

	var con = connection.query(
		query,
		data,
		(err, res, fields) => {
			if(!err){
				console.log(res);
				res.status(200).send("Updating Sport Success");
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

exports.deleteSport = (req,res,next) =>{
	var query = 'DELETE FROM sport where sport_id = ?';
	const data = [
		req.body.sport_id
	];
	var con = connection.query(
		query,
		data,
		(err, res, fields) =>{
			if(!err){
				console.log(res);
				res.status(200).send("Succes");
			}
			else{
				console.log(err);
				res.status(500).send("Server Error")
			}

	})
}

exports.deleteAllSports = (req,res,next) =>{
	var query = 'DELETE FROM sport';
	var con = connection.query(
		query,
		(err, res, fields) => {
			if(!err){
				console.log(res);
				res.status(200).send("Succes");
			}
			else{
				console.log(err);
				res.status(500).send("Server Error")
			}
	})
}



exports.addWinner = (req,res,next) =>{

}

exports.viewWinner = (req,res,next) =>{

}

exports.viewAllWinners = (req,res,next) =>{
	
}

exports.updateWinner = (req,res,next) =>{
	
}

exports.deleteWinner = (req,res,next) =>{
	
}

exports.deleteAllWinners = (req,res,next) =>{
	
}

