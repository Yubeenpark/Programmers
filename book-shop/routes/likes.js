const express = require('express');
const router = express.Router();

router.post('/:id',(req,res)=>{
    const {id} = req.params;
    res.json('좋아요 등록');
});

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    res.json('좋아요 삭제');
});

module.exports = router;