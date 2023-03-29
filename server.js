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

app.get('/SignUpPage', isAuth, (req,res)=>{
    res.render('SignUpPage', { session: req.session });
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

app.post('/SubmitTestComplete1', (req,res)=>{
    console.log(req.session.email)
    console.log(req.body)

    //Save Complete Type Quiz 1 results in DB
    const { question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12 } = req.body;

    const query = `
      UPDATE students
      SET q1 = $1, q2 = $2, q3 = $3, q4 = $4, q5 = $5, q6 = $6, q7 = $7, q8 = $8, q9 = $9, q10 = $10, q11 = $11, q12 = $12
      WHERE email='${req.session.email}'
    `;

    const values = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12];

    sql.query(query, values, (err,pgres)=>{
        if(err){
            throw err
        }
        else{
            req.session.testsubmitted1 = 'true'
            req.session.sonevone = 'false'
            res.redirect('/CompleteSessions')
        }

    });

})

// app.get('/SubmitTestComplete1', (req,res)=>{ 
//     req.session.testsubmitted1 = 'true'
//     req.session.sonevone = 'false'
//     res.redirect('/CompleteSessions')
// })

app.post('/SubmitTestComplete2', (req,res)=>{
    console.log(req.session.email)
    console.log(req.body)

    //Save Complete Type Quiz 2 results in DB
    const { question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15 } = req.body;

    const query = `
      UPDATE students
      SET q13 = $1, q14 = $2, q15 = $3, q16 = $4, q17 = $5, q18 = $6, q19 = $7, q20 = $8, q21 = $9, q22 = $10, q23 = $11, q24 = $12, q25 = $13, q26 = $14, q27 = $15
      WHERE email='${req.session.email}'
    `;

    const values = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15];

    sql.query(query, values, (err,pgres)=>{
        if(err){
            throw err
        }
        else{
            req.session.testsubmitted2 = 'true'
            req.session.completes2v1 = 'false'
            res.redirect('/CompleteSessions')
        }

    });


})

// app.get('/SubmitTestComplete2', (req,res)=>{ 
//     req.session.testsubmitted2 = 'true'
//     req.session.completes2v1 = 'false'
//     res.redirect('/CompleteSessions')
// })

app.post('/SubmitTestComplete3', (req,res)=>{
    console.log(req.session.email)
    console.log(req.body)

    //Save Complete Type Quiz 2 results in DB
    const { question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question14, question15 } = req.body;

    const query = `
      UPDATE students
      SET q28 = $1, q29 = $2, q30 = $3, q31 = $4, q32 = $5, q33 = $6, q34 = $7, q35 = $8, q36 = $9, q37 = $10, q38 = $11, q39 = $12, q40 = $13, q41 = $14
      WHERE email='${req.session.email}'
    `;

    const values = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question14, question15];

    sql.query(query, values, (err,pgres)=>{
        if(err){
            throw err
        }
        else{
            req.session.testsubmitted3 = 'true'
            req.session.completes3v1 = 'false'
            res.redirect('/SignUpPage')
        }

    });
})

// Complete Style Dashboard Route
app.get('/CompleteSessions', (req,res)=>{

    if(req.session.grouptype == 'complete'){

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
    }
    else{
        res.render('403')
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

// Divided Style Dashboard Route
app.get('/DividedSessions', isAuth, (req, res) => {

    if(req.session.grouptype == 'divided'){
        
        if(req.session.divided1start == 'true'){
            res.redirect('/session1Divided')
        }
        else if(req.session.divided2start == 'true'){
            res.redirect('/session2Divided')
        }
        else if(req.session.divided3start == 'true'){
            res.redirect('/session3Divided')
        }
        else{
            res.render('DividedSessions', { session: req.session });
        }
    }
    else{
        res.render('403')
    }


 });

app.get('/session1Divided', isAuth, (req, res) => {
    if(req.session.session1fin == 'true')
        res.redirect('/DividedSessions')
    else if (req.session.divided1b == 'true')
        res.redirect('/PracticePage1D')
    else{
        req.session.divided1start = 'true'
        req.session.divided1a = 'true'
        res.render('VideoPageDivided', {session: req.session});
    }

 });

 app.get('/session2Divided', isAuth, (req, res) => {
    res.render('VideoPage4Divided', {session: req.session});
 });

 app.get('/session3Divided', isAuth, (req, res) => {
    res.render('VideoPage7Divided', {session: req.session});
 });

 app.get('/VideoPage2Divided', isAuth, (req, res) => {
    if (req.session.divided1d == 'true')
        res.redirect('/PracticePage2D')
    else{
        req.session.divided1c = 'true'
        res.render('VideoPage2Divided', {session: req.session});
    }

 });

 app.get('/VideoPage3Divided', isAuth, (req, res) => {
    if (req.session.divided1f == 'true')
        res.redirect('/PracticePage3D')
    else{
        req.session.divided1e = 'true'
        res.render('VideoPage3Divided', {session: req.session});
    }

 });

 app.get('/VideoPage4Divided', isAuth, (req, res) => {
    res.render('VideoPage4Divided', {session: req.session});
 });

 app.get('/VideoPage5Divided', isAuth, (req, res) => {
    res.render('VideoPage5Divided', {session: req.session});
 });

 app.get('/VideoPage6Divided', isAuth, (req, res) => {
    res.render('VideoPage6Divided', {session: req.session});
 });

 app.get('/VideoPage7Divided', isAuth, (req, res) => {
    res.render('VideoPage7Divided', {session: req.session});
 });

 app.get('/VideoPage8Divided', isAuth, (req, res) => {
    res.render('VideoPage8Divided', {session: req.session});
 });

 app.get('/VideoPage9Divided', isAuth, (req, res) => {
    res.render('VideoPage9Divided', {session: req.session});
 });


 app.get('/PracticePage1D', isAuth, (req,res)=>{
    if (req.session.divided1c == 'true')
        res.redirect('/VideoPage2Divided')
    else{
        req.session.divided1b = 'true'
        res.render('PracticePage1D', {session: req.session});
    }

    
})

app.get('/PracticePage2D', isAuth, (req,res)=>{
    if (req.session.divided1e == 'true')
        res.redirect('/VideoPage3Divided')
    else{
        req.session.divided1d = 'true'
        res.render('PracticePage2D', {session: req.session});
    }
    
})

app.get('/PracticePage3D', isAuth, (req,res)=>{
    if (req.session.session1fin == 'true')
        res.redirect('/DividedSessions')
    else{
        req.session.divided1f = 'true'
        res.render('PracticePage3D', {session: req.session});
    }
    
    
})

app.get('/PracticePage4D', isAuth, (req,res)=>{
    res.render('PracticePage4D', {session: req.session});
})

app.get('/PracticePage5D', isAuth, (req,res)=>{
    res.render('PracticePage5D', {session: req.session});
})

app.get('/PracticePage6D', isAuth, (req,res)=>{
    res.render('PracticePage6D', {session: req.session});
})

app.get('/PracticePage7D', isAuth, (req,res)=>{
    res.render('PracticePage7D', {session: req.session});
})

app.get('/PracticePage8D', isAuth, (req,res)=>{
    res.render('PracticePage8D', {session: req.session});
})

app.get('/PracticePage9D', isAuth, (req,res)=>{
    res.render('PracticePage9D', {session: req.session});
})

//- Divided Style Routes End - 

app.get('/SignUpPage', (req,res)=>{
    res.render('SignUpPage');
})

app.post('/insertUser',CRUD.InsertUser);

app.post('/enterUser',CRUD.SearchUser);

app.post('/insertbio', (req,res)=>{
    console.log(req.body)

    //Destructure Bio Form Data
    const { UserAge, UserGender, UserEnglishLevel, UserArea, internetStability, webAttendee } = req.body;

    const query = `
      UPDATE students
      SET age = $1, gender = $2, englishlevel = $3, area = $4, internetstability = $5, webattendee = $6
      WHERE email='${req.session.email}'
    `;

    const values = [UserAge, UserGender, UserEnglishLevel, UserArea, internetStability, webAttendee ];

    sql.query(query, values, (err,pgres)=>{
        if(err){
            throw err
        }
        else{
            res.redirect('/CompleteSessions')
        }

    });

})

//Divided Test POST Routes
app.post('/dividedsubmit1', (req,res)=>{
    console.log(req.session.email)
    console.log(req.body)

    const { question1, question2, question3, question4, question5} = req.body;

    const query = `
      UPDATE students
      SET q1 = $1, q2 = $2, q3 = $3, q4 = $4, q5 = $5
      WHERE email='${req.session.email}'
    `;

    const values = [question1, question2, question3, question4, question5];

    sql.query(query, values, (err,pgres)=>{
        if(err){
            throw err
        }
        else{
            res.redirect('/VideoPage2Divided')
        }

    });
})

app.post('/dividedsubmit2', (req,res)=>{
    console.log(req.session.email)
    console.log(req.body)

    const { question1, question2, question3, question4, question5} = req.body;

    const query = `
      UPDATE students
      SET q6 = $1, q7 = $2, q8 = $3, q9 = $4, q10 = $5
      WHERE email='${req.session.email}'
    `;

    const values = [question1, question2, question3, question4, question5];

    sql.query(query, values, (err,pgres)=>{
        if(err){
            throw err
        }
        else{
            res.redirect('/VideoPage3Divided')
        }

    });

})

app.post('/dividedsubmit3', (req,res)=>{
    console.log(req.session.email)
    console.log(req.body)

    const { question1, question2} = req.body;

    const query = `
      UPDATE students
      SET q11 = $1, q12 = $2
      WHERE email='${req.session.email}'
    `;

    const values = [question1, question2];

    sql.query(query, values, (err,pgres)=>{
        if(err){
            throw err
        }
        else{
            req.session.session1fin = 'true'
            req.session.divided1start = 'false'
            res.redirect('/DividedSessions')
        }

    });

})

app.post('/dividedsubmit4', (req,res)=>{

})

app.post('/dividedsubmit5', (req,res)=>{

})

app.post('/dividedsubmit6', (req,res)=>{

})


app.listen(port, ()=>{
    console.log("server is running on port " + port);
});