const express = require('express')
const app = express()
DEFAULT_ID = 3;
app.listen(3000)



//
  
let youtuber1 = {
    channelTitle: "hongsi 홍시",
    sub : " 57.8만명",
    videoNum : "338개"
  };
  

    
let youtuber2 = {
    channelTitle: "짜파게티",
    sub : " 1.8만명",
    videoNum : "594개"
  };
  

    
let youtuber3 = {
    channelTitle: "하이",
    sub : " 12.8만명",
    videoNum : "12개"
  };
  


let db = new Map();
db.set(1,youtuber1);
db.set(2,youtuber2);
db.set(3,youtuber3);


app.use(express.json());

//등록
app.post('/youtubers',  (req, res)=>{
  //body에 있는 데이터 화면에 보내기
  try{
    db.set(++DEFAULT_ID,req.body);
    res.status(201).json({
      message: `${req.body.channelTitle}님, 등록 완료되었습니다. `
    });
  }catch(err){
    res.status(404).json({message: `${err} 발생`});
  }



})

//정보 조회
app.get('/youtubers/:id', function (req, res) {
  let {id} =req.params;
  id = parseInt(id);

  try{
    if (db.get(id)=== undefined){
      res.status(400).json(`There is no youtuber id:${id}`);
    }
    else{
      youtuber = db.get(id);
      res.json(youtuber);
    }
  }catch(err){
    res.status(404).json(err);
  }
  

})


/*
app.get('/youtuber/:id', function (req, res) {
    let {id} = req.params;
    id = parseInt(id);
    const youtuber = db.get(id);
    if (youtuber===undefined){
        res.json({
            message : "Cannot find"
        })
    }
    else{
        res.json(youtuber)
    }
  
  })
  

 
  */

  //전체 유튜버 조회

  app.get('/youtubers',(req,res)=>{
    const allyoutuber = Object.fromEntries(db);
    
    res.json(allyoutuber);
    
    /*
    
    let yotubers = {};
    
    db.forEach((value,key)=>{
      youtubers[key] = value;
    });
    res.json(yotubers);
    */
})



//id별 유튜버 삭제
app.delete('/youtubers/:id',(req,res)=>{
  let {id}  = req.params;
  id = parseInt(id);
  youtuber = db.get(id);
  let msg= "";
  
  if (yotuber=== undefined){
    msg = `요청하신 id:${id}는 없는 id 입니다. `;
    res.json({message:msg});
  }
  else{
    
    db.delete(id);
    msg = `${youtuber.channelTitle}님 다음에 만나요!`;
    res.json({message:msg});
  }

//전체 삭제
app.delete('/youtubers',(req,res)=>{
  let msg = "";
  try{
    if (db.size===0){
      msg = "삭제할 유튜버가 없습니다.";
      res.json({message:msg})
    }
    else{
      msg = "전체 유튜버 삭제가 완료되었습니다.";
      db.clear();
      res.json({message:msg});
     
    } 
  }
  catch(err){
    res.json({message:err}); 

  }

})

//유튜버 수정
app.put('/youtubers/:id',(req,res)=>{

  let {id}  = req.params;
  id = parseInt(id);
  youtuber = db.get(id);
  let msg= "";
  let newInfo = {
    channelTitle: req.body.channelTitle,
    sub : req.body.sub,
    VideoNum : req.body.videoNum
  }
  if (yotuber=== undefined){
    msg = `요청하신 id:${id}는 없는 id 입니다. 수정이 어렵습니다. `;
    
  }
  else{
    
    db.set(id,newInfo);
    msg = `${youtuber.channelTitle}님 수정된 정보는 다음과 같습니다.
  title: ${youtuber.channelTitle}, 
  구독자:${yotuber.sub}, 
  동영상 갯수:${youtuber.videoNum}
  `;
  }
  res.json({message:msg});
})



})