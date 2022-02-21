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


 const app = express();
 app.use(bodyParser.urlencoded({extended : true}));
 app.use(bodyParser.json());


 module.exports= function(app){
   
    app.post('/deleteaccount', (req, res)=>{
        const id = req.body.id;
      console.log(id);

        
    
         db.getConnection( (err, connection)=> {   if (err) throw (err)
     
        
             connection.query('delete from  users where id=?', [id], (err, results, fields)=> {
                 if(!err)
                    res.status(200).json("user deleted  successfully");
                 else
                     res.send('ops failed try again later '+JSON.stringify(err));
                           
                 res.end();
             });
             })
    
      });
    
    
    
 }
