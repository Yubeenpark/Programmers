const express = require('express')
const app = express()
app.listen(3000);
let book = {
	title : 'coding 공부하는 법',
	price : 20000,
	description: '코딩 공부하는 법을 전부 다 모았다!'	
}

const db = new Map();
  
let youtuber1 = {
  channelTitle: "hongsi 홍시",
  sub : "57.8만명",
  videoNum : 338
}

app.get('/youtubers',(req,res)=>{
    const allyoutuber = Object.fromEntries(db);
    
    res.json(allyoutuber);
  
})

db.set(1,youtuber1);
app.use(express.json());

app.post('/youtubers',  (req, res)=>{
  //body에 있는 데이터 화면에 보내기
  try{
    db.set(db.size+1,req.body);
    res.json({
      message: `${req.body.channelTitle}님, 등록 완료되었습니다. `
    });
  }catch(err){
    res.json({message: `${err} 발생`});
  }



})

app.get('/youtubers/:id', function (req, res) {
  let {id} =req.params;
  id = parseInt(id);

  if (db.get(id)=== undefined){
    res.json({message:'error'});
  }
  else{
    youtuber = db.get(id);
    res.json(youtuber);
  }
})

