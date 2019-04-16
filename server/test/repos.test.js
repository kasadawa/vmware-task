process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const   chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    config = require('../config'),
    sinon = require('sinon'),
    repos = require('../routes/repos'),
    server = require('../server'),
    expect = chai.expect ;



describe('Testing the function inside the repos.js file',  ()  =>{

    it('getCount() Function with correct params ',  () => {
        var spy = sinon.spy(repos,'getCount');

        
        return repos.getCount('commits','photon').then(function (res){
            
            expect(res).to.be.a('number');
            expect(repos.getCount.calledWith('commits','photon')).to.be.equal(true);
            expect(repos.getCount.calledOnce).to.be.equal(true);
            spy.restore();
        })
       
        
    });


    it('getCount() Function with In-correct first/second param ',  () => {

        var spy = sinon.spy(repos,'getCount');

        return repos.getCount('commmits','photon').then()
        .catch((res)=>{
           
            expect(res.message).to.be.a('string');
            expect(res.message).to.be.equal('The url was not loaded correctly');

            expect(repos.getCount.calledWith('commmits','photon')).to.be.equal(true);
            expect(repos.getCount.calledOnce).to.be.equal(true);
            spy.restore();
        })
       
        
    });
});
