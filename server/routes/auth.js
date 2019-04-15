/* Mode modules */
const express = require('express'),
            jwt = require('jsonwebtoken'), // give session JSON web token
            request = require('request'),
            repoF = require('./repos'),
            config = require('../config');
                   
/* Static files */
const User = require('../models/user');           



var router = express.Router();


repoF.getRepoDetails();
/* Authentication middleware */
const checkToken = function(req,res,next){
    const token = req.signedCookies['JWT_token']; 
    console.log(token);
    console.log('token');
    if(!token){
    console.log('token');

        res.status(401).location(config._HOST).end();
    }else{
        jwt.verify(token, config.secret, (err) => {
            if (!!err) { 
                // if(err.name == 'TokenExpiredError'){
                //     res.send({success:false,err:'Token is expired'});
                // }
                // if(err.message == 'invalid signature'){
                //     res.send({success:false,err:'Token invalid signature'});
                // }else{
                //     res.writeHead(401,{Location: config._HOST});
                //     res.end();
                // }
                res.status(401).location(config._HOST).end();
            }else{
                console.log('authenticated success');
                next();
            }
          });

    }

}

router.use(checkToken);


// just for check 
router.post('/',(req,res,next)=>{
    res.send({});
})


module.exports = router; 