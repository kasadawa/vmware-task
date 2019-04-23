process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const   chai = require('chai'),
    chaiHttp = require('chai-http'),
    config = require('../config'),
    sinon = require('sinon'),
    repos = require('../routes/repos'),
    server = require('../server'),
    expect = chai.expect ;


var app = 'http://localhost:3000';
chai.use(chaiHttp);


var agent = chai.request.agent(app) // agent is used in order to get the cookie 

describe('Route  /auth Non Authenticated',  ()  =>{

    it('load /auth route without credentials',  () => {

        return agent.post('/auth')
        .send({})
        .then( (res) =>{
            expect(res).to.have.status(401);  
        });
    });

    it('load /auth/dashboard route without credentials',  () => {
        return agent.get('/auth/dashboard')
        .then( (res) =>{
            expect(res).to.have.status(401);  
        });
    });

});



// it's set with a function because we need to use chai `this` keyword
describe('Route  /auth Authenticated',  function()  {

    it('(First Login succesfully  to get a JWT-Token)',  () => {
        // Start Auth Route
        let body = {
            email:'admin@abv.bg',
            password:'admin123',
        };
        return agent
            .post('/login')
            .send(body)
            .then((res)=>{
                expect(res.body.success).to.be.equal(true);
                expect(res).to.have.cookie(config.cookie_name);
            })
    });

    it('After login - check the /auth  route )',  () => {

        return agent.post('/auth')
        .send()
        .then( (res) =>{
            expect(res).to.have.status(200);  
        });
    });

    it('After login - check the /auth/dashboard route',  () => {
            return agent.get('/auth/dashboard')
            .then( (res) =>{
                expect(res.body.success).to.be.equal(false);
                expect(res.body.error).to.be.equal('Processing data, please wait && refresh');
            });
    });


    it('After login - check the /auth/dashboard route after 5 seconds (to cache the req)',  function(done){
        
        this.timeout(3000);
        var spy = sinon.spy(repos.instance,'init');
        // calling it here because it does not find the call before module export
        repos.instance.init();

        setTimeout(function(){
            agent.get('/auth/dashboard').end((err,res) =>{
                expect(repos.instance.init.calledOnce).to.be.equal(true);
                expect(res.body.success).to.be.equal(true);
                expect(res.body.data.length).to.be.equal(config.pinned_repos.length);
                spy.restore();
                done();
            })

        },2000)

    });


    it('Logout from the route',  function() {
        return agent.post('/logout')
            .then((res)=>{
                expect(res).to.have.status(200);
                expect(res).not.to.have.cookie(config.cookie_name);
                expect(res.header.location).to.be.equal(config._HOST);
            });
    });

});