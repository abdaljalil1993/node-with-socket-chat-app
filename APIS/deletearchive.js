const mysql = require('mysql');
const express = require('express');

const bodyParser = require('body-parser');
console.log('start apis message');
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
   
    app.post('/deletearchive', (req, res)=>{
        console.log("hiiiiiiiiiiiiiiiiiii");

        const reciver_id = req.body.your_id;
        const sender_id = req.body.my_id;

        console.log("hiiiiiiiiiiiiiiiiiii");
     
         db.getConnection( (err, connection)=> {   if (err) throw (err)
     
        
             connection.query('SELECT * FROM chat_room WHERE (reciver_id = ? and sender_id=?)or(reciver_id = ? and sender_id=?)', [reciver_id,sender_id,sender_id,reciver_id], (err, results)=> {
                 if(results.length > 0)
                   { 
                       console.log(results);

                    console.log(results[0].id)
                    connection.query("update  chat_room set state=0 where id=?",[results[0].id],(er,resu)=>{

                        if(!er)
                        {
                            res.status(200).json('delete from archived done');
                        }
                                      }); 

               return;
                }
                
                           
               
             });
      
            })
      });
    
    
    
 }
