import express from "express";
import mongoose from "mongoose";
import Messages from "./model/dbMessages.js";

import Pusher from 'pusher'

let pusher = new Pusher({
    appId: "1202355",
    key: "139e3b7703cbe6a66c04",
    secret: "1b30aeaf7541f4d0534d",
    cluster: "eu",
    useTLS: true
});

const app = express();
const port = process.env.NODE_PORT || 9000;
app.use(express.json());
//app.use(cors());
const connectionUrl = "mongodb+srv://new-user:vjWCiR4wnET7r5hw@cluster0.yqgw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
                message : record.message
            })
        }else{
            console.log("Not Trigger Pusher")
        }
    })
})

app.get("/api/v1/messages/sync", (req,res) => {
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data)
        }
    })
})

app.post("/api/v1/messages", (req,res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data)
        }
    })
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
