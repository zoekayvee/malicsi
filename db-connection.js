var Client = require('mariasql');

var c = new Client({
  host: '127.0.0.1',
  user: 'root',
  password: 'useruser',
  db: 'malicsiDB'
});
c.on('ready', function(){
	console.log('Connected to Database');
})

module.exports=c;