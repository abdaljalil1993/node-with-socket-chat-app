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


 module.exports= function(app,sender_id,reciver_id){
   
 

            return new Promise(resolve=>{

                var data={};
        
            db.getConnection(  (err, connection)=> {   if (err) throw (err)
                
                connection.query('select * FROM users WHERE id = ?', [sender_id], (err, results)=> {
                    if(!err)
                       {
                      console.log("user data "+results[0])
                        connection.query("select * from messages where sender_id=? and reciver_id=? order by id desc limit 1",[sender_id,reciver_id],(e,r)=>{

                        if(!e)
                        {
                                data={
                                    'user': results[0],
                                    'message': r[0]
                                }

                                resolve( data);
                        }
                        });

                        
                       }
                    else
                       {
                       
                        data={
                            'user': 'no user',
                            'message': 'no message'
                        }
                        console.log("else data : "+data)
                        resolve( data);
                       }
                              
                    
                });
            });
         
               })  

     
        
  
    
    
 }


