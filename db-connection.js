var Client = require('mariasql');

var c = new Client({
  host: '127.0.0.1',
  user: 'local',
  password: 'a5390040597',
  db: 'malicsiDB'
});

c.on('ready', function(){
	console.log('Connected to Database');
})

module.exports=c;
