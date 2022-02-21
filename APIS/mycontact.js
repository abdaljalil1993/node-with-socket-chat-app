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
   
    app.post('/mycontact', (req, res)=>{
        const data1 = req.body.data;
var list=[];

        var data=JSON.parse(data1);
            db.getConnection(  (err, connection)=> {   if (err) throw (err)
                for(var i=0;i<data.length;i++){
                connection.query('select * FROM users WHERE phone = ?', [data[i].number], (err, results)=> {
                    if(!err)
                       {
                           list['name']=data[i].name;
                           list['phone']=data[i].number;
                           list['state']=true;
                       }
                    else
                       {
                        list['name']=data[i].name;
                        list['phone']=data[i].number;
                        list['state']=false;
                       }
                              
                    
                });
            }
         
               })  

       res.json(list);
        
      });
    
    
 }
