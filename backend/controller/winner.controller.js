'use strict'
const connection = require(__dirname + '/../mysql/mysql');
var path = require('path');

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