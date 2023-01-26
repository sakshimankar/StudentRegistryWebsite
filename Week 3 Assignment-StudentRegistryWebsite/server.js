//importing packages required for server hosting
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

//creating an instance for express
const app = express()

//app usages
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())

//MongoDB
let MongoClient = require('mongodb').MongoClient;
// GET home-page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/add",(req,res)=>{
    res.sendFile(__dirname+'/add.html')
})

app.get("/Show",(req,res)=>{
    res.sendFile(__dirname+"/show.html")         
})
app.get("/delete",(req,res)=>{
    res.sendFile(__dirname +"/delete.html")
})
app.get("/graph",(req,res)=>{
    res.sendFile(__dirname+'/graph.html')
})
app.get("/ShowData",(req,res)=>{
    async function createConnection(){
        let connectionUrl = "mongodb://localhost:27017/name"
        let db = await MongoClient.connect(connectionUrl,{ useUnifiedTopology: true });
        let dbo = db.db('RGIT')
        return Promise.resolve(dbo);
    }
    async function main(){
        let connection = await createConnection();
        let finder = await connection.collection("user").find({}).toArray();
        res.send(finder)
    }
    main()
})

app.post("/Delete",(req,res)=>{
    async function createConnection(){
        let connectionUrl = "mongodb://localhost:27017/"
        let db = await MongoClient.connect(connectionUrl,{ useUnifiedTopology: true });
        let dbo = db.db('RGIT')
        return Promise.resolve(dbo);
    }
    async function main(){
        let roll = req.body.rollno
        let connection = await createConnection();
        let finder = await connection.collection("user").find({"roll":roll}).toArray();
        if(finder.length>0){
            connection.collection("user").deleteOne({"roll":roll});
            res.send({'status':"User has been deleted"})
        }
        else{
            res.send({'status':"User does not exist"})
        }
    }
    main()
} )

app.post('/add' , (req,res)=>{

    async function createConnection(){
        let connectionUrl = "mongodb://localhost:27017/"
        let db = await MongoClient.connect(connectionUrl,{ useUnifiedTopology: true });
        let dbo = db.db('RGIT')
        return Promise.resolve(dbo);
    }
    async function main(){
        let details = req.body
        let connection = await createConnection();
        
        let finder = await connection.collection("user").find({"email":req.body.email ,'mobile_no':req.body.mobile_no}).toArray();
        if (finder.length > 0){
            res.send({"status":"user already exists"})
        }
        else{
            connection.collection("user").insertOne(details)
            res.send({"status":"user added sucessfully"})
        }
    }
    main()
} )

//cont thenRequest = require('then-request');
//var request = require('request');
app.get('/graph',(req,res) =>{
    res.sendFile(__dirname + '/chart.html')
})


app.post('/location', (req,res) =>{
})

app.get('/getDetails' , (req,res)=>{

    async function createConnection(){
        let connectionUrl = "mongodb://localhost:27017/RGIT"
        let db = await MongoClient.connect(connectionUrl);
        let dbo = db.db('RGIT')
        return Promise.resolve(dbo);
    }

    async function main(){
        let connection = await createConnection();
        let finder = await connection.collection("user").find({}).toArray();
        res.send(finder)
        // connection.collection("user").insertOne(details)
        // console.log(details)
        // res.send(true)
    }

    main()

})


app.listen(8086)
console.log('server has started')