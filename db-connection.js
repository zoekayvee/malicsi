var Client = require('mariasql');

var c = new Client({
  host: '127.0.0.1',
<<<<<<< HEAD
  user: 'root',
  password: 'useruser',
=======
  user: 'projectOneTwoEight',
  password: 'password',
>>>>>>> d029d85146cb7af317f0b7fe541c322a96c36cb0
  db: 'malicsiDB'
});

c.on('ready', function(){
	console.log('Connected to Database');
})

<<<<<<< HEAD
module.exports=c;
=======
module.exports=c;
>>>>>>> d029d85146cb7af317f0b7fe541c322a96c36cb0
