//  OpenShift sample Node application
var express = require('express');
var app = express(),
var morgan = require('morgan');
var path = require('path');



// app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))
app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs")
var staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
// var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL;
// var mongoURLLabel = "";

app.get('/', function (req, res) {
  res.render("index")
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
