const express = require('express');
const router = express.Router();
const connectDB = require('../mariadb');
const {body,param, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const validate= (req,res,next)=>{
    const err = validationResult(req);
    if (err.isEmpty()){
        return next();
    }else{
        return res.status(400).json(err.array());
        
    }
}
router.post('/signup',[
    body('email').notEmpty(),
    body('password').notEmpty(),
    validate]
    ,(req,res)=>{
        const {email, password} = req.body;
        connectDB.query(
            'INSERT INTO users (email, password) VALUES (?,?) ', [email,password],   
            function(err, results, fields) {
                if (err) {
                    return res.status(404).json({ message: 'Error of singing up user.' });
                }
                else{
                    msg = `${email}님 가입을 축하합니다.`;
                    res.status(201).json({
                        message:msg
                    });
                }
                   
                }
        );

})

router.post('/login',[
    body('email').notEmpty(),
    body('password').notEmpty(),
    validate]
    ,(req,res)=>{
        const {email, password}=req.body;
        let msg = '';
        connectDB.query(            
            'SELECT * FROM users WHERE email = ? and password = ? ', [email, password],
            function(err, results){
                if(results.length){
                    const user = results[0];
                    const token = jwt.sign({
                        email: user.email
                    },process.env.JWT_KEY);
                    res.cookie("token",token,{
                        httpOnly:true
                    });
                    msg = msg = `${results[0].email}님 로그인 완료 되었습니다.`;
                    res.status(201).json({
                        message:msg
                    })
                }else if(err){
                    return res.status(404).json({
                        message:err
                    });
                }else{
                    msg = '로그인에 실패하였습니다. 아이디와 패스워드를 변경하여 다시 시도하세요';
                    return res.status(403).json({
                        message:msg
                    });
                }
            }   
        )
    });


router.post('/reset');

router.put('/reset');


router.get('/',(req,res)=>{res.json({message:"hihi"})});


module.exports = router;