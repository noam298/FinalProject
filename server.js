const express = require('express');
const BodyParser = require('body-parser');
const path = require('path');
const port = 3000;
// const sql = require('./db');
// const CRUD = require('./CRUD');
// const CreateDB=require('./DBCreateData');

//SetUp
const app = express();


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('static'));  

// const start=function(req,res){
//     res.render('WelcomePage');
// };

// app.get('/',[CreateDB.DropUsersTable,CreateDB.CreateUsers, CreateDB.InsertDataToUsers,start]);

app.get('/', (req,res)=>{
    res.render('WelcomePage');
})

app.get('/VideoPage', (req,res)=>{
    res.render('VideoPage');
})


app.listen(port, ()=>{
    console.log("server is running on port " + port);
});