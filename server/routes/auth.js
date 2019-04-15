/* Mode modules */
const express = require('express'),
            jwt = require('jsonwebtoken'), // give session JSON web token
            repos = require('./repos'),
            config = require('../config');
                   
/* Static files */
const User = require('../models/user');           



var router = express.Router();



/* INIT PHASE  GET ALL DATA AND CACHE IT */
repos.getRepoDetails();






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



router.get('/dashboard',(req,res,next)=>{
    const repoNames =  repos.myCache.get('repoNames');
    let response = {success: true, error:'',data:[]};
    response.data = repoNames.map((singleRepoName)=>{
        var tmp = repos.myCache.get(singleRepoName);
        if(!tmp)res.json({success:false , error:'Processing data, please wait'}).end(); // I dont think that this will end the execution
        return tmp ; 
    })
    res.json(response);
})


router.get('/detailed/:reponame',(req,res,next)=>{
    const {reponame} = req.params; 
    let response = {success: true, error:'',data:[]};
    console.log(reponame)
    response.data = repos.myCache.get(reponame.toString());

    res.json(response);
})


module.exports = router; 