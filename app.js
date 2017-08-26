// import module
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser =  require("body-parser");
var path = require("path");
var route = require('./routes/route');
var app = express();

// Connection
mongoose.connect("mongodb://localhost/UserContact");

// on connection
mongoose.connection.on("connected",()=>{
	console.log("Db connected");
})

mongoose.connection.on("error",(err)=>{
	if(err){
		console.log("Error"+err);
	}
})

const port = 8000;

app.use(cors());

// static
app.use(express.static(path.join(__dirname,'public')));
// parse application/json 
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api',route);

app.listen(port,()=>{
	console.log("Server started at port "+port);
})
