
const express = require('express')
const app = express()
app.listen(3000)
DB_ID = 0;
//login

let db = new Map();
app.post('/login',(req,res)=>{
    let {id, pw, name }=req.body;
    let msg = '';
    try{
        
        
    }catch(err){
        msg = err;
        res.status(404).json({
            message : msg
        })
    }
})
//sign up
app.post('/login',(req,res)=>{
    let msg = '';
    try{
        db.set(++id,req.body);
        msg = `${db.get(id).name}님 가입을 축하합니다.`;
        res.status(201).json({
            message:msg
        });
        
    }catch(err){
        msg = err;
        res.status(404).json({
            message : msg
        })
    }
})

//user info

app.get('/user/:id',(req,res)=>{
    
})

//modify user info

app.patch('/user/:id',(req,res)=>{
    
})

//delete account

app.delete('/login/:id',(req,res)=>{
    
})