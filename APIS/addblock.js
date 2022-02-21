const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const db = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",       //This is your localhost IP
    user: "memo_messenger",       
    password: "memo2022", 
    database: "memo_chat",       
    port: "3306"            
 });
 db.getConnection( (err, connection)=> {   if (err) throw (err)
    console.log ("DB connected successful: " + connection.threadId)})

 const app = express();
 app.use(bodyParser.urlencoded({extended : true}));
 app.use(bodyParser.json());


 module.exports= function(app){
   
    app.post('/addtoblock', (req, res)=>{
        const user_id = req.body.user_id;
        const participants_id = req.body.participants_id;
    
    
        
        
    
         db.getConnection( (err, connection)=> {   if (err) throw (err)
     
        
             connection.query('insert into block_list(user_id,participants_id) values(?,?)', [user_id,participants_id], (err, results, fields)=> {
                 if(!err)
                    res.send("send report successfully");
                 else
                     res.send('ops failed try again later '+JSON.stringify(err));
                           
                 res.end();
             });
             })
    
      });
    
    
    
 }
