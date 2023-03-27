const sql = require('./db');
const InsertUser = (req,res)=>{
    const NewUserEntry = {
        "id" : req.body.UserID,
        "email" : req.body.UserEmail,
        "age" : req.body.UserAge,
        "gender" : req.body.UserGender,
        "englishLevel" : req.body.UserEnglishLevel,
        "area" : req.body.UserArea,
        "internetStability" : req.body.internetStability,
        "webAttendee" : req.body.webAttendee
    }
    const Q1 = "INSERT INTO students (email, age, gender, englishLevel, area, internetStability, webAttendee) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const values = [NewUserEntry.email, NewUserEntry.age, NewUserEntry.gender, NewUserEntry.englishLevel, NewUserEntry.area, NewUserEntry.internetStability, NewUserEntry.webAttendee];
    sql.query(Q1, values, (err, pgres)=>{
        if (err) {
            res.status(400).send({message: "error on creating user " + err});
            console.log("error on creating user " + err);
            return;            
        }
        console.log("created new user succesfully "+ pgres);
        res.render('EnterPage')
        return;
    });
};

const SearchUser = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    const uEmail = req.body.UserEmail;

    const Q3 = "SELECT * FROM students WHERE (email=$1)";
    sql.query(Q3, [uEmail],(err, pgres)=>{
            if (err) {
                console.log("error in getting all users " + err);
                res.status(400).send({message:"error in getting all users " + err});
                return;
            }
            if (pgres.rows.length == 0){
                const message1 = "One or more fields are incorrect.";
                const message2 = "Please try again.";
                res.render('FailPage', {failMessage1: message1, failMessage2: message2});
                return;
            }
            console.log("success... ");
            res.render('PlatformPage');
            return;
        });

};

module.exports = {InsertUser, SearchUser}
