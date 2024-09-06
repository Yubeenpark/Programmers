const express = require('express')
const app = express()
app.listen(3000);


const fruits =[
    {id:1, name:'apple'},
    {id:2, name:'orange'},
    {id:3, name:'berry'},
    {id:4, name:'pineapple'},
]


app.get('/fruits',(req,res)=>{
    res.json(fruits);

})

app.get('/fruits/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    //let findFruit;
    // fruits.forEach((fruit)=>{
    //     if (fruit.id ===id){
    //         findFruit = fruit;
    //     }
    // })
    let findFruit = fruits.find(f=>(f.id ===id));
    if (findFruit)
        res.json(findFruit);
    else
        res.status(404).send(
    "Cannot get fruits of id ")

})