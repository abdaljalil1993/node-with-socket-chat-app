const db = require("../../database/connect")
const promise = require('promise')


//this conttroller for ammar hadee
function uploadFile(req, res) {
    // console.log("req : ", req.body)
    // console.log("req : ", req.files)
    db.getConnection((err, connection) => {
        if (err) throw err
                console.log("data from app :",req.body)
        connection.query('insert into messages(sender_id,reciver_id,message_type,message,created_at,state) values(?,?,?,?,?,?)',
            [req.body.sender_id, req.body.reciver_id, req.body.message_type, req.files[0].filename, req.body.dateTime, req.body.state],
            (err, results, fields) => {

                if (err) throw err
                connection.query('select * from messages where id=?',
                    [results.insertId],
                    (err, reslt) => {
                        //console.log("res :",reslt)
                        if (err) throw err
                        reslt[0].orginalName = req.files[0].originalname
                        connection.query("UPDATE messages SET orginalName = ?  WHERE id=?", [req.body.orginalName, reslt[0].id], (err, restl) => {
                            if (err) throw err


                            console.log("updated message : "+reslt[0].id)
                            connection.query("select * from messages where id=? ", [reslt[0].id], (err, resslt) => {
                                
                                connection.query("select * from chat_room where (sender_id=? and reciver_id=?) or (sender_id=? and reciver_id=?)",[resslt[0].sender_id,resslt[0].reciver_id,resslt[0].reciver_id,resslt[0].sender_id],(err,resltChatRoom)=>{
                                   console.log("chat detailes : ",resltChatRoom[0])
                                    resslt[0].chat_id=resltChatRoom[0].id
                                    resslt[0].id=reslt[0].id
                                    res.status(200).json( resslt[0])
                                })/* end of select query */
                            })/* end of select all from messages */
                        })/* end of update */

                    })/* end of get msg */

            })/* end of results */
    })/* end of getConnection */

}/* end of uploadFile */

function uploadImgProfile(req, res) {

    var fileName = ""
    if (req.files[0]) {
        fileName = req.files[0].filename
    }
    db.getConnection((err, connection) => {
        if (err) throw err
        connection.query("UPDATE users SET email = ?,sn=?,first_name=?,last_name=?,profile_image=? WHERE id=?",
            [req.body.email, req.body.sn, req.body.first_name, req.body.last_name, fileName, req.body.id],
            (err, resulte) => {
                if (err) throw err
                connection.query("select * from users where id=?", [req.body.id], (err, reslut) => {
                    if (err) throw err
                    res.status(200).json(reslut)
                })/* /end of select query */
            })/* /update query */
    })/* /end of getConnection */
}/* end of uploadImgProfile */

module.exports = {
    uploadFile: uploadFile,
    uploadImgProfile: uploadImgProfile
}