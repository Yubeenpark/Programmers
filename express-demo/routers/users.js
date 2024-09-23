
const express = require('express');
const router = express.Router();
const dbConnection = require('../db-demo.js');
router.use(express.json());
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the user
 *           example: 1234567890
 *         email:
 *           type: string
 *           description: User's email
 *           example: "abc123"
 *         name:
 *           type: string
 *           description: Username of the user
 *           example: "johndoe"
 *         contact:
*            type: string
*            description: phone number of the user
*            example: "010-2131-2134"
 *       required:
 *         - id
 *         - email
 *         - name
 *         - password
 */


//login

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 로그인
 *     tags: [Users]
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: body
 *         name: user
 *         description: "로그인을 위한 사용자 정보"
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: "사용자의 이메일"
 *             password:
 *               type: string
 *               description: "사용자의 비밀번호"
 *           required:
 *             - email
 *             - password
 *     responses:
 *       200:
 *         description: "로그인 성공"
 *       404:
 *         description: "로그인 실패"
 *       401:
 *         description: "인증 실패"
 */

 
router.post('/login',(req,res)=>{
    let {email, password}=req.body;
    let msg = '';
    try{

        dbConnection.query(
            'SELECT * FROM users WHERE email = ? and password = ? ', [email, password],   
            function(err, results, fields) {
                if (results.length){
                    msg = `${results[0].name}님 로그인 완료 되었습니다.`;
                    res.status(201).json({
                        message:msg
                    });
                }
                else if(err){
                    res.status(404).json({
                        message: err
                    }); 
                }
               else{
                msg = '로그인에 실패하였습니다. 아이디와 패스워드를 변경하여 다시 시도하세요';
                res.status(401).json({
                    message : msg
                })
               }

    
                }
        );
        
    }catch(err){
        msg = err;
        res.status(404).json({
            message : msg
        })
    }
})
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: 회원가입
 *     tags: [Users]
 *     produces:
 *       - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "사용자의 이메일"
 *               password:
 *                 type: string
 *                 description: "사용자의 비밀번호"
 *               name:
 *                 type: string
 *                 description: "사용자의 이름"
 *               contact:
 *                 type: string
 *                 description: "사용자의 연락처"
 *             required:
 *               - email
 *               - password
 *               - name
 *               - contact
 *     responses:
 *       201:
 *         description: "회원가입 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원가입이 성공적으로 완료되었습니다."
 *       404:
 *         description: "회원가입 실패"

 */


//sign up
router.post('/signup',(req,res)=>{
    let msg = '';
    try{
        const {email,name, password,contact} = req.body;
        dbConnection.query(
            'INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?) ', [email, name, password, contact],   
            function(err, results, fields) {
                if (err) {
                    return res.status(404).json({ message: 'Error deleting user.' });
                }
                else{
                    msg = `${name}님 가입을 축하합니다.`;
                    res.status(201).json({
                        message:msg
                    });
                }
                   
                }
        );
        
    }catch(err){
        msg = err;
        res.status(404).json(err);
    }
})

//user info

router.route('/users')
    .get((req,res)=>{
    const {email} = req.body;
    let msg ='';

    dbConnection.query(
        'select * from users where email = ?',  email,   
        function(err, results, fields) {
            if (results.length)
            {
                res.json(results);
            }
            else if(err){  
                res.status(404).json({
                    message: err    
                });
            }
            else{
                msg = 'cannot find user';
                res.status(404).json({
                    message: msg
                });

            }
        }
    ); 


})

//modify user info

    .put((req,res)=>{
    const  {email,name, password,contact} = req.body;
    let msg ='';
    try{
        dbConnection.query(
            'UPDATE users SET name = ?, password = ?, contact = ? WHERE email = ?', [name, password, contact,email],   
            function(err, results, fields) {
                if (err) {
                    return res.status(404).json({ message: 'Error deleting user.' });
                }
                else{
                    msg = `${name}님 수정 완료 되었습니다.`;
                    res.status(201).json({
                        message:msg
                    });
                }
    
                }
        );
    }catch(err){
        msg = err;
        res.status(404).json({message:msg});
    }
   
    
})

//delete account

.delete((req, res) => {
    const { email } = req.body;
    let msg = '';
    let user_name = '';
  
    try {

            dbConnection.query('DELETE FROM users WHERE email = ?', [email], 
            function (err, results, fields) {
                if (err) {
                    return res.status(404).json({ message: 'Error deleting user.' });
                }

                msg = `${results[0].name}님 회원 탈퇴 완료됐습니다. 다음에 만나요.`;
                res.status(201).json({
                    message: msg
                });
            });

    } catch (err) {
        res.status(404).json({ message: 'An unexpected error occurred.' });
    }
});


module.exports = router;