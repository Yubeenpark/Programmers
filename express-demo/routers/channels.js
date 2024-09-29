
const express = require('express')
const router = express.Router()
const dbConnection = require('../db-demo.js');
const {body,param, validationResult} = require('express-validator');
router.use(express.json());



    /*

        channel = {
            channelTitle
            userId
            username
            }
    */


router.route('/')
    .post([body('user_id').notEmpty().isInt().withMessage('user_id가 숫자여야 합니다.'),
        body('name').notEmpty().isString().withMessage('이름은 문자여야 합니다')
    ],
        (req,res)=>{
            const valiDationErr = validationResult(req);
            if (!valiDationErr.isEmpty()){
                console.log('유효성 검사 에러 발생. ');
                return res.status(400).json(err.array());
            }else{

                let msg = '';
                const {name, sub_num, video_count, user_id} = req.body;
                try{
                    const SQL =  'INSERT INTO channels (name, sub_num, video_count, user_id) VALUES (?,?,?,?) ';
                    dbConnection.query(SQL,[name, sub_num, video_count, user_id],
                        function(err, results, fields) {
                            if (err) {
                                return res.status(404).json({ message: 'SQL Error posting channels .' });
                            }
                    else{
                            msg = `${name} 채널이 생성되었습니다.`;
                            res.status(201).json({
                                message:msg
                            });
                        }
                    });
                    
                }catch(err){
                    msg = err;
                    return res.status(404).json({
                        message:`${err}`
                    });
                }

            }
       
})  
//유저의 채널 전체 조회
    .get(body(user_id).notEmpty().isInt().withMessage('user_id는 숫자여야합니다.')
    ,(req,res)=>{
        const valiDationErr = validationResult(req);
        if(!valiDationErr.isEmpty()){
            return res.status(404).json(valiDationErr.array());
        }
        let {user_id} = req.body;
        let msg ='';
        const SQL = 'SELECT * FROM channels WHERE user_id = ?';
        try{

            dbConnection.query(
                SQL,  user_id,   
                function(err, results, fields) {
                    if (results.length)
                    {
                        res.json(results);
                    }
                    else if(err){  
                        return res.status(404).json({
                            message: err    
                        });
                    }
                    else{
                        msg = 'cannot find channel of user';
                        return res.status(404).json({
                            message: msg
                        });
        
                    }
                }
            ); 

                
        }catch(err){
            return res.status(404).json({
                message:`${err}`
            });
        }
})

//get each channels information
router.route('/:id')
    .get(param('id').notEmpty().withMessage('아이디가 필요합니다.'),
    (req,res)=>{
        const validationErr = validationResult(req);
        if(!validationErr.isEmpty()){
            return res.status(404).json(validationErr.array());
        }
        let channelId = parseInt(req.params.id);
        let msg ='';
        try{
            const sql =  'SELECT * FROM channels WHERE id = ?';   
            dbConnection.query(sql,channelId,
                function(err, results, fields) {
                    if (results.length){
                        res.status(201).json(results);
                    }
                    else if(err){
                        return res.status(404).json({
                            message: err
                        }); 
                    }
                else{
                        msg = 'cannot find channel';
                        return res.status(404).json({
                            message : msg
                        })
                    }
                }
            );

        }catch(err){
            return res.status(404).json({
                message:`${err}`
            });
        }
})
    .put([param('id').notEmpty().isInt().withMessage('id는 숫자여야 합니다.'),
        body('name').notEmpty().isString().withMessage('문자열이어야 합니다.')
    ],
        (req,res)=>{

            const valiDationErr = validationResult(req);
            if(!valiDationErr.isEmpty()){
                return res.status(404).end();
            }
        let channelId = parseInt(req.params.id);
        const {name} = req.body;
        let msg ='';
        try{
            const sql =  'UPDATE channels SET name = ? WHERE id = ?';   
            dbConnection.query(sql,[name, channelId],
                function(err, results, fields) {
                    if(err){
                        return res.status(404).json({
                            message: err
                        }); 
                    }
                    else if (results.affectedRows === 0 ){
                        return res.status(400).end()
                    }
                else{
                    res.status(201).json(results);
                    }
                }
            );
            
        }catch(err){
            res.status(404).json({
                message:`${err}`
            });
        }
   
    
})
    .delete(params().notEmpty().withMessage('id가 필요합니다. '),
        (req,res)=>{
            const valiDationErr = validationResult(req);
            if(!valiDationErr.isEmpty()){
                return res.status(400).end();
            }
    let channelId = parseInt(req.params.id);
    let msg ='';
    let channelName = '';
    try{
        let SQL = 'SELECT * FROM channels WHERE id = ?';
        dbConnection.query(SQL, channelId,
            function (err, results, fields) {
                if (err) {
                    return res.status(404).json({ message: 'Error finding channel to delete.' });
                }
                else if (results.length & dd){
                    channelName = results[0].name;
                    SQL = 'DELETE FROM channels WHERE id = ?';
                    dbConnection.query(SQL, channelId,
                    function (err, results, fields) {
                        if (err) {
                            return res.status(404).json(
                            { message: 'Error deleting channel.' });
                        }
                        else if (results.affectedRows === 0){
                            msg = '지워지지 못했습니다.';
                            return res.status(400).json({message:msg});
                        }
                        else {
                            msg = `${channelName} 채널이 삭제 됐습니다. `;
                            res.status(201).json({
                                message: msg
                            });
                        }
                    });

                }
                else{
                    msg = `채널이 존재하지 않습니다.`;
                    return res.status(404).json({
                        message: msg
                    });
                }
            }
        );
        
    }catch(err){
        return res.status(404).json({
            message:`${err}`
        });
    }

    
})

module.exports = router;