const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const db = mysql.createPool({
    connectionLimit: 100,
   host: "localhost",       //This is your localhost IP
    user: "memo_messenger",       
    password: "memo2022", 
    database: "memo_chat",     // Database name
    port: "3306"             // port name, "3306" by default
 });


 const app = express();
 app.use(bodyParser.urlencoded({extended : true}));
 app.use(bodyParser.json());


 module.exports= function(app){
   
    app.post('/delet_secret_message', (req, res)=>{
        const id = req.body.id;
      console.log(id);

        
    
         db.getConnection( (err, connection)=> {   if (err) throw (err)
     
        
             connection.query('delete from  messages where id=? and is_secret=?', [id,1], (err, results, fields)=> {
                 if(!err)
                    res.status(200).json(" secret message deleted  successfully");
                 else
                     res.send('ops failed try again later '+JSON.stringify(err));
                           
                 res.end();
             });
             })
    
      });
    
    
    
 }
