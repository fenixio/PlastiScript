var express = require('express');
var app = express();
var ping = express(); // the sub app
var sys = require('sys')
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
  if(error)
  {
    console.log('exit:' + error); 
    console.log('out:' + stdout);
  } 
}

var filesDirName = "c:\\Libraries\\3DTest0";
var file         = "c:\\Libraries\\3DTest0\\main.jscad";
if( process.argv.length>2)
{
  file = '' + process.argv[2];
}
var pos = file.lastIndexOf('\\');
if(pos>0)
{
  filesDirName = file.substring( 0, pos);
  file         = file.substr( pos + 1);  
}

var port = Math.floor((Math.random() * 10000) + 40000);
if( process.argv.length>3)
  port = parseInt( process.argv[3]);

console.log('server in ' + __dirname);
console.log('looking for files in ' + filesDirName);
console.log('opening the file ' + file);
console.log('using port ' + port);
console.log('arg number ' + process.argv.length); 

var lastTime = Date.now();

ping.get('/', function (req, res) {
  //console.log(req.originalUrl);
  lastTime = Date.now();
  res.send('Ping received');
});

app.use('/ping', ping); 
app.use('/files', express.static(filesDirName));
app.use('/', express.static(__dirname));

var server   = app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
  try
  {
    exec('start http://localhost:' + port + '/app.html?' + file,  puts);
  }
  catch(e)
  {
    console.log(e);
  }
});

var timerId = setInterval(function(){
  var currentTime = Date.now();
  var diff = currentTime - lastTime;
  //console.log('Diff' + diff);
  if(diff>12000)
  {
    clearInterval(timerId);
    console.log('Closing server');
    
    server.close(function(){
      console.log('Server closed');
    });
    process.exit(0); 
  }
}, 2000);

