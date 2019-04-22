'use strict'
const Promise = require("bluebird"),
        conf = require('../config'),
    NodeCache = require( "node-cache" ),
      request = Promise.promisifyAll(require('request')); // there is an additional libraly for request with bluebird 





const myCache = new NodeCache(); 
    
const options = {url: '' , 'json': true , headers: { 'User-Agent':'request', 'Authorization': conf.github_token}} // requred from github API 

class RepositoryData{
    
    constructor(){
        this.repos = conf.pinned_repos; 
        this.apiHref = conf.api_href;
        this.repoData = [] ; 
        this.calledInit = false; 
    }

    init(){
        this.calledInit = true; 
        this.repos.forEach((repoName)=>{
            Promise.all([
            this.getCount('commits',repoName),
            this.getCount('releases',repoName),
            this.getCount('contributors',repoName),
            this.getCount('branches',repoName),
            this.getLicense(repoName),
            this.getReadMe(repoName),
            this.getLatestCommits(repoName)
            ])
            .then(([commits, releases,contributors,branches,license,readme,latestCommits])=>{

                const RepoObj =  {name: repoName,commits,releases,contributors,branches,license};
                
                const detailedRepoObj = {readme,commits: latestCommits }

                myCache.set(repoName, RepoObj);
                myCache.set(`detailed_${repoName}`,detailedRepoObj)
            }).catch((error)=>{
                error = error.message || error;
                console.log('there is a error, please restart the server in order to cache the data: '+ error);
                // process.exit(1);
            })
        });
    }

    getLatestCommits(repoName){
        const licenseUrl = `${this.apiHref}/${repoName}/commits`;
        options.url = licenseUrl; 
        return request.getAsync(options)
        .then((res) =>{
            this.checkHeaders(res.headers.status)

            const commitsArray = res.body.map((singleCommit)=>{
                return {
                    comment: singleCommit.commit.message,
                    date: singleCommit.commit.author.date,
                    contributor: singleCommit.commit.author.email,
                    patch: `${this.apiHref}/${repoName}/commit/${singleCommit.sha}.patch`
                }
            });
            return commitsArray;
        })
    }

    checkHeaders(headers){
        if(!(/(200|300)/.test(headers))){
            throw new Error('The url was not loaded correctly')
        }
    }



    getReadMe(repoName){
        const licenseUrl = `${this.apiHref}/${repoName}/readme`; // there is also a format README.rst
        options.url = licenseUrl; 
        return request.getAsync(options)
                .then((res) =>{  
                    this.checkHeaders(res.headers.status);
                   
                    return  res.body.content || 'There is no README.md'; // I need to check this 
                })        
    }


    getLicense(repoName){
        const licenseUrl = `${this.apiHref}/${repoName}/license`;
        options.url = licenseUrl; 
        return request.getAsync(options)
                .then((res) =>{   
                    return  (res.body.license === undefined ? 'no license provided': res.body.license.name);
                })
    }



    getCount(funcName,repoName){
        let lastPageNum = 0 ;


        const licenseUrl = `${this.apiHref}/${repoName}/${funcName}?page=`;
        options.url = licenseUrl + 1;
        
        return request.getAsync(options)
        .then((res) =>{
          
            this.checkHeaders(res.headers.status)

            // check if there are more pages 
            if(!!res.headers.link){
               
                const [ , lastURL] = res.headers.link.split(',');
                lastPageNum = +lastURL.match(/page=(\d+)/)[1];
                options.url = licenseUrl + lastPageNum;
                return request.getAsync(options)
            }else{
                // if its single page just resolve on to the chain 
                
                return Promise.resolve(res.body.length);
            }
    
        }).then((lastPageRes)=>{

            return (lastPageNum !== 0 
                ? ( (lastPageNum-1)*30 + lastPageRes.body.length ) 
                : lastPageRes)

            })
    }


    getDetailedData(reponame,data){ 
        const ret = myCache.get('detailed_'+reponame);
        if(!ret && this.calledInit){
            this.calledInit = true ; 
            setTimeout(() => {
                let error = myCache.get('detailed_'+reponame);
                if(error) this.init(); 
            }, 5000);
        }
        if(!!ret) ret = data;

        return !ret ? false : true ;  
    }

    
    getCacheData(data){
        let error = false; 
        this.repos.forEach((singleRepoName)=>{
            let tmp = myCache.get(singleRepoName);
            if(!tmp){    
                error = true; 
            };
            data.push(tmp);
        })
        return error; 
    }

    getPinnedRepos(data){
        let error = this.getCacheData(data); 
        if(error && this.calledInit){
            
            this.calledInit = false; 
            setTimeout(()=>{
                let error = this.getCacheData(data);       
                if(error) this.init(); 
            },5000)
        }

        return error; 
        
    }
}


/* CREATING SINGLE INSTANCE */
const instance = new RepositoryData(); 
instance.init(); 

module.exports = {
    instance  // used by the tests and auth.js 
}
