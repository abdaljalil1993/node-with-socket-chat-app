const mysql = require('mysql');
const express = require('express');

const bodyParser = require('body-parser');
console.log('start apis message');
const db = mysql.createPool({
    connectionLimit: 100,
   host: "localhost",       //This is your localhost IP
    user: "memo_messenger",       
    password: "memo2022", 
    database: "memo_chat",      // Database name
    port: "3306"             // port name, "3306" by default
});


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


module.exports = function (app) {

    app.post('/messagesbyusers', (req, res) => {
        console.log(req.body)

        const reciver_id = req.body.reciver_id;
          const sender_id = req.body.sender_id;
        console.log(sender_id);
        console.log(reciver_id);
        db.getConnection((err, connection) => {
            if (err) throw (err)

            connection.query('SELECT * FROM messages WHERE (reciver_id = ? and sender_id=?)or(reciver_id = ? and sender_id=?)', [reciver_id, sender_id, sender_id, reciver_id], (err, results) => {
                if (results.length > 0) {
                    res.send(results);
                    return;
                }
                else {

                    // connection.query("insert into chat_room (sender_id,reciver_id) values(?,?)", [sender_id, reciver_id], (er, resu) => {

                    //     res.json(resu.insertId);
                    // });
                    var data=[];
               
                    res.json(data);





                }


            });

        })
    });

}
