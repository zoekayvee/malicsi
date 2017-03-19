'use strict'
const connection = require(__dirname + '/../mysql/mysql');
var path = require('path');


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
		req.body.sport_id;
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

