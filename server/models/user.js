const mongoose = require('mongoose'),
        config = require('../config'),
        sjcl = require('sjcl');


var Schema = mongoose.Schema;


var UserSchema = new Schema({
        email: {
        type: String,
        required: true,
        trim: true,
        match: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/,
        index: {
            unique: true
            }
        },
        password: {
        type: String,
        required: true,
        trim: true,
        }
});

UserSchema.path('email').validate(function (email) {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase()) && (email.length >= 5 && email.length <= 30);
});


// we can 
UserSchema.path('password').validate(function (password) {
return password.length > 5 && password.length <= 20;
});

UserSchema.pre('save', function(next){

    var user = this;

    if (!user.isModified('password')){
        return next();
    }else{
        user.password = sjcl.encrypt(config.secret,user.password)
        next();
    }
});


// this methos is used in routes/login.js
UserSchema.methods.comparePassword = function(password){
    var user = this;
    return (sjcl.decrypt(config.secret,user.password) == password);
};

module.exports = mongoose.model('User', UserSchema);