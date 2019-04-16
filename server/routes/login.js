/* Mode modules */
const   express = require('express'),
        jwt = require('jsonwebtoken'), // give session JSON web token
        config = require('../config'); 
        
/* Static files */
const User = require('../models/user');

var router = express.Router();



// what can be modified
// add a counter 
// add capcha after 3 attemps 

router.post('/login',(req,res)=>{
    const { email , password } = req.body ;
    let ret = {}; // the return parameter
    
  
    User.findOne( { email },  (err, data) => {

        if (!!err) {
            ret = {success:false, err:'Something went wrong'}
        } else if (data == null) {

            ret = {success:false, err: 'There is no user with this email'};
        } else {

            if (data.comparePassword(password) == true) {
                // 8 hours expiration
                const token = jwt.sign({ email: data.email} , config.secret, { expiresIn: 60 * 60 * 6 });
                
                ret = {success:true};
                // saveCookie


                const options = {
                    maxAge: 1000 * 60 * 60 * 6, // would expire after 6 hour's
                    httpOnly: true, // The cookie only accessible by the web server
                    signed: true, // Indicates if the cookie should be signed
                };
                res.cookie(config.cookie_name,token, options);
                
            } else {
                ret  = {success:false, err: 'Your password is wrong, please try again.' };
            }
        }
        res.send(ret);
    })
});




router.post('/logout', (req,res,next)=>{
    res.clearCookie(config.cookie_name);
    res.status(200).location(config._HOST).end();
});



module.exports = router;







/* In case you want to register  a new user */

// var userObj = new User({
//     email: 'admin@abv.bg',
//     password: 'admin123'
// });

// User.findOne({
//     email: 'admin@abv.bg'
// },  (err, user) => {
//     if (!!err) {
//         console.log(err);
//     } else if (!!user) {
//         console.log('There is user with this email')
//     } else {
//         userObj.save( (err) => {
//             if (!!err) {
//                 console.log('save error'+ err);
                
//             } else {
//                 console.log('Succesfully saved');
//             }
//         });
//     }
// });