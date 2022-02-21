const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const db = mysql.createPool({
    connectionLimit: 100,
   host: "localhost",       //This is your localhost IP
    user: "memo_messenger",       
    password: "memo2022", 
    database: "memo_chat",      // Database name
    port: "3306"             // port name, "3306" by default
 });


 const app = express();
 app.use(bodyParser.urlencoded({extended : true}));
 app.use(bodyParser.json());


 module.exports= function(app){
   
    app.post('/profile', (req, res)=>{
        const id = req.body.id;
       console.log(id);
         db.getConnection( (err, connection)=> {   if (err) throw (err)
     
         if (id) {
             connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results, fields)=> {
                 if(results.length > 0)
                    res.send(results);
                 else
                     res.send('no data '+JSON.stringify(err));
                           
                 res.end();
             });
         } else {
             res.send('Please enter id');
             res.end();
         }
    
            })
      });
    
    
    
 }
