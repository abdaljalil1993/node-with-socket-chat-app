const multer = require("multer")
const uuid = require("uuid").v4
const fs = require('fs')
const path = require('path')
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads/audio')
    },//end of dstenation

    filename: function (req, file, cb) {
        const fileOrginalName = file.originalname.split('.')
        const newName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + uuid() + '.' + fileOrginalName[fileOrginalName.length - 1]
        cb(null, file.fieldname + newName)
    }//end of filename

})/* end of storage object */

const fileValidate = (req, file, cb) => {
    console.log("file :",file)
    const type = path.extname(file.originalname)
    if (
        type == ".wproj"            || type == ".sdt"
        || type == ".ec3"           || type == ".cgrp"  
        || type == ".weba"          || type == ".nbs"
        || type == ".mp3"           || type == ".flac"
        || type == ".ckb"           || type == ".l"

        
        || type == ".mui"           || type == ".pna"
        || type == ".band"          || type == ".cwb"
        || type == ".ust"           || type == ".dmse"
        || type == ".4mp"           || type == ".sngx"
        || type == ".apl"           || type == ".mmlp"
        || type == ".aup"           || type == ".mtm"
        || type == ".sf2"           || type == ".wav"

        
        || type == ".vpw"           || type == ".syw"
        || type == ".gsf"           || type == ".amxd"
        || type == ".vsq"           || type == ".bidule"
        || type == ".h5s"           || type == ".cwt"
        || type == ".igp"           || type == ".pek"
        || type == ".mka"           || type == ".voxal"

        
        || type == ".omg"           || type == ".wft"
        || type == ".wvc"           || type == ".mpa"
        || type == ".cwp"           || type == ".mmp"
        || type == ".wve"           || type == ".vyf"
        || type == ".vip"           || type == ".dra"
        || type == ".dvf"           || type == ".vox"  || type == ".3gp"
      
    ) {
        cb(null, true);
    } else {
        cb(null, false)
        return cb(new Error('Only .vox, .flac , .mp3, .mpa, .wav, .wma and .wft format allowed!'));
    }/* end of if  */

}//end of fileFilter

const upload = multer({
    storage: storage,
    fileFilter: fileValidate,
});/* end of upload object */

module.exports = { upload: upload }


