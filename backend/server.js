import express from "express";
import mongoose from "mongoose";
// import Messages from "./model/dbMessages.js";
import Rooms from "./model/dbRooms.js";
import cors from "cors"
import Pusher from 'pusher'

let pusher = new Pusher({
    appId: "1202355",
    key: "139e3b7703cbe6a66c04",
    secret: "1b30aeaf7541f4d0534d",
    cluster: "eu",
    useTLS: true
});

const app = express();
const port = process.env.PORT || 9000;
app.use(express.json());
app.use(cors());
//app.use(cors());
// mongodb+srv://admin:5gQbFMs9ZeK54V4H@cluster0.sbeim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const connectionUrl = "mongodb+srv://admin:5gQbFMs9ZeK54V4H@cluster0.sbeim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// "mongodb+srv://new-user:vjWCiR4wnET7r5hw@cluster0.yqgw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
                      // mongodb+srv://new-user:vjWCiR4wnET7r5hw@cluster0.yqgw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    connectionUrl, 
    {
        useCreateIndex : true,
        useNewUrlParser : true,
        useUnifiedTopology : true,
    },
    (err) => {
        if(!err){
            console.log("MongDB Connesso Correttamente!!!")
        }else{
            console.log("MongDB ERRRORE!!!")
        }
    }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Db Connected")

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change) => {
        console.log(change)
        if(change.operationType === "insert"){
            const record = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name : record.name,
                message : record.message,
                timestamp : record.timestamp
            })
        }else{
            console.log("Not Trigger Pusher")
        }
    })
})

// ROOMS
// GET - api/v1/rooms
// POST - api/v1/rooms
// GET - api/v1/rooms/:id 

app.get("/api/v1/rooms",(req,res) => {
    Rooms.find((err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data)
        }
    })
})

app.post("/api/v1/rooms",(req,res) => {
    const dbRoom = req.body;

    Rooms.create(dbRoom, (err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data)
        }
    })
})

app.get("/api/v1/rooms/:id",(req,res) => {
    const roomId = req.params.id;

    Rooms.findById(roomId).then((room) => {
        if(!room){
            res.status(404).json({
                message : "Room Not Found"
            });
        }
        res.status(200).json({ room : room })
    }).catch((err) => {
        res.status(404).json({
            message : "Error ID"
        });
    })
})

// MESSAGES
// GET - api/v1/rooms/:id/messages
// POST - api/v1/rooms/:id/messages

app.get("/api/v1/rooms/:id/messages", (req,res) => {
    const roomId = req.params.id

    Rooms.findById(roomId)
        .then((room) => {
            if(!room){
                res.status(404).json({ 
                    messages : "Room Not Found"
                })
            }
            res.status(200).send(room.messages)
        })
        .catch((err) => {
            res.status(404).json({ 
                messages : "Room Not Found"
            })
        })
})

app.post("/api/v1/rooms/:id/messages", (req,res) => {
    const dbMessage = req.body;
    const roomId = req.params.id

    Rooms.findById(roomId)
        .then((room) => {
            if(!room){
                res.status(404).json({ 
                    messages : "Room Not Found"
                })
            }
            
            room.messages.push(dbMessage)
            room.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(201).send(dbMessage);
                }
            })

        })
        .catch((err) => {
            res.status(500).json({ 
                messages : "Error ID"
            })
        })
});








app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
