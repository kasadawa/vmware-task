process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const   chai = require('chai'),
    sinon = require('sinon'),
    repos = require('../routes/repos'),
    expect = chai.expect ;



describe('Testing the function inside the repos.js file',  function(){



    this.timeout(3000);

    it('getCount() Function with correct params ',  () => {
        var spy = sinon.spy(repos.instance,'getCount');

        
        return repos.instance.getCount('commits','photon').then(function (res){
            
            expect(res).to.be.a('number');
            expect(repos.instance.getCount.calledWith('commits','photon')).to.be.equal(true);
            expect(repos.instance.getCount.calledOnce).to.be.equal(true);
            spy.restore();
        })
       
        
    });


    it('getCount() Function with In-correct first/second param ',  () => {

        var spy = sinon.spy(repos.instance,'getCount');

        return repos.instance.getCount('commmits','photon').then()
        .catch((res)=>{
           
            expect(res.message).to.be.a('string');
            expect(res.message).to.be.equal('The url was not loaded correctly');

            expect(repos.instance.getCount.calledWith('commmits','photon')).to.be.equal(true);
            expect(repos.instance.getCount.calledOnce).to.be.equal(true);
            spy.restore();
        })
       
        
    });
});
