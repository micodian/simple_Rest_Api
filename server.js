const express = require("express");
const cors =require("cors");


const app = express();
const PORT = process.env.PORT || 3000;

//set up middleware with express
//to use cors-> cross sharing
app.use(cors());

//add options that would pass preflight check
app.options("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    //methods that are allowed 
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');
    req.send(200);

});

//MIDDLEWARE 
app.use(express.json());//needed for json requests 

app.use(express.urlencoded( { extended: false}));//needed for form requests 

//creating a logger
app.use((req, res, next) =>{
    console.log(`${req.method} ${req.path} ${req.ip}`);
    next();
});

app.use(express.static('public'));
app.use(express.static('css'));

const timeRoutes = require("./routes/time");
const nameRoutes = require("./routes/name");
const jsonRoutes = require("./routes/json");
const echoAllRoutes = require("./routes/echo-all");

app.use("/routes/time", timeRoutes);
app.use("/routes/name", nameRoutes);
app.use("/routes/json", jsonRoutes);
app.use("/routes/echo-all", echoAllRoutes);

//serves the default page 
app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/views/index.html");
});


//serves form page as routes

app.get('/form', (req, res) =>{
    res.sendFile(__dirname + "/views/form.html");
});

app.get('/:word/echo', (req, res) =>{
    res.json({ "echo": req.params.word })
});


//to handle routes that are not specified above. s
app.all('*', (req, res) =>{
    res.send("Invalid route");
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

