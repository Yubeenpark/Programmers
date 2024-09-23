
const express = require('express');
const router = express.Router();
const dbConnection = require('../db-demo.js');
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the user
 *           example: 1234567890
 *         id:
 *           type: string
 *           description: User's unique identifier as a string
 *           example: "abc123"
 *         username:
 *           type: string
 *           description: Username of the user
 *           example: "johndoe"
 *       required:
 *         - userId
 *         - id
 *         - username
 */


dbConnection.query(
    'select * from users',
    function(err, results, fields) {
        //let {id,email,name,password,created_at} = results[0];
        console.log(results); // results contains rows returned by server
        console.log(fields);
        //console.log(id,password,email); // fields contains extra meta data about results, if available
    }
); 


DB_ID = 0;
//login
router.use(express.json());

let db = new Map();
/**
 * @swagger
 * /login:
 *   post:
 *     description: 로그인
 *     tags: [Users]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "body"
 *       in: "body"
 *       required: true
 *       schema:
 *         $ref: "#/components/schemas/User"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *     
*/
router.post('/login',(req,res)=>{
    let {id, pwd }=req.body;
    let msg = '';
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
router.post('/signup',(req,res)=>{
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

router.route('/users')
    .get((req,res)=>{
    let userId = parseInt(req.body.userId);
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
        msg = err;
        res.status(404).json({message:msg});
    }
})

//modify user info

    .put((req,res)=>{
    let userId = parseInt(req.body.userId);
    let msg ='';
    try{

        db.set(userId,req.body);
        let user=db.get(userId);
        res.json(user);
    }catch(err){
        msg = err;
        res.status(404).json({message:msg});
    }
   
    
})

//delete account

router.delete('/users/:userid',(req,res)=>{
    let userId = parseInt(req.body.userId);
    let msg ='';
    try{
        let {name}=db.get(userId);
        db.delete(userId);
        msg=`${name}님 회원 탈퇴 완료됐습니다. 다음에 만나요.`;
        res.json({message:msg});
    }catch(err){
        msg = err;
        res.status(404).json({message:msg});
    }

    
})

module.exports = router;