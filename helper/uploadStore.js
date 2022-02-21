const multer = require("multer")
const uuid = require("uuid").v4
const fs = require('fs')
const path = require('path')
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads/storeFiles')
    },//end of dstenation

    filename: function (req, file, cb) {

        const fileOrginalName = file.originalname.split('.')
        const newName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + uuid() + '.' + fileOrginalName[fileOrginalName.length - 1]
        cb(null, file.fieldname + newName)
    }//end of filename

})/* end of storage object */

const fileValidate = (req, file, cb) => {
    const type = path.extname(file.originalname)
    if (

        //vedio section 
        type == ".mp4"
        || type == ".mov"
        || type == ".wmv"
        || type == ".avi"
        || type == ".avchd"
        || type == ".f4v"
        || type == ".flv"
        || type == ".swf"
        || type == ".mkv"
        || type == ".webm"


        //image section 
        || type == ".png"
        || type == ".gif"
        || type == ".jpg"
        || type == ".jpeg"
        || type == ".svg"

    ) {
        cb(null, true);
    } else {
        cb(null, false)
        return cb(new Error('Only .mp4, .mov , .wmv, .avi, .avchd, .f4v, .flv, .swf, .mkv and .webm format allowed!'));
    }/* end of if  */

}//end of fileFilter

const upload = multer({
    storage: storage,
    fileFilter: fileValidate,
});/* end of upload object */

module.exports = { upload: upload }


