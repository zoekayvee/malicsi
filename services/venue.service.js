'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');

// viwAllVenues - view all venues
exports.viewAllVenues = (req, res) => {
	const query_string = 'call viewAllVenues()';

	connection.query(query_string,null,(err,result) => {
		if (!err) {
			res.status(200).send(result);
		} else {
			console.log(err);
			res.status(500).send(err);
		}
	});
}

// viewVenue - view one venue
exports.viewVenue = (req, res) => {
	var query = 'call viewVenue(?)';
	const req_data = [req.params.venue_id];

	connection.query(query_string, req_data, (err, result) => {
		if (!err) {
			res.status(200).send(result);
		} else {
			console.log(err);
			res.status(500).send(err);
		}
	});
}

// deletes a Venue
exports.deleteVenue = (req, res) => {
	const query_string = 'call deleteVenue(?)';
	const req_data = [req.params.user_id];

	connection.query(query_string, req_data, (err,result) => {
		if (!err) {
			res.status(200).send(result);
		} else {
			console.log(err);
			res.status(500).send(err);
		}
	});
}

// Updates a venue
exports.updateVenue = (req, res) => {
	const query_string = 'call updateVenue(?,?,?,?,?)';
	const req_data = [
		req.params.venue_id,
		req.body.latitude,
		req.body.longitude,
		req.body.address,
		req.body.venue_name
	];

	connection.query(query_string, req_data, (err, result) => {
		if (!err) {
			res.status(200).send(result);
		} else {
			console.log(err);
			res.status(500).send(err);
		}
	});
}



