const express = require('express');
const bodyParser = require('body-parser');


//app
const app = express()

app.use(express.json())
var details={};
var users =[{name:'asdfasdf',email:'email@example.com',mobile_number:12233445,dob:13-13-13,address:'qwerqwerqwer'}];
var STATUS=0;

//get
app.get('/login', (req,res) =>{
    details={
        name:req.query.userName,
        email:req.query.userEmail,
        phone:req.query.userPhone,
        dob:req.query.userDOB,
        address:req.query.userAddress
    }
    for(value in users){
        if(users[value].name == details.name & users[value].email == details.email & users[value].phone==details.phone & users[value].dob==details.dob & users[value].address == details.address){
            STATUS = 1;
        }
    }
    if(STATUS==0){
        users.push(details);
        res.sendFile(__dirname+'/user_success.html')
    }
    else{
        res.sendFile(__dirname+'/registered.html');
    }
    STATUS=0;
    details={};

})

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html')
})

app.listen(8080)
console.log('server has started')
