import express from "express";
import mongoose from "mongoose";
import Messages from "./model/dbMessages.js";

const app = express();

//new-user
// vjWCiR4wnET7r5hw
const port = process.env.NODE_PORT || 9000;

app.use(express.json());
//app.use(cors());

const connectionUrl = "mongodb+srv://new-user:vjWCiR4wnET7r5hw@cluster0.yqgw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
