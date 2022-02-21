const mysql = require('mysql');
const express = require('express');

const bodyParser = require('body-parser');
console.log('start apis message');
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
   
    app.post('/deleteallmessages', (req, res)=>{
       

        const reciver_id = req.body.your_id;
        const sender_id = req.body.my_id;

        
     
         db.getConnection( (err, connection)=> {   if (err) throw (err)
     
        
             connection.query('delete FROM messages WHERE (reciver_id = ? and sender_id=?)or(reciver_id = ? and sender_id=?)', [reciver_id,sender_id,sender_id,reciver_id], (err, results)=> {
                 if(!err)
                   { 
                       res.status(200).json("all message deleted")
                }

                else{
                    res.status(400).json("failed with delete all message")
                }
                
                           
               
             });
      
            })
      });
    
    
    
 }
