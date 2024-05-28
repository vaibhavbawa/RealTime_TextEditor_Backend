const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const { Server } = require('socket.io');
const { createServer } = require('http')
const server = createServer(app);
const crypto = require("crypto");
const genretRoomName = (bytes = 16) => crypto.randomBytes(bytes).toString("hex");


const io = new Server(server, {
    cors: {
        origin: "*",
        credential: true,
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("user connected ", socket.id);
    socket.emit("msg", "welcome to socket io server");
    // io.emit("msg","welcome to socket io server");
    // socket.broadcast.emit("msg",`${socket.id},joined the server`)

    socket.on('join-room',(room)=>{
        console.log('joinning room at >>>>',room);
        socket.join(room);
    })

    socket.on("rc", (data) => {
        console.log("RC data ", data);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected ", socket.id);
    })
})

const nodeMailer = require('nodemailer')

let msg = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: 'vaibhavbawa1998@gmail.com',
        pass: 'ncif riil pgtc fzpn'
    }
})

app.post('/send-email/:params', async (req, res) => {
    // console.log(req.body)
    // const roomName = genretRoomName()
    // console.log("RoomName>>>>>>>",roomName);

    try {
        const { email, URL } = req.body;
        const params = req.params.params
        console.log(params);
        console.log(typeof(params));
        console.log( typeof( req.params.params) );

        if (!email) {
            return res.status(400).json({ masassge: "email is required" });
        }

        // let mailOptions = {
        //     form: "vaibhavbawa1998@gmail.com",
        //     to: email,
        //     subject: "invited",
        //     text: `Hello your invided to join realtime text editor plases click or copy past follorwing url into your browser ${URL}`
        // }

        // msg.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error)
        //         return res.status(400).json({ masassge: error.message, status: 'ERROR' });

        //     } else {

        //         // if params dosenot exist that means he is the first user and the roomId needs to be creted
        //         if (req.params.params !== 'undefined' && req.params.params !== 'null') {
        //             console.log("params exist");
        //             console.log("emailSend", info.response);
        //             return res.status(200).json({ masassge: "email send successfully", params });
        //         } else {

        //             console.log("params not exist");
        //             console.log("emailSend", info.response);
        //             const roomName = genretRoomName()
        //             console.log("RoomName>>>>>>>", roomName);
        //             return res.status(200).json({ masassge: "email send successfully", roomName });


        //         }
        //         // if params exist that means he has the roomId and donot need to create new roomId and send params insted of roomId

        //     }

        // })

        let roomId = '';

        if (req.params.params !== 'undefined' && req.params.params !== 'null' && req.params.params !== '') {
            //   if params do is not undefined or null. which means params has the roomId send with url
            console.log("params has data");
            console.log("the params has data");
            roomId = req.params.params

        } else{
            console.log("params data no!!");
            roomId = await genretRoomName()
        }

     
       console.log("room Id here---->"+URL);
        let url
       if (URL.endsWith('/undefined')) {
        url = URL.slice(0, -'undefined'.length);
    }
    
    console.log(url);
        let mailOptions = {
            form: "vaibhavbawa1998@gmail.com",
            to: email,
            subject: "invited",
            text: `Hello, you're invited to join a real-time text editor. Please click or copy and paste the following URL into your browse ${url}${roomId}`
        }


        msg.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                return res.status(400).json({ masassge: error.message, status: 'ERROR' });

            } else {
                console.log("emailSend", info.response);
                // const roomName = genretRoomName()
                // console.log("RoomName>>>>>>>",roomName);
                
                return res.status(200).json({ masassge: "email send successfully", roomId });
            }

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ masassge: error });
    }
})

// app.get('/checkUrl/:id', (req, res) => {

//     let params = req.params
//     // let params = "dfsufusdufusvf"
//     console.log(params);
//     console.log("paramsId", params);
//     if (!params) {
//         return res.json({ masassge: "No params in the URL" });
//     }
//     return res.json({ masassge: "Params found in URL", params: params });

// })


const PORT = 3000;
server.listen(PORT, () => console.log(`Listen on port ${PORT}`));