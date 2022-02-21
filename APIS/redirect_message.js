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

     
        const dt1=dt;

           return new promise(resolve=>{
     
//redirect message to one user
          db.query("select * from chat_room where (sender_id=? and reciver_id=?)or(sender_id=? and reciver_id=?)",[sender,rec,rec,sender],(er2,result2)=>{
            if(er2) throw(er2)
            else{
              if(result2.length >0 )
              {
                  db.query('insert into messages(sender_id,reciver_id,message_type,message,created_at,state) values(?,?,?,?,?,?)', [sender,rec,type,message,dt1,dt1,state1], (err, results1, fields)=> {
              if (err) throw (err)
            
              else{
                db.query('select * from  messages  WHERE id=?',[results1.insertId],(err,reslt)=>{
                  if(err) throw err
                  else{
                    var data={
                      'chat_id': result2[0].id,
                      'msg':reslt

                  }
                  resolve(data)
                  }
                  
                });
              }
           });

              }

              else{
                db.query("insert into chat_room(sender_id,reciver_id,state) values(?,?,?)",[sender,rec,0],(er3,res3)=>{
                    if(!er3)
                    {
                      db.query('insert into messages(sender_id,reciver_id,message_type,message,created_at,state) values(?,?,?,?,?,?)', [sender,rec,type,message,dt1,dt1,state1], (err2, results, fields)=> {
                        if (err2) throw (err2)
                       
                        else{
                          db.query('select * from  messages  WHERE id=?',[results.insertId],(err1,reslt33)=>{
                            if(err1) throw (err1)
                            else{
                              var data={
                                'chat_id': results.insertId,
                                'msg':reslt33

                            }
                              resolve(data)
                            }
                            
                          });
                        }
                     });
                    }
                });
              }
            }
              });



           }) ; /* end of resolve promise */ 
 }
/* end of addmsg */


function saved(data){

    if(data){
      db.query('UPDATE messages SET state =? WHERE id=?',[data.state,data.id],(err,reslt)=>{
        if(err) throw (err)
      })/* end of update query */
      
    }/* end of if */

 }

 module.exports={
   addmsg:addmsg,
   saved:saved
 }
