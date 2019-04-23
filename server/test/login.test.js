process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const   chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server'),
    expect = chai.expect ;


    
var app = 'http://localhost:3000';
chai.use(chaiHttp);




// Route login tests
describe('Route  /login',  ()  =>{
    it('Login should be invalid when data is null (or there is no email found )',  (done) => {
      
        // let body = {
        //     email:'failfail@face.com',
        //     password:'',
        // };

        let body = {
            email:'null',
            password:'null',
        };

        chai.request(app)
            .post('/login')
            .send(body)
            .end((err,res)=>{
                expect(res.body.err).to.be.equal('There is no user with this email')
                expect(res.body.success).to.be.equal(false);
                done();
            });
    });

    it('Wrong password)',  (done) => {
      
        let body = {
            email:'admin@abv.bg',
            password:'skaoda',
        };

        chai.request(app)
            .post('/login')
            .send(body)
            .end((err,res)=>{
                expect(res.body.err).to.be.equal('Your password is wrong, please try again.')
                expect(res.body.success).to.be.equal(false);
                done();
            });
    });
});

// End of Login Route


