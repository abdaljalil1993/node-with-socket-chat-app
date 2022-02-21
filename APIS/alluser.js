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
    app.get('/allusers', (req, res)=>{
 
        db.getConnection( (err, connection)=> {   if (err) throw (err)
    
        
            connection.query('SELECT * FROM users', (err, results, fields)=> {
                if(results.length > 0)
                   res.json({'message':'data retrived successfully','Results':results});
                else
                    res.send('no user now  '+JSON.stringify(err));
                          
                res.end();
            });
          })
     });
 }
