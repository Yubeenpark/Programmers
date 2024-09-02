const express = require('express')
const app = express()

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
  