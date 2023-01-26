//importing libraries required for server hosting
const express = require('express');
const bodyParser = require('body-parser');

//creating an instance for express
const app = express()
app.use(express.json())

//MongoDB
let MongoClient = require('mongodb').MongoClient;

// GET home-page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/Insert",(req,res)=>{
    res.sendFile(__dirname+'/add.html')
})

app.get("/ShowStudent",(req,res)=>{
    res.sendFile(__dirname+"/show.html")         
})
app.get("/delete_student",(req,res)=>{
    res.sendFile(__dirname +"/delete.html")
})

app.get("/ShowData",(req,res)=>{
    async function createConnection(){
        let connectionUrl = "mongodb://localhost:27017/RGIT"
        let db = await MongoClient.connect(connectionUrl,{ useUnifiedTopology: true });
        let dbo = db.db('RGIT')
        return Promise.resolve(dbo);
    }
    async function main(){
        let connection = await createConnection();
        let finder = await connection.collection("student").find({}).toArray();
        res.send(finder)
    }
    main()
})

app.post("/DeleteStudent",(req,res)=>{
    async function createConnection(){
        let connectionUrl = "mongodb://localhost:27017/RGIT"
        let db = await MongoClient.connect(connectionUrl,{ useUnifiedTopology: true });
        let dbo = db.db('RGIT')
        return Promise.resolve(dbo);
    }
    async function main(){
        let roll = req.body.rollno
        let connection = await createConnection();
        let finder = await connection.collection("student").find({"roll":roll}).toArray();
        if(finder.length>0){
            connection.collection("student").deleteOne({"roll":roll});
            res.send({'status':"Student has been deleted"})
        }
        else{
            res.send({'status':'Student does not exist'})
        }
    }
    main()
} )

app.post('/Insert' , (req,res)=>{

    async function createConnection(){
        let connectionUrl = "mongodb://localhost:27017/RGIT"
        let db = await MongoClient.connect(connectionUrl,{ useUnifiedTopology: true });
        let dbo = db.db('RGIT')
        return Promise.resolve(dbo);
    }
    async function main(){
        let details = req.body
        let connection = await createConnection();

        let finder = await connection.collection("student").find({"email":req.body.email, 'mob_no':req.body.mob_no}).toArray();
        if (finder.length > 0){
            res.send({"status":"Student already exists"})
        }
        else{
            connection.collection("student").insertOne(details)
            res.send({"status":"Student added sucessfully"})
        }
    }
    main()
})

app.listen(8086)
console.log('server has started')