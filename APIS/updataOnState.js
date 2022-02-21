const mysql = require('mysql');
const promise=require('promise')

function updateOnState(data){
    const db=mysql.createPool({
      host: "localhost",       //This is your localhost IP
    user: "memo_messenger",       
    password: "memo2022", 
    database: "memo_chat",     
        port: "3306"  
    })/* end of connetPool */


    return new promise(async resolve=>{
        db.getConnection((err,connection)=>{

            //this metter to make every message for me become seen for sender user
            connection.query('SELECT * FROM messages WHERE reciver_id = ? and sender_id=?',[data.my_id,data.your_id],(err,reslt)=>{
                if (err) throw err
              //  console.log("all messages :",reslt)

                for(var i=0;i<reslt.length;i++){
                     connection.query('UPDATE messages SET state =? WHERE reciver_id=?',[data.state,reslt[i].reciver_id],(err,reslts)=>{
                       if(err) throw err
                    })/* end of update query */
                }/* end of for loop */

                //this section to get all message for reciver id and get all message 
                connection.query('SELECT * FROM messages WHERE reciver_id=?',[data.your_id],(err,msg)=>{
                    if (err) throw err
                   //  console.log("last message :", msg)
                     resolve(msg[msg.length-1])
                 })/* end query for get last message */

               
                
                
            })/* end of query */
        })/* end of getConnection */
    })/*end of promise object*/
}/* end of  updateOnState function*/

module.exports={
    updateOnState:updateOnState
}