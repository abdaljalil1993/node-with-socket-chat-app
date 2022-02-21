const multer = require("multer")
const uuid = require("uuid").v4
const fs = require('fs')
const path =require("path")
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads/files')
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
        type == ".pdf"
        || type == ".zip"
        || type == ".rar"

        || type == ".docx"
        || type == ".dotx"

        || type == ".doc"
        || type == ".txt"

        || type == ".xlsx"
        || type == ".xltx"

        || type == ".ppt"
        || type == ".pptx"

    ) {
        cb(null, true);
    } else {
        cb(null, false)
        return cb(new Error('Only .pdf, .rar , .docx, .dotx, .dotx, .doc , .txt, .xltx, .xlsx, .ppt and .pptx  format allowed!'));
    }/* end of if  */

}//end of fileFilter

const upload = multer({
    storage: storage,
    fileFilter: fileValidate,
});/* end of upload object */

module.exports = { upload: upload }


