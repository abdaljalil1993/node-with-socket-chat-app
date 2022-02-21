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
   
    app.post('/deletmessage', (req, res)=>{
    //     const id = req.body.id;
    //   console.log(id);

      const data = req.body.data;
  
     // var list=[];
      
              var data1=JSON.parse(data);
              console.log(data1);

              console.log(data1.length);
    
         db.getConnection( (err, connection)=> {   if (err) throw (err)
     
            for(var i=0 ; i<data1.length;i++)
            {
                connection.query('delete from  messages where message_id=?', [data1[i]], (err, results, fields)=> {
                     if(!err)
                     console.log('delete',data1[i])
                    //    res.status(200).json("message deleted  successfully");
                     else
                     console.log('not delete',data1[i])
                    //     res.send('ops failed try again later '+JSON.stringify(err));
                              
                    // res.end();
                });
            }
            res.status(200).json("message deleted  successfully");
            
             })
    
      });
    
    
    
 }
