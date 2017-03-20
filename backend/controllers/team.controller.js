exports.addTeam = (req, res, next) => {
	var query = 'call addTeam(?)';
	const data = [
		req.body.team_name
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Success");
				res.status(200).send("Success");
				return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.viewTeam = (req, res, next) => {
	var query = 'call viewTeam(?)';
	const data = [
		req.params.team_id
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);
				console.log("Success");
				res.status(200).send(row);
				//return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.viewAllTeam = (req, res, next) => {
	var query = 'call viewAllTeam()';
	
		var id = connection.query(
		query,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Success");
				res.status(200).send(row);
				//return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.updateTeam = (req, res, next) => {
	var query = 'call updateTeam(?,?)';
	const data = [
		req.body.team_id,
		req.body.team_name
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Update Team Success");
				res.status(200).send("Update Team Success");
				return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.deleteTeam = (req, res, next) => {
	console.log(1);
	var query = 'call deleteTeam(?)';
	const data = [
		req.params.team_id
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Delete Team Success");
				res.status(200).send("Delete Team Success");
				return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.teamJoinEvent = (req, res, next) => {
	var query = 'call teamJoinEvent(?,?)';
	const data = [
		req.body.team_id,
		req.body.event_id
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Update Team Join Event Success");
				res.status(200).send("Update Team Join Event Success");
				return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}

exports.teamPlayGame = (req, res, next) => {
	var query = 'call teamPlayGame(?,?)';
	const data = [
		req.body.team_id,
		req.body.game_id
	];
	console.log(data);
	var id = connection.query(
		query,
		data,
		(err, row, fields) => {
			if(!err){
				console.log(row);

				console.log("Update Team Play Game Success");
				res.status(200).send("Update Team Play Game Success");
				return row
			}
			else{
				console.log(err);
				res.status(500).send('Server error');
			}
	});
}


