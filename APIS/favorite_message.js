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
    console.log ("DB connected successful: to add favorite msg function")})
function addfavoritemsg(app,sende,reciver,msg,t,dt,state,id){ 
        const sender = sende;
        const rec = reciver;
        const message = msg;
        const type = t;
        const state1=state;
        const id1=id;

      //  console.log(message);
        const dt1=dt;

           return new promise(resolve=>{
            db.query('insert into favorite_message(sender_id,reciver_id,message_id,message) values(?,?,?,?,?,?)', [sender,rec,id1,message], (err, results, fields)=> {
              if (err) throw (err)
              //console.log('resultes : ',results.insertId)
              //resolve(results)
              else{
                db.query('select * from  favorite_message  WHERE id=?',[results.insertId],(err,reslt)=>{
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
    addfavoritemsg:addfavoritemsg,
   saved:saved
 }
