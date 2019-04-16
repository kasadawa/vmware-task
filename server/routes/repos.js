const Promise = require("bluebird"),
        conf = require('../config'),
    NodeCache = require( "node-cache" ),
      request = Promise.promisifyAll(require('request')); // there is an additional libraly for request with bluebird 



const repos = conf.pinned_repos; 
const apiHref = conf.api_href;
const myCache = new NodeCache(); 
    
var options = {url: '' , headers: { 'User-Agent':'request', 'Authorization': conf.github_token}} // requred from github API 


function getRepoDetails(){

    myCache.set('repoNames',repos);


    // the approach should be to make a huge promise and promise all 
    repos.map((repoName)=>{

            Promise.all([
            getCount('commits',repoName),
            getCount('releases',repoName),
            getCount('contributors',repoName),
            getCount('branches',repoName),
            getLicense(repoName),
            getReadMe(repoName),
            getLatestCommits(repoName)
        ]).then((vals)=>{
            // console.log(vals)
            const RepoObj =  {
                name: repoName,
                commits:vals[0],
                releases:vals[1],
                contributors:vals[2], 
                branches:vals[3],
                license:vals[4],
            }
            const detailedRepoObj = {
                readme: vals[5],
                commits: vals[6]
            }
            myCache.set(repoName, RepoObj);
            myCache.set(`detailed_${repoName}`,detailedRepoObj)
        }).catch((error)=>{
            error = error.message || error;
            console.log('there is a error, please restart the server in order to cache the data: '+ error);
            // process.exit(1);
        })

    })


}

// you can do something like 
// if the response.status is different than 200, throw error 

//getting the latest 30 commits from the first page 
function getLatestCommits(repoName){
    const licenseUrl = `${apiHref}/${repoName}/commits`;
    options.url = licenseUrl; 
    return request.getAsync(options)
    .then((res) =>{
        if(!res.headers.status.includes(200) && !res.headers.status.includes(304)){
            throw new Error('The url was not loaded correctly')
        }

        res.body  = JSON.parse(res.body);                
        const commitsArray = res.body.map((singleCommit)=>{
            return {
                comment: singleCommit.commit.message,
                date: singleCommit.commit.author.date,
                contributor: singleCommit.commit.author.email,
                patch: `${apiHref}/${repoName}/commit/${singleCommit.sha}.patch`
            }
        });
        return commitsArray;
        })
}


function getReadMe(repoName){
    const licenseUrl = `${apiHref}/${repoName}/readme`; // there is also a format README.rst
    options.url = licenseUrl; 
    return request.getAsync(options)
            .then((res) =>{
                      
                if(!res.headers.status.includes(200) && !res.headers.status.includes(304)){
                    throw new Error('The url was not loaded correctly')
                }

                res.body  = JSON.parse(res.body);                
                return  res.body.content || 'There is no README.md';
                })
          
}

function getLicense(repoName){
    const licenseUrl = `${apiHref}/${repoName}/license`;
    options.url = licenseUrl; 
    return request.getAsync(options)
            .then((res) =>{
                res.body  = JSON.parse(res.body);                
                return  (res.body.license === undefined ? 'no license provided': res.body.license.name);

            })
           
}


// the number that is showed on github is the number of tags + releases 
// I will list only the releases 
// https://api.github.com/repos/allenluce/mmap-object/releases

function getCount(funcName,repoName ){
    let lastPageNum = 0, counts = 0 ; 
    const licenseUrl = `${apiHref}/${repoName}/${funcName}?page=`;
    options.url = licenseUrl + 1;
    
    return request.getAsync(options)
    .then((res) =>{
      
        if(!res.headers.status.includes(200) && !res.headers.status.includes(304)){
           
            throw new Error('The url was not loaded correctly')
        }

        // check if there are more pages 
        if(!!res.headers.link){
           
            const [ , lastURL] = res.headers.link.split(',');
            lastPageNum = lastURL.match(/(?<==)\d+/g).join(); // in order to get the number as a digit
            options.url = licenseUrl + lastPageNum;
            return request.getAsync(options)
        }else{
            // if its single page just resolve on to the chain 
            res.body  = JSON.parse(res.body)
            return Promise.resolve(res.body.length);
        }

    }).then((lastPageRes)=>{
        // if its not single page 
        if(lastPageNum !== 0){
            lastPageRes.body  = JSON.parse(lastPageRes.body)
            counts = (lastPageNum-1)*30 + lastPageRes.body.length; 
        }else{
            counts = lastPageRes;
        }
        // console.log(repoName+" "+ funcName+" " + counts);
        return counts;
        })
}


module.exports = {
    getRepoDetails: getRepoDetails,
    myCache:myCache,
    getLatestCommits,
    getCount,

}





/* I've removed the await at first declaration in order to execute the functions in parallel 
# JUST Testing ES6 style 
 The error handling is not that good as Promises error handling */

async function callAsync(repoName){
    try{
    const commits =  getCount('commits',repoName);
    const releases =  getCount('releases',repoName);
    const contributors =  getCount('contributors',repoName);
    const branches = getCount('branches',repoName);
    const license = getLicense(repoName);
    const readme = getReadMe(repoName);
    const dCommits = getLatestCommits(repoName);
    const RepoObj =  {
        name: repoName,
        commits:await commits,
        releases: await releases,
        contributors: await contributors, 
        branches: await branches,
        license: await license,
        readme: await readme,
        dCommits: await dCommits,
    }
    myCache.set(repoName, RepoObj);
    }catch(err){
        console.log('there is an error: ' + err)
    }
}
