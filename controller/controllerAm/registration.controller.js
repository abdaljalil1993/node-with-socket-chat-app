const bcrypt = require('bcryptjs');
const db = require("../../database/connect")
const fastetValidation = require("fastest-validator")

function login(req, res) {

    const v = new fastetValidation()
    const validate = v.validate(req.body, {
        identify: { type: "string", optional: false },
        password: { type: "string", min: 8, optional: false },
        type: { type: "string", optional: false }
    })/* end of validate */
    if (validate !== true) {
        return res.status(200).json({
            messgae: "Field Validation",
            error: validate
        })/* end of return */
    }/* end of if */

    db.getConnection((err, connection) => {

        if (err) throw err
        if (req.body.type == "phone") {
            connection.query("select * from users where phone=?", [req.body.identify], (err, resulte) => {
                if (err) throw err
                if (!resulte[0]) {
                    return res.status(200).json({
                        message: "This data is not expected",
                        error: "phone dose not match",
                        profile: null
                    })/* end of return */
                }/* end of if */

                bcrypt.compare(req.body.password, resulte[0].password, (err, isMatch) => {
                    if (err)
                        console.log(err)
                    if (isMatch) {
                        resulte[0].password=""
                        return res.status(200).json({
                            message: "user is authenticated",
                            error: null,
                            profile: resulte[0]
                        })/* end of return */
                    } else {
                        return res.status(200).json({
                            message: "This data is not expected",
                            error: "password dose not match",
                            profile: null
                        })/* end of return */
                    }/* end of if */
                })/* end of bycrpt compare */
            })/* end of select query */
        }/* end of phone if */

        if(req.body.type == "email"){
            connection.query("select * from users where email=?", [req.body.identify], (err, resulte) => {
                if (err) throw err
                if (!resulte[0]) {
                    return res.status(200).json({
                        message: "This data is not expected",
                        error: "email dose not match",
                        profile: null
                    })/* end of return */
                }/* end of if */

                bcrypt.compare(req.body.password, resulte[0].password, (err, isMatch) => {
                    if (err)
                        console.log(err)
                    if (isMatch) {
                        resulte[0].password=""
                        return res.status(200).json({
                            message: "user is authticated",
                            error: null,
                            profile: resulte[0]
                        })/* end of return */
                    } else {
                        return res.status(200).json({
                            message: "This data is not expected",
                            error: "password dose not match",
                            profile: null
                        })/* end of return */
                    }/* end of if */
                })/* end of bycrpt compare */
            })/* end of select query */
        }/* end of email if */

    })/* end of getConnection */
}/* /login */

function setPasswordProfile(req, res) {
    bcrypt.genSalt(10, function (err, Salt) {
        if (err) throw err
        bcrypt.hash(req.body.password, Salt, function (err, hash) {

            if (err) {
                return console.log(err);
            } else {
                db.getConnection((err, connection) => {
                    if (err) throw err
                    connection.query("UPDATE users SET password = ? WHERE id=?", [hash, req.body.profile.id], (err, result) => {
                        if (err) throw err
                        connection.query("select * from users where id=?", [req.body.profile.id], (err, results) => {
                            if (err) throw err
                            results[0].password = ''
                            console.log("password :", results)
                            res.status(200).json(results)
                        })/* /select query */
                    })/* /end of update query */
                })/* /getConnection */
            }/* /end of if */
        })/* /bcrypt hash */
    })/* /bcrypt */
}/* /setPasswordProfile */


module.exports = {
    setPasswordProfile: setPasswordProfile,
    login: login
}/* end of module exports */