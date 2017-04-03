var Client = require('mariasql');

var c = new Client({
  host: '127.0.0.1',
  user: 'root',
  password: 'bossing',
  db: 'malicsiDB2'
});

c.on('ready', function(){
	console.log('Connected to Database');
})

module.exports=c;
