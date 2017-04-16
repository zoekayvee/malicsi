'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');

// ADDING SPORT (VALUES  'sport_name')
exports.viewAllVenues = (req,res) =>{
	var query = 'call viewAllVenues()';

	var con = connection.query(
		query,
		(err, rows) => {
			if(!err){
				console.log("Viewing Venues Success");
				res.send(rows[0]);
			}
			else{
				console.log(err);
				res.status(500).send("Server Error");
			}
		}
	)   
}