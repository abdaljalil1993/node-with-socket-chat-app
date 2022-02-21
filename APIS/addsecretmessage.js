const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const promise=require('promise')
const db = mysql.createConnection({
  
   host: "localhost",       //This is your localhost IP
    user: "memo_messenger",       
    password: "memo2022", 
    database: "memo_chat",     
    port: "3306"            
 });
 db.connect( (err, connection)=> {   if (err) throw (err)
    console.log ("DB connected successful: to add msg function")})
function addmsg(app,sende,reciver,msg,t,dt,state){ 
        const sender = sende;
        const rec = reciver;
        const message = msg;
        const type = t;
        const state1=state

      //  console.log(message);
        const dt1=dt;

           return new promise(resolve=>{
            db.query('insert into messages(sender_id,reciver_id,message_type,message,created_at,state,is_secret) values(?,?,?,?,?,?)', [sender,rec,type,message,dt1,dt1,state1,true], (err, results, fields)=> {
              if (err) throw (err)
              //console.log('resultes : ',results.insertId)
              //resolve(results)
              else{
                db.query('select * from  messages  WHERE id=?',[results.insertId],(err,reslt)=>{
                  if(err) throw err
                  resolve(reslt)
                });
              }
           }); /* end of query */
           }) ; /* end of resolve promise */ 
 }
/* end of addmsg */


function saved(data){

    if(data){
      db.query('UPDATE messages SET state =? WHERE id=?',[data.state,data.id],(err,reslt)=>{
        if(err) throw (err)
      })/* end of update query */
      
    }/* end of if */

 }/* end of saved */

 module.exports={
   addmsg:addmsg,
   saved:saved
 }
