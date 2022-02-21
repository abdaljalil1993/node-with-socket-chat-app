const { read } = require("jimp")
const db = require("../../database/connect")


function getAllStore(req, res) {

    var store = []
    db.getConnection(async (err, conection) => {

        if (err) throw err
        req.body.forEach((element, index) => {
            conection.query("select * from stores where id=?", [element.id], (err, result) => {
                if (err) throw err
                store[index] = result[0]

                if (index == (req.body.length - 1)) {
                    res.status(200).json(store)
                }//end of if
            })/* end of query select */
        });

    })/* end of getConnection */


}/* end of getAllStore */

function createStore(req, res) {

    db.getConnection((err, conection) => {
        if (err) throw err
        console.log("request :", req.body)
        if (req.body.text) {

   
            conection.query("insert into stores(user_id,content,text) values(?,?,?)", [req.body.user_id, req.files[0].filename, req.body.text], (err, result) => {
                if (err) throw err
                res.status(200).json({ msg: "store saved " })
            })/* end of insert query */
        } else {


          
            conection.query("insert into stores(user_id,content,type) values(?,?,?)", [req.body.user_id, req.files[0].filename,req.body.type], (err, result) => {
                if (err) throw err
                res.status(200).json({ msg: "store saved " })
            })/* end of insert query */
        }/* end of if  */

    })/* end of getConnection */

}/* end of vreateStore */

function getMyStore(req, res) {

    var store = {}
    // console.log("myStore :", req.body)
    db.getConnection((err, conection) => {

        if (err) throw err

      
            conection.query("select * from stores where user_id=? order by id desc limit 1", [req.body.id], (err, result) => {
                    if(result.length <= 0) 
                    {
                        store.myStore = [];
                        store.views = [];
//                         store.x={x:1 ,};
//                         store.x.y=[10,22,34,66];

// console.log('opssssssss')
                        res.json(store)
                    }
                else 
               { store.myStore = result

                conection.query("select * from viewers where store_id=?", [result.id], (err, results) => {
                   if(results.length >0)
                   {
                    store.views = results
                    res.status(200).json(store)

                    console.log(store)
                   }
                   else{
                    store.views = []
                    res.status(200).json(store)
                   }
                })/* end of select query */

              
            }
          

            })/* end of insert query */
       //end of update query


    })/* end of getConnection */

}/* end of getMyStore */

function deleteStore(req, res) {
    //here  i need id for any store on user_id or both of them
    db.getConnection((err, connection) => {
        connection.query("DELETE FROM stores WHERE id=?;", [req.body.id], (err, resulte) => {

            if (resulte.affectedRows ==0) 
            res.status(200).json({
                msg: "the store id not found",
                data: []
            })
            else
            res.status(200).json({
                msg: "the store was deleted successfly",
                data: []
            })/* end of respone */

        })/* end of delete query */
    })/* end of getConnection */
}/* end of deleteStore */




module.exports = {
    getAllStore: getAllStore,
    createStore: createStore,
    getMyStore: getMyStore,
    deleteStore: deleteStore,
}