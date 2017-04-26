'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');

// ADDING WINNER (UPDATES VALUE OF THE ATTRIBUTE 'winner_team_id' from game)
exports.addWinner = (req,res) =>{
	var query = 'call addWinner(?,?)';
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
		    	res.send('Winner Successfully added');
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

// VIEWING WINNER 
exports.viewWinner = (req,res) =>{
	var query = 'call viewWinnerInGame(?)';
	const data = [
		req.params.game_id
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

// VIEWING ALL WINNERS
exports.viewAllWinners = (req,res) =>{
	var query = 'call viewAllWinners()';
	var con = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Viewing All Winner Success");
				res.send(rows[0]);
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
	})
}

// UPDATING WINNER THROUGH 'game_id'
exports.updateWinner = (req,res) =>{
	var query = 'call updateWinner(?,?)';
	const data = [
		req.body.winner_team_id,
		req.params.game_id
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

// DELETING WINNER (SETTING VALUE OF 'winner_team_id' to NULL)
exports.deleteWinner = (req,res) =>{
	var query = 'call deleteWinnerInGame(?)';
	const data = [
		req.params.game_id
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

// DELETING ALL WINNERS (SETTING ALL VALUES OF 'winner_team_id' to NULL)
exports.deleteAllWinners = (req,res) =>{
	var query = 'call deleteAllWinners()';

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
