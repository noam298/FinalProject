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
    const Q1 = "INSERT INTO students SET ?";
    sql.query(Q1, NewUserEntry, (err, mysqlres)=>{
        if (err) {
            res.status(400).send({message: "error on creating user " + err});
            console.log("error on creating user " + err);
            return;            
        }
        console.log("created new user succesfully "+ mysqlres);
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

    const Q3 = "SELECT * FROM students WHERE (email=?)";
    sql.query(Q3, [uEmail],(err, mysqlres)=>{
            if (err) {
                console.log("error in getting all users " + err);
                res.status(400).send({message:"error in getting all users " + err});
                return;
            }
            if (mysqlres.length == 0){
                const message1 = "One or more fields are incorrect.";
                const message2 = "Please try again.";
                res.render('FailPage', {failMessage1: message1, failMessage2: message2});
                return;
            }
            console.log("success... ");
            res.render('VideoPage');
            return;
        });

};

module.exports = {InsertUser, SearchUser}
