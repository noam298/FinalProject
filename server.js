const express = require('express');
const session = require('express-session');
const BodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const sql = require('./db');
const CRUD = require('./CRUD');
// const CreateDB=require('./DBCreateData');

//SetUp
const app = express();

//Express Session Setup
app.use(session({
    secret: 'abracadabra',
    resave: false,
    saveUninitialized: true
}));


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');
app.use(express.static('Static'));  

// const start=function(req,res){
//     res.render('WelcomePage');
// };

// app.get('/',[CreateDB.DropUsersTable,CreateDB.CreateUsers, CreateDB.InsertDataToUsers,start]);

//Middleware to disable browser caching
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

//isAuth Function for Protecting Routes
const isAuth = (req,res,next) => {
    if (req.session.email) {
        next();
      } 
    else {
        res.render('403');
      }
}

app.get('/', (req,res)=>{
    if(req.session.teststart == 'true'){
        res.render('403', { session: req.session })
    }
    else if (req.session.groupno == 2 || req.session.groupno == 4 || req.session.groupno == 6) {
        res.render('DividedSessions', { session: req.session })
      } 

    else if (req.session.groupno == 1 || req.session.groupno == 3 || req.session.groupno == 5) {
        res.render('CompleteSessions', { session: req.session })
      }
    
    else 
        res.render('WelcomePage');
})

app.get('/VideoPage', (req,res)=>{
    res.render('VideoPage');
})

app.get('/PracticePage', (req,res)=>{
    res.render('PracticePage');
})

app.get('/SignUpPage', (req,res)=>{
    res.render('SignUpPage');
})

app.get('/EnterPage', (req,res)=>{
    if(req.session.teststart == 'true'){
        res.render('403', { session: req.session })
    }
    else if (req.session.groupno == 2 || req.session.groupno == 4 || req.session.groupno == 6) {
        res.render('DividedSessions', { session: req.session })
      } 

    else if (req.session.groupno == 1 || req.session.groupno == 3 || req.session.groupno == 5) {
        res.render('CompleteSessions', { session: req.session })
      }
    
    else 
        res.render('EnterPage');
})

app.get('/PlatformPage', (req,res)=>{
    res.render('PlatformPage');
})

app.get('/complete', (req, res) => {
    res.render('CompleteSessions');
  });

app.get('/divided', (req, res) => {
    res.render('DividedSessions');
  });

app.get('/session1Complete', (req, res) => {
    console.log(req.session)

    if(!req.session.email){
        res.render('403')
    }
    else if(req.session.session1fin == 'true'){
        res.redirect('/CompleteSessions')
    }
    else if(req.session.stwovtwo == 'true' ){
        res.redirect('/VideoPage2')
    }
    else{
        req.session.sonevone = 'true'
        req.session.teststart = 'true'
        res.render('VideoPage', { session: req.session })
    }

    // if (req.session.email && req.session.grouptype == 'complete' && !req.session.sonevone){
    //     req.session.sonevone = 'true'
    //     res.render('VideoPage', { session: req.session })
    // }
    // else{
    //     res.render('403')
    // }

 });

app.get('/VideoPage2', (req,res)=>{
    if(!req.session.email){
        res.render('403')
    }
    else if(req.session.sthreevthree == 'true' ){
        res.redirect('/VideoPage3')
    }
    else{
        req.session.stwovtwo = 'true'
        res.render('VideoPage2', { session: req.session })
    }

})

app.get('/VideoPage3', (req,res)=>{
    if(!req.session.email){
        res.render('403')
    }
    else if(req.session.session1fin == 'true' ){
        res.redirect('/PracticeSession1')
    }
    else{
        req.session.sthreevthree = 'true'
        res.render('VideoPage3', { session: req.session })
    }
})

app.get('/session2Complete', (req, res) => {
    if(!req.session.email){
        res.render('403')
    }
    else if(req.session.session2fin == 'true'){
        res.redirect('/CompleteSessions')
    }
    else if(req.session.completes2v2 == 'true' ){
        res.redirect('/VideoPage2S2')
    }
    else{
        req.session.completes2v1 = 'true'
        req.session.teststart = 'true'
        res.render('VideoPageS2', { session: req.session })
    }

 });

 
 app.get('/VideoPage2S2', (req, res) => {
    if(!req.session.email){
        res.render('403')
    }
    else if(req.session.completes2v3 == 'true' ){
        res.redirect('/VideoPage3S2')
    }
    else{
        req.session.completes2v2 = 'true'
        res.render('VideoPage2S2', { session: req.session })
    }

    // res.render('VideoPage2S2');
 });

 app.get('/VideoPage3S2', (req, res) => {
    if(!req.session.email){
        res.render('403')
    }
    else if(req.session.session2fin == 'true' ){
        res.redirect('/PracticeSession2')
    }
    else{
        req.session.completes2v3 = 'true'
        res.render('VideoPage3S2', { session: req.session })
    }

    // res.render('VideoPage3S2');
 });

 app.get('/session3Complete', isAuth, (req, res) => {
    if(req.session.session3fin == 'true'){
        res.redirect('/CompleteSessions')
    }
    else if(req.session.completes3v2 == 'true' ){
        res.redirect('/VideoPage2S3')
    }
    else{
        req.session.completes3v1 = 'true'
        req.session.teststart = 'true'
        res.render('VideoPageS3', { session: req.session })
    }

    // res.render('VideoPageS3');
 });

 
 app.get('/VideoPage2S3', isAuth, (req, res) => {
    if(req.session.completes3v3 == 'true' ){
        res.redirect('/VideoPage3S3')
    }
    else{
        req.session.completes3v2 = 'true'
        res.render('VideoPage2S3', { session: req.session })
    }

    // res.render('VideoPage2S3');
 });

 app.get('/VideoPage3S3', isAuth, (req, res) => {
    if(req.session.session3fin == 'true' ){
        res.redirect('/PracticeSession3')
    }
    else{
        req.session.completes3v3 = 'true'
        res.render('VideoPage3S3', { session: req.session })
    }
    // res.render('VideoPage3S3');
 });

 //Complete type Quiz 1 route
app.get('/PracticeSession1', (req,res)=>{
    if(!req.session.email){
        res.render('403')
    }
    else if (req.session.testsubmitted1 == 'true'){
        res.redirect('/CompleteSessions')
    }
    else{
        req.session.session1fin = 'true'
        res.render('PracticePage', { session: req.session })
    }

})

app.get('/SubmitTestComplete1', (req,res)=>{ 
    req.session.testsubmitted1 = 'true'
    req.session.sonevone = 'false'
    res.redirect('/CompleteSessions')
})

app.get('/SubmitTestComplete2', (req,res)=>{ 
    req.session.testsubmitted2 = 'true'
    req.session.completes2v1 = 'false'
    res.redirect('/CompleteSessions')
})

app.get('/CompleteSessions', (req,res)=>{
    if(req.session.sonevone == 'true'){
        res.redirect('/session1Complete')
    }
    else if(req.session.completes2v1 == 'true'){
        res.redirect('/session2Complete')
    }
    else if(req.session.completes3v1 == 'true'){
        res.redirect('/session3Complete')
    }
    else{
        res.render('CompleteSessions', { session: req.session });
    }

})

//Complete Type Quiz 2 Route
app.get('/PracticeSession2', (req,res)=>{
    if(!req.session.email){
        res.render('403')
    }
    else if (req.session.testsubmitted2 == 'true'){
        res.redirect('/CompleteSessions')
    }
    else{
        req.session.session2fin = 'true'
        res.render('PracticePageS2', { session: req.session })
    }

    // res.render('PracticePageS2');
})

app.get('/PracticeSession3', isAuth, (req,res)=>{
    req.session.session3fin = 'true'
    res.render('PracticePageS3', { session: req.session })
})


app.get('/DividedSessions', (req, res) => {
    res.render('DividedSessions');
 });

app.get('/session1Divided', (req, res) => {
    res.render('VideoPageDivided');
 });

 app.get('/session2Divided', (req, res) => {
    res.render('VideoPage4Divided');
 });

 app.get('/session3Divided', (req, res) => {
    res.render('VideoPage7Divided');
 });

 app.get('/VideoPage2Divided', (req, res) => {
    res.render('VideoPage2Divided');
 });

 app.get('/VideoPage3Divided', (req, res) => {
    res.render('VideoPage3Divided');
 });

 app.get('/VideoPage4Divided', (req, res) => {
    res.render('VideoPage4Divided');
 });

 app.get('/VideoPage5Divided', (req, res) => {
    res.render('VideoPage5Divided');
 });

 app.get('/VideoPage6Divided', (req, res) => {
    res.render('VideoPage6Divided');
 });

 app.get('/VideoPage7Divided', (req, res) => {
    res.render('VideoPage7Divided');
 });

 app.get('/VideoPage8Divided', (req, res) => {
    res.render('VideoPage8Divided');
 });

 app.get('/VideoPage9Divided', (req, res) => {
    res.render('VideoPage9Divided');
 });


 app.get('/PracticePage1D', (req,res)=>{
    res.render('PracticePage1D');
})

app.get('/PracticePage2D', (req,res)=>{
    res.render('PracticePage2D');
})

app.get('/PracticePage3D', (req,res)=>{
    res.render('PracticePage3D');
})

app.get('/PracticePage4D', (req,res)=>{
    res.render('PracticePage4D');
})

app.get('/PracticePage5D', (req,res)=>{
    res.render('PracticePage5D');
})

app.get('/PracticePage6D', (req,res)=>{
    res.render('PracticePage6D');
})

app.get('/PracticePage7D', (req,res)=>{
    res.render('PracticePage7D');
})

app.get('/PracticePage8D', (req,res)=>{
    res.render('PracticePage8D');
})

app.get('/PracticePage9D', (req,res)=>{
    res.render('PracticePage9D');
})

app.get('/SignUpPage', (req,res)=>{
    res.render('SignUpPage');
})

app.post('/insertUser',CRUD.InsertUser);

app.post('/enterUser',CRUD.SearchUser);


app.listen(port, ()=>{
    console.log("server is running on port " + port);
});