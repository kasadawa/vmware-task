/* Mode modules */
'use strict'
const express = require('express'),
            jwt = require('jsonwebtoken'), // give session JSON web token
            repos = require('./repos'),
            config = require('../config');
                    
var router = express.Router();



/* INIT PHASE  GET ALL DATA AND CACHE IT */
// repos.getRepoDetails();







/* Authentication middleware */
const checkToken = function(req,res,next){
    const token = req.signedCookies['JWT_token']; 
    if(!token){
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
   
    const response = {success: true, error:'',data:[]};

    const error = repos.instance.getPinnedRepos(response.data);

    if(error){
        res.json({success:false, error:'Processing data, please wait && refresh'});
        return next(); // end the router  
    }


    //if the data is processed return it
    res.json(response);
   
})


router.get('/detailed/:reponame',(req,res,next)=>{
    const {reponame} = req.params; 
    let response = {success: true, error:'',data:[]};
    let error = repos.instance.getDetailedData(reponame,response.data);

    if(error){
        res.json({success:false , error:'Processing data, please wait && refresh'});
        return next(); // end the router 
    }
    res.json(response);
})


module.exports = router; 