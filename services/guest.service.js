'use strict'
const connection = require(__dirname + '/../db-connection');
var path = require('path');

exports.viewGames = (req,res) => {
	const query_string = "SELECT S.sport_name, G.game_id, G.sport_id, G.venue_id, G.event_event_id, G.date_start, G.time_start, G.referee, G.duration, G.winner_team_id, E.event_name FROM sport S, game G, event E WHERE G.sport_id = S.sport_id AND G.event_event_id = E.event_id";

	connection.query(query_string,null,(err,rows) =>{
		if(!err){
			res.status(200).send(rows);
		}
		else{
			res.status(500).send(err);
		}
	})
}