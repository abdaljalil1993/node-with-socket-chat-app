const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const db = mysql.createPool({
    connectionLimit: 100,
   host: "localhost",       //This is your localhost IP
    user: "memo_messenger",       
    password: "memo2022", 
    database: "memo_chat",    // Database name
    port: "3306"             // port name, "3306" by default
 });


 const app = express();
 app.use(bodyParser.urlencoded({extended : true}));
 app.use(bodyParser.json());


 module.exports= function(app){
   
    app.post('/addtoken', (req, res)=>{
        const users_id = req.body.users_id;
        const token = req.body.token;
 

        
    
         db.getConnection( (err, connection)=> {   if (err) throw (err)
     
        
             connection.query('select * from users where id=?', [users_id], (err, results)=> {
                 if(results.length > 0 )
                 {
                    
                           connection.query("update users set user_token=? where id=?",[token,users_id],(e,r)=>{
                                    if(!e)
                                    res.status(200).json("token updated|stored successfully")

                           });

                     
                 }
                   
                 else
                 res.status(200).json("token  failed in updated|stored ")
                           
                
             });
            
            
            })
    
      });
    
    
    
 }
