'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');

// ADDING SPORT (VALUES  'sport_name')
exports.addSport = (req,res) =>{
	var query = 'call addSport(?,?)';
	const data = [
		req.body.sport_name,
		req.params.event_id
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
		}
	)   
}

// VIEWING SPORT THROUGH 'sport_id'
exports.viewSports = (req,res) =>{
	var query = 'call viewSportById(?)';
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

// VIEWING ALL SPORTS
exports.viewAllSports = (req,res) =>{
	var query = 'call viewAllSports()';
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

// VIEWING SPORT THROUGH 'event_event_id'
exports.viewSportsByEvent = (req,res) =>{
	var query = 'call viewSportByEvent(?)';
	const data = [
		req.params.event_id
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

// UPDATING SPORT (VALUES - 'sport_name')
exports.updateSport = (req,res) =>{
	var query = 'call sportUpdate(?,?)';
	const data = [
		req.body.sport_name,
		req.body.sport_id
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

// DELETING SPORT THROUGH 'sport_id'
exports.deleteSport = (req,res) =>{
	var query = 'call sportDelete(?)';
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

// DELETING ALL SPORTS
exports.deleteAllSports = (req,res) =>{
	var query = 'call sportDeleteAll()';
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

