/* Mode modules */
const express = require('express'),
            jwt = require('jsonwebtoken'), // give session JSON web token
            repos = require('./repos'),
            config = require('../config');
                    
var router = express.Router();



/* INIT PHASE  GET ALL DATA AND CACHE IT */
repos.getRepoDetails();






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


// with iterable protocol ;) 

router.get('/dashboard',(req,res,next)=>{
    const repoNames =  config.pinned_repos[Symbol.iterator]();
    let response = {success: true, error:'',data:[]};

    var singleRepoName = repoNames.next(); 

    while(!singleRepoName.done){
        let tmp = repos.myCache.get(singleRepoName.value);
        if(!tmp){
            
            res.json({success:false , error:'Processing data, please wait && refresh'});
            return next(); // end the router 
            
        }; // I dont think that this will end the execution
        response.data.push(tmp);

        singleRepoName = repoNames.next();     
    }

    //if the data is processed return it
    res.json(response);
   
})


router.get('/detailed/:reponame',(req,res,next)=>{
    const {reponame} = req.params; 
    let response = {success: true, error:'',data:[]};
    response.data = repos.myCache.get('detailed_'+reponame);
    if(!response.data){
        res.json({success:false , error:'Processing data, please wait && refresh'});
        return next(); // end the router 
    }
    res.json(response);
})


module.exports = router; 