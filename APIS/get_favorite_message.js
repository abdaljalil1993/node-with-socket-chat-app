const mysql = require('mysql');
const express = require('express');

const bodyParser = require('body-parser');
console.log('start apis message');
const db = mysql.createPool({
    connectionLimit: 100,
   host: "localhost",       //This is your localhost IP
    user: "memo_messenger",       
    password: "memo2022", 
    database: "memo_chat",     // Database name
    port: "3306"             // port name, "3306" by default
});


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


module.exports = function (app) {

    app.post('/get_favorite_message', (req, res) => {


        const user_id = req.body.user_id;
       
        
        db.getConnection((err, connection) => {
            if (err) throw (err)

            connection.query('SELECT * FROM favorite_message WHERE (reciver_id=?)or(sender_id=?)', [user_id,user_id], (err, results) => {
                if (results.length > 0) {
                    res.status(200).json(results);
                    return;
                }
                else {

                  


                    res.status(400).json("no messages now");
                    return;



                }


            });

        })
    });

}
