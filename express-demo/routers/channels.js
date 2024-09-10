
const express = require('express')
const router = express.Router()

DB_ID = 1;

router.use(express.json());

    /*

        channel = {
            channelTitle
            userId
            username
            }
    */

let db = new Map();
router.route('/')
    .post((req,res)=>{
        let msg = '';
        try{
            db.set(DB_ID++,req.body);
            msg = `${req.body.username}님 ${req.body.channelTitle} 채널 생성을 축하합니다.`;
            console.log(db);
            res.status(201).json({
                message:msg
            });
            
        }catch(err){
            msg = err;
            res.status(404).json({
                message:`${err}`
            });
        }
})
    .get((req,res)=>{
    let {userId} = req.body;
    let msg ='';
    let channels = [];
    try{

        if (db.size===0){
            msg = 'cannot find channel';
            res.status(404).json({
                message:msg
            })
        }else{
            //res.status(200).json(Object.fromEntries(db));
            /*
                let channels = [];
                db.forEach(function(value,key){
                channels.push(value)})
            */

            db.forEach(function(value,key){
                if (value.userId === userId)
                        channels.push(value)})
            if(channels.length===0)
            {   
                msg = `채널이 없습니다.`;
                res.status(404).json({message:msg});
            }else{
                res.status(200).json(channels);
            }
                
            
    }
    }catch(err){
        res.status(404).json({
            message:`${err}`
        });
    }
})

//get each channels information
router.route('/:id')
    .get((req,res)=>{
    let channelId = parseInt(req.params.id);
    let msg ='';
    try{
        let channel=db.get(channelId);
        if(channel===undefined){
            msg = 'cannot find channel';
            res.status(404).json({
                message:msg
            })
        }else{
            res.json(channel);
        }

    }catch(err){
        res.status(404).json({
            message:`${err}`
        });
    }
})
    .put((req,res)=>{
    let channelId = parseInt(req.params.id);
    console.log()
    let msg ='';
    try{
        if(db.get(channelId)===undefined){
            msg = '채널을 찾을 수 없습니다.';
            res.status(404).json({
                message:msg
            })
        }
        else{
            db.set(channelId,req.body);
            let channel=db.get(channelId);
            msg=`채널이 다음과 같이 변경되었습니다. 채널명: ${channel.channelTitle} 채널 소유자: ${channel.username}`;
            res.json({message:msg});
        }

    }catch(err){
        res.status(404).json({
            message:`${err}`
        });
    }
   
    
})
    .delete((req,res)=>{
    let channelId = parseInt(req.params.id);
    let msg ='';
    try{
        if(db.get(channelId)===undefined){
            msg = '채널을 찾을 수 없습니다.';
            res.status(404).json({
                message:msg
            })
        }else{
            let {channelTitle}=db.get(channelId);
            db.delete(channelId);
            msg=`${channelTitle} 채널이 삭제되었습니다.`;
            res.json({message:msg});
        }
        
    }catch(err){
        res.status(404).json({
            message:`${err}`
        });
    }

    
})

module.exports = router;