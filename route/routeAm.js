const express=require("express")
const route=express.Router()
const uploadContoller=require('../controller/controllerAm/upload.controller')
const storeController=require('../controller/controllerAm/store.controller')
const registrationController=require("../controller/controllerAm/registration.controller")
const uploadAudio=require("../helper/uploadAudio")
const upload=require('../helper/uploadFile')
const uploadVedio=require('../helper/uploadVedio')
const uploadStore=require ('../helper/uploadStore')
const uploadImgProfile=require('../helper/uploadImageProfile')
const uploadIamgeChat=require("../helper/uploadImageChat")


//storeController
route.post('/getAllStore',storeController.getAllStore)
route.post('/getMyStore',storeController.getMyStore)
route.post('/deleteMyStore',storeController.deleteStore)
route.post('/createStore',uploadStore.upload.array('store'),storeController.createStore)


//registration controller
route.post('/setPasswordProfile',registrationController.setPasswordProfile)
route.post('/loginUser',registrationController.login)

//uploadController
route.post('/uploadFile',upload.upload.array('files'),uploadContoller.uploadFile)
route.post('/uploadVedio',uploadVedio.upload.array('vedios'),uploadContoller.uploadFile)
route.post('/uploadAudio',uploadAudio.upload.array('audios'),uploadContoller.uploadFile)
route.post('/uploadImgProfile',uploadImgProfile.upload.array('img_profile'),uploadContoller.uploadImgProfile)
route.post('/uploadImgChat',uploadIamgeChat.upload.array('img_chat'),uploadContoller.uploadFile)




module.exports=route