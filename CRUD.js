const sql = require('./db');
const InsertUser = (req, res) => {
    const NewUserEntry = {
        "id": req.body.UserID,
        "email": req.body.UserEmail,
        "age": req.body.UserAge,
        "gender": req.body.UserGender,
        "englishLevel": req.body.UserEnglishLevel,
        "area": req.body.UserArea,
        "internetStability": req.body.internetStability,
        "webAttendee": req.body.webAttendee
    }
    const Q1 = "INSERT INTO students (email, age, gender, englishLevel, area, internetStability, webAttendee) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const values = [NewUserEntry.email, NewUserEntry.age, NewUserEntry.gender, NewUserEntry.englishLevel, NewUserEntry.area, NewUserEntry.internetStability, NewUserEntry.webAttendee];
    sql.query(Q1, values, (err, pgres) => {
        if (err) {
            res.status(400).send({ message: "error on creating user " + err });
            console.log("error on creating user " + err);
            return;
        }
        console.log("created new user succesfully " + pgres);
        res.render('EnterPage')
        return;
    });
};

const SearchUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    const uEmail = req.body.UserEmail;

    const Q3 = "SELECT * FROM selectusers WHERE (email=$1)";
    sql.query(Q3, [uEmail], (err, pgres) => {
        if (err) {
            console.log("error in getting all users " + err);
            res.status(400).send({ message: "error in getting all users " + err });
            return;
        }
        if (pgres.rows.length == 0) {
            const message1 = "One or more fields are incorrect.";
            const message2 = "Please try again.";
            res.render('FailPage', { failMessage1: message1, failMessage2: message2 });
            return;
        }

        const groupno = parseInt(pgres.rows[0].groupno);
        const email = pgres.rows[0].email;

        console.log(`Groupno of user trying to login is ${groupno}`)
        console.log(`Email of user trying to login is ${email}`)

        const userAgent = req.headers['user-agent'];
        const isMobile = /Mobile/.test(userAgent);

        switch (groupno) {
            case 1:
                if (isMobile) {
                    console.log('Rendering complete session');
                    req.session.email = email; // Set email as session
                    req.session.groupno = groupno
                    req.session.grouptype= 'complete'
                    res.redirect("/CompleteSessions");
                } else {
                    console.log('Error: group 1 can only be accessed from a mobile device');
                    res.render('FailPage', { failMessage1: "Error", failMessage2: "You can only log in from mobile" });
                    // res.status(400).send('Error: group 1 can only be accessed from a mobile device');
                }
                break;
            case 2:
                if (isMobile) {
                    console.log('Rendering divided session');
                    req.session.email = email; // Set email as session
                    req.session.groupno = groupno
                    req.session.grouptype= 'divided'
                    res.redirect("/DividedSessions");
                } else {
                    console.log('Error: group 2 can only be accessed from a mobile device');
                    res.render('FailPage', { failMessage1: "Error", failMessage2: "You can only log in from mobile" });
                    // res.status(400).send('Error: group 2 can only be accessed from a mobile device');
                }
                break;
            case 3:
                if (isMobile) {
                    console.log('Error: group 3 can only be accessed from a PC');
                    res.render('FailPage', { failMessage1: "Error", failMessage2: "You can only log in from PC" });
                    // res.status(400).send('Error: group 3 can only be accessed from a PC');
                } else {
                    console.log('Rendering complete session');
                    req.session.email = email; // Set email as session
                    req.session.groupno = groupno
                    req.session.grouptype= 'complete'
                    res.redirect("/CompleteSessions");
                }
                break;
            case 4:
                if (isMobile) {
                    console.log('Error: group 4 can only be accessed from a PC');
                    res.render('FailPage', { failMessage1: "Error", failMessage2: "You can only log in from PC" });
                    // res.status(400).send('Error: group 4 can only be accessed from a PC');
                } else {
                    console.log('Rendering divided session');
                    req.session.email = email; // Set email as session
                    req.session.groupno = groupno
                    req.session.grouptype= 'divided'
                    res.redirect("/DividedSessions");
                }
                break;
            case 5:
                console.log('Rendering complete session');
                req.session.email = email; // Set email as session
                req.session.groupno = groupno
                req.session.grouptype= 'complete'

                //Saving device data in DB for case 5
                if (isMobile) {
                    // Save "mobile" in device column for user with email req.session.email
                    const query = "UPDATE students SET device = 'mobile' WHERE email = $1";
                    sql.query(query, [req.session.email], (err, result) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log("Device updated to mobile for user with email", req.session.email);
                      }
                    });
                  } else {
                    // Save "PC" in device column for user with email req.session.email
                    const query = "UPDATE students SET device = 'PC' WHERE email = $1";
                    sql.query(query, [req.session.email], (err, result) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log("Device updated to PC for user with email", req.session.email);
                      }
                    });
                  }
                  

                res.redirect("/CompleteSessions");
                break;
            case 6:
                console.log('Rendering divided session');
                req.session.email = email; // Set email as session
                req.session.groupno = groupno
                req.session.grouptype= 'divided'

                //Saving device data in DB for case 6
                if (isMobile) {
                    // Save "mobile" in device column for user with email req.session.email
                    const query = "UPDATE student SET device = 'mobile' WHERE email = $1";
                    sql.query(query, [req.session.email], (err, result) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log("Device updated to mobile for user with email", req.session.email);
                      }
                    });
                  } else {
                    // Save "PC" in device column for user with email req.session.email
                    const query = "UPDATE student SET device = 'PC' WHERE email = $1";
                    sql.query(query, [req.session.email], (err, result) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log("Device updated to PC for user with email", req.session.email);
                      }
                    });
                  }
                  
                
                res.redirect("/DividedSessions");
                break;
            default:
                console.log('Error: invalid group number');
                res.status(400).send('Error: invalid group number');
        }

    });

};

module.exports = { InsertUser, SearchUser }
