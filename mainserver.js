
// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});
const port = process.env.PORT || 3000;
const api = require("./index");
const updateOnState = require('./APIS/updataOnState')
const cors = require('cors');
app.use(cors())

// get route for ammar and use it 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json());


const routeAm = require('./route/routeAm')
app.use(routeAm)
// end of get route

var fs = require("fs");
var multer = require('multer');
var upload = multer({ dest: './uploads' })

const saveMsg = require("./APIS/addmsg");
const newchat = require("./APIS/newchat");
  
server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

let numUsers = 0;
//connection is ready 

const users = [];
io.on('connection', (socket) => {
  let addedUser = false;
  console.log(`Connection : SocketId = ${socket.id}`);

  socket.on('new message', async (data) => {

    if (data.message_type == "image") {//message tye image 
      var im = new Buffer(data.message, "base64");
      const timestamp = new Date().toISOString();
      let ts = Date.now();

      let date_ob = new Date(ts);
      let date = ("0" + date_ob.getDate()).slice(-2);

      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

      // current year
      let year = date_ob.getFullYear();

      // current hours
      let hours = date_ob.getHours();

      // current minutes
      let minutes = date_ob.getMinutes();
      // current seconds
      let seconds = date_ob.getSeconds();
      var url = "http://192.168.1.10:8080/yawar_chat/uploads/chatimage/";



      var imagename = year + '-' + month + '-' + date + '-' + hours + '-' + minutes + '-' + seconds + '-' + data.sender_id + ".jpg";
      fs.writeFile("uploads/chatimage/" + imagename, im, function (er) { console.log(er) });

    



      const msg = await saveMsg.addmsg(app, data.sender_id, data.reciver_id, imagename, data.message_type, data.dateTime, data.state, data.message_id);
      if (msg) {

        if(msg.new_chat==true)
        {


          console.log("is new chat : "+msg.new_chat)
        var chatdata=  newchat(app, data.sender_id, data.reciver_id);

        console.log("chat data after return from fun  :"+chatdata)
          const info = {
            sender_id: data.sender_id,
            reciver_id: data.reciver_id,
            message: url + imagename,
            message_type: "image",
            dateTime: data.dateTime,
            state: "1",
            id: msg.msg[0].id,
            chat_id: msg.chat_id,
            message_id:msg.msg[0].message_id
          }
  
          if (users[info.reciver_id] != -1) { info.state = "2" }/* end of if */
          io.to(users[info.sender_id]).emit('new chat', chatdata)
          io.to(users[info.reciver_id]).emit('new chat', chatdata)
          saveMsg.saved(app,info)
        }//if new chat now
        else{
          const info = {
            sender_id: data.sender_id,
            reciver_id: data.reciver_id,
            message: url + imagename,
            message_type: "image",
            dateTime: data.dateTime,
            state: "1",
            id: msg.msg[0].id,
            chat_id: msg.chat_id,
            message_id:msg.msg[0].message_id
          }
  
          if (users[info.reciver_id] != -1) { info.state = "2" }/* end of if */
          io.to(users[info.sender_id]).emit('new message', info)
          io.to(users[info.reciver_id]).emit('new message', info)
          saveMsg.saved(app,info)
        }

      

      }//if msg
       else {
        socket.broadcast.emit('new message', {
          sender_id: data.sender_id,
          reciver_id: data.reciver_id,
          message: url + imagename,
          message_type: "image",
          dateTime: data.dateTime,
          state: "0",
          id: msg.id
        });
      }//end of if 

    }/* end of check image */
    else if (data.message_type == "imageWeb") {
      const msg = await saveMsg.addmsg(app, data.sender_id, data.reciver_id, data.message, data.message_type, data.dateTime, data.state, data.message_id);
      if (msg) {

        const info = {
          sender_id: data.sender_id,
          reciver_id: data.reciver_id,
          message: url + imagename,
          message_type: "imageWeb",
          dateTime: data.dateTime,
          state: "1",
          id: msg.msg[0].id,
          chat_id: msg.chat_id,
          message_id: msg.msg[0].message_id
        }

        if (users[info.reciver_id] != -1) { info.state = "2" }/* end of if */
        io.to(users[info.sender_id]).emit('new message', info)
        io.to(users[info.reciver_id]).emit('new message', info)
        saveMsg.saved(app, info)

      } else {
        socket.broadcast.emit('new message', {
          sender_id: data.sender_id,
          reciver_id: data.reciver_id,
          message: url + imagename,
          message_type: "imageWeb",
          dateTime: data.dateTime,
          state: "0",
          id: msg.id
        });
      }//end of if 


    }/* /end of imageWeb */
    else if (data.message_type == "text") {
      const msg = await saveMsg.addmsg(app, data.sender_id, data.reciver_id, data.message, data.message_type, data.dateTime, data.state,data.message_id);
  
      if (msg) {

        if(msg.new_chat==true)
        {//check if tis chat is new


          console.log("is new chat : "+msg.new_chat)
        const chatdata= await newchat(app, data.sender_id, data.reciver_id);

        console.log("chat data after return from fun  :"+chatdata.user +"   "+chatdata.message)
          const info = {
            sender_id: data.sender_id,
            reciver_id: data.reciver_id,
            message: data.message,
            message_type: "text",
            dateTime: data.dateTime,
            state: "1",
            id: msg.msg[0].id,
            chat_id: msg.chat_id,
            message_id:msg.msg[0].message_id,
            user_data:chatdata.user
          }
  
          if (users[info.reciver_id] != -1) { info.state = "2" }/* end of if */
         
          console.log("emit to new chat")
          io.to(users[info.reciver_id]).emit('new chat', info)

         
          saveMsg.saved(info)
        }//if new chat now with text message
        else{//not new chat
        const info = {
          sender_id: data.sender_id,
          reciver_id: data.reciver_id,
          message: data.message,
          message_type: "text",
          dateTime: data.dateTime,
          state: "1",
          id: msg.msg[0].id,
          chat_id: msg.chat_id,
          message_id: msg.msg[0].message_id
        }

        if (users[info.reciver_id] != -1) { info.state = "2" }/* end of if */
        io.to(users[info.sender_id]).emit('new message', info)

        //socket.broadcast.to(users[info.sender_id]).emit('new message', info);
        io.to(users[info.reciver_id]).emit('new message', info)

      
        var xx=info;
        console.log("before update state for text msg",xx)
        saveMsg.saved(app,xx)
      }}
       else {//no msg saved and returned from fun

        socket.broadcast.to(users[info.sender_id]).emit('new message', {
          sender_id: data.sender_id,
          reciver_id: data.reciver_id,
          message: data.message,
          message_type: "text",
          dateTime: data.dateTime,
          state: "0",
          id: msg.id,
        });/* end of  new message*/

      }/* end of if  */

    }/* end of if text */

    else {
      data.state = "1"
      if (users[data.reciver_id] != -1) { data.state = "2" }/* end of if */
      console.log("income message for second time ", data)
      io.to(users[data.sender_id]).emit('new message', data)
      io.to(users[data.reciver_id]).emit('new message', data)
      saveMsg.saved(app, data)
      console.log("audio :", data)
    }/* end of check file */

  });/* end of newMessage */

  // this metter to check this message is seen or no
  socket.on('seen', data => {
    if (data.state == "3") {
      io.to(users[data.sender_id]).emit("new message", data)
      saveMsg.saved(app, data)
    }/* end of if */
  })/* end of seen */

  // this metter for make all message in database
  // become seen when rciver entered to room message
  socket.on('enter', async data => {
    const msgState = await updateOnState.updateOnState(data)
   //console.log("msgState :", msgState)
    io.to(users[data.your_id]).emit('new message', {
      id: 77,
      reciver_id: data.my_id,
      sender_id: data.your_id,
      message_type: 'text',
      message: ',m,m',
      created_at: 'Dec 12, 2021 3:06:26 PM',
      deleted_at: null,
      state: data.state
    })//end of emit new messgae
  })/* end of enter */

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;
   // console.log('adding new user');
    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('on typing', (data) => {
    console.log("on typeing :", data)
    console.log('user is typring now');
   // console.log(data);
    if (data.typing == true) {
      socket.broadcast.to(users[data.id]).emit('on typing', true);
     // console.log('user is typring now');
    }

    else {
      socket.broadcast.to(users[data.id]).emit('on typing', false);
      console.log('user stop typring now');

    }

  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
  //  console.log('stop typing for now');
    socket.broadcast.to(users[data.id]).emit('on typing', false);
  });

  //when user open the chat 
  socket.on('connect user', function (data) {
    users[data.user_id] = socket.id;
    let ts1 = Date.now();

    let date_ob1 = new Date(ts1);
    let date1 = ("0" + date_ob1.getDate()).slice(-2);

    // current month
    let month1 = ("0" + (date_ob1.getMonth() + 1)).slice(-2);

    // current year
    let year1 = date_ob1.getFullYear();

    // current hours
    let hours1 = date_ob1.getHours();

    // current minutes
    let minutes1 = date_ob1.getMinutes();
    // current seconds
    let seconds1 = date_ob1.getSeconds();

    let lastseen = year1 + "/" + month1 + "/" + date1 + " " + hours1 + ":" + minutes1 + ":" + seconds1;
    let sdata = {
      is_connect: true,
      last_seen: lastseen
    }
    io.emit('check connect', sdata);
    for (var x = 0; x < users.length; x++) {
      if (typeof users[x] == 'undefined')
        users[x] = -1;
      console.log(users[x]);
    }

  });


  socket.on('check connect', function (data) {
    let ts1 = Date.now();

    let date_ob1 = new Date(ts1);
    let date1 = ("0" + date_ob1.getDate()).slice(-2);

    // current month
    let month1 = ("0" + (date_ob1.getMonth() + 1)).slice(-2);

    // current year
    let year1 = date_ob1.getFullYear();

    // current hours
    let hours1 = date_ob1.getHours();

    // current minutes
    let minutes1 = date_ob1.getMinutes();
    // current seconds
    let seconds1 = date_ob1.getSeconds();

    let lastseen = year1 + "/" + month1 + "/" + date1 + " " + hours1 + ":" + minutes1 + ":" + seconds1;
    let sdata = {
      is_connect: false,
      last_seen: lastseen
    }
    if (users[data.your_id] == -1) {
      io.to(users[data.my_id]).emit('check connect', sdata);
      console.log('not connect ');
    }
    else {
      let sdata = {
        is_connect: true,
        last_seen: lastseen
      }
      io.emit('check connect', sdata);
      console.log('user now connect ');
    }

  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    // if (addedUser) {
    //   --numUsers;
    console.log('user leave the app ');
    //get last time the user was online
    let ts1 = Date.now();

    let date_ob1 = new Date(ts1);
    let date1 = ("0" + date_ob1.getDate()).slice(-2);

    // current month
    let month1 = ("0" + (date_ob1.getMonth() + 1)).slice(-2);

    // current year
    let year1 = date_ob1.getFullYear();

    // current hours
    let hours1 = date_ob1.getHours();

    // current minutes
    let minutes1 = date_ob1.getMinutes();
    // current seconds
    let seconds1 = date_ob1.getSeconds();

    // var lastseen = year1 + "/" + month1 + "/" + date1 + " " + hours1 + ":" + minutes1 + ":" + seconds1;
    // var sdata = {
    //   is_connect: false,
    //   last_seen: lastseen
    // }

    let lastseen2 = year1 + "/" + month1 + "/" + date1 + " " + hours1 + ":" + minutes1 + ":" + seconds1;
    let ss = {
      is_connect: false,
      last_seen: lastseen2
    }

    // console.log(socket.id);
    for (var i = 0; i < users.length; i++) {
      if (users[i] == socket.id) {
        users[i] = -1;
        socket.broadcast.emit('check connect', ss);
      }

    }


    for (var x = 0; x < users.length; x++) {
      console.log(users[x]);
    }


    // echo globally that this client has left

    //}
  });
});


