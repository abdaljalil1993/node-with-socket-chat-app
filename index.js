const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const cors = require('cors');




const db = mysql.createPool({
  connectionLimit: 100,
   host: "localhost",       //This is your localhost IP
    user: "memo_messenger",       
    password: "memo2022", 
    database: "memo_chat",      // Database name
  port: "3306"             // port name, "3306" by default
});
// db.getConnection((err, connection) => {
//   if (err) throw (err)
//   console.log("DB connected successful: " + connection.threadId)
// })
const app = express();
app.use(cors())



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// //normal login
// require('./APIS/login')(app);
// //login with phone number
// require('./APIS/login_with_phone')(app);
// //get message by conversation 
// require('./APIS/message_by_conversation')(app);
// //my deleted conversation
// require('./APIS/deleted_conversation')(app);
//my contact lis
require('./APIS/mycontact')(app);
//my block lis
// require('./APIS/myblocklist')(app);
//all users
require('./APIS/alluser.js')(app);
//all contacts
// require('./APIS/allcontacts.js')(app);
// //all conversation
// require('./APIS/allconversation.js')(app);
// //all report
// require('./APIS/allreports')(app);

// // report by user id
// require('./APIS/userreport')(app);
// // user devices
// require('./APIS/userdevice')(app);
// user access
// require('./APIS/useraccess')(app);
//search for user
require('./APIS/search')(app);
//get profile
require('./APIS/profile')(app);
// create new account
// require('./APIS/signup')(app);
//update accounts data
// require('./APIS/updateuser')(app);
//all conversation participants
// require('./APIS/conversation_participants')(app);


   // add token
   require('./APIS/addtoken')(app);
  
    // message by users
    require('./APIS/message_by_users')(app);

//delete message
require('./APIS/delete_message')(app);
//my chat
// require('./APIS/getmychat')(app);

// //my chat
// require('./APIS/getmychat2')(app);
//delete device
// require('./APIS/logout_mydevice')(app);

// //send report
// require('./APIS/sendreport')(app);


//delete from ARCHIVE
require('./APIS/deletearchive.js')(app);
//make new chat
// require('./APIS/createconversation')(app);
// //add new device
// require('./APIS/addnewdevice')(app);
// //block user
// require('./APIS/addblock')(app);


//make archive caht
require('./APIS/archive_chat')(app);



//delete chat
require('./APIS/deletechat')(app);


router.get('/', function (req, res) {
  // res.sendFile(path.join(__dirname + '/public/index.html'));
res.send("fadi heroku");
});
app.use('/css', express.static(__dirname + '/public/vendor/bootstrap/css'));
app.use('/js', express.static(__dirname + '/public/vendor/bootstrap/js'));

app.use('/', router);
app.listen(8000);




