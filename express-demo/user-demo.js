
const express = require('express')
const app = express()
app.listen(3000)
DB_ID = 0;
//login
app.use(express.json());

let db = new Map();
app.post('/login',(req,res)=>{
    let {id, pwd }=req.body;
    let msg = '';
    let user=db.get(id);
    let find = false;
    try{

        db.forEach((u)=>{
            if ( (u.id ===id) && (u.pwd===pwd) ){
                msg = `${u.name}님 로그인 완료했습니다. 서비스를 즐겨주세요`
                find = true;
            }

        })
        if(!find){
            msg = '로그인에 실패하였습니다. 아이디와 패스워드를 변경하여 다시 시도하세요';
        }
        res.json({
            message:msg
        })
        
        
    }catch(err){
        msg = err;
        res.status(404).json({
            message : msg
        })
    }
})

//sign up
app.post('/signup',(req,res)=>{
    console.log(req.body);
    let msg = '';
    try{
        console.log(DB_ID,req.body);
        db.set(++DB_ID,req.body);
        msg = `${db.get(DB_ID).name}님 가입을 축하합니다.`;
        res.status(201).json({
            message:msg
        });
        
    }catch(err){
        msg = err;
        res.status(404).json(err);
    }
})

//user info

app.get('/users/:userid',(req,res)=>{
    let userId = parseInt(req.params.userid);
    let msg ='';
    try{
        let user=db.get(userId);
        if(user===undefined){
            msg = 'cannot find user';
            res.status(401).json({
                message:msg
            })
        }else{
            res.json(user);
        }

    }catch(err){
        res.status(404).json(err);
    }
})

//modify user info

app.put('/users/:userid',(req,res)=>{
    let userId = parseInt(req.params.userid);
    let msg ='';
    try{

        db.set(userId,req.body);
        let user=db.get(userId);
        res.json(user);
    }catch(err){
        res.status(404).json(err);
    }
   
    
})

//delete account

app.delete('/users/:userid',(req,res)=>{
    let userId = parseInt(req.params.userid);
    let msg ='';
    try{
        let {name}=db.get(userId);
        db.delete(userId);
        msg=`${name}님 회원 탈퇴 완료됐습니다. 다음에 만나요.`;
        res.json({message:msg});
    }catch(err){
        res.status(404).json(err);
    }

    
})