const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const db = mysql.createPool({
    connectionLimit: 100,
   host: "localhost",       //This is your localhost IP
    user: "memo_messenger",       
    password: "memo2022", 
    database: "memo_chat", // Database name
    port: "3306"             // port name, "3306" by default
 });


 const app = express();
 app.use(bodyParser.urlencoded({extended : true}));
 app.use(bodyParser.json());


 module.exports= function(app){
   
    app.post('/updateaccount', (req, res)=>{
        const id = req.body.id;
        const phone = req.body.phone;
        const email = req.body.email;
        const password = req.body.password;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const middle_name = req.body.middle_name;
        const is_active = req.body.is_active;
        const is_reported = req.body.is_reported;
        const is_blocked = req.body.is_blocked;
        const preferences = req.body.preferences;
        const createdat = req.body.createdat;
        const updatedat = req.body.updatedat;
    
         db.getConnection( (err, connection)=> {   if (err) throw (err)  
             connection.query('update users set phone=? , email=? , password=? , first_name=? , last_name=? , middle_name=? , is_active=? , is_reported=? , is_blocked=? , preferences=? , created_at=? , updated_at=? where id=?', [phone,email,password,first_name,last_name,middle_name,is_active,is_reported,is_blocked,preferences,createdat,updatedat,id], (err, results, fields)=> {
                 if(!err)
                    res.send("update account successfully");
                 else
                     res.send('ops failed try again later '+JSON.stringify(err));
                           
                 res.end();
             });
             })
     
     
      });
    
    
    
 }
