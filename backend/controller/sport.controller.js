'use strict'
const connection = require(__dirname + '/../mysql/mysql');
var path = require('path');

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

