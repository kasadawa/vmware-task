const Promise = require("bluebird"),
    NodeCache = require( "node-cache" ),
      request = Promise.promisifyAll(require('request')); // there is an additional libraly for request with bluebird 
// this need to be optimised 
// but I didnt find any way to list organisation pinnedRepos
const repos = [ 'clarity', 'photon','pyvmomi', "open-vm-tools",'govmomi'] ; 
const apiHref = 'https://api.github.com/repos/vmware';

const myCache = new NodeCache(); // we can  promisefy it with Bluebird
    
var options = {url: '' , headers: { 'User-Agent':'reuqest', 'Authorization': 'token a5e4355652f8b3e10734df105f1d9fd4fca1b36c'}} // requred from github API 


function getRepoDetails(){

    myCache.set('repoNames',repos);


    // the approach should be to make a huge promise and promise all 
    repos.map((repoName)=>{

        // thats not the best approach 
        Promise.all([
        getCount('commits',repoName),
        getCount('releases',repoName),
        getCount('contributors',repoName),
        getCount('branches',repoName),
        getLicense(repoName),
        getReadMe(repoName),
        getLatestCommits(repoName)
    ]).then((vals)=>{
        const RepoObj =  {
            name: repoName,
            commits:vals[0],
            releases:vals[1],
            contributors:vals[2], 
            branches:vals[3],
            license:vals[4],
            readme: vals[5],
            dCommits: vals[6],
        }
        myCache.set(repoName, RepoObj);
    }).catch((error)=>{
        console.log('there is a error, please restart the server in order to cache the data '+ error);
    })

    })


}

//getting the latest 30 commits from the first page 
function getLatestCommits(repoName){
    const licenseUrl = `${apiHref}/${repoName}/commits`;
    options.url = licenseUrl; 
    return request.getAsync(options)
    .then((res) =>{
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
    .catch(err => err);
}


function getReadMe(repoName){
    const licenseUrl = `${apiHref}/${repoName}/readme`; // there is also a format README.rst
    options.url = licenseUrl; 
    return request.getAsync(options)
            .then((res) =>{
                res.body  = JSON.parse(res.body);                
                return  res.body.content || 'There is no README.md';
                })
            .catch(err => err);
}

function getLicense(repoName){
    const licenseUrl = `${apiHref}/${repoName}/license`;
    options.url = licenseUrl; 
    return request.getAsync(options)
            .then((res) =>{
                res.body  = JSON.parse(res.body);                
                return  (res.body.license === undefined ? 'no license provided': res.body.license.name);

                })
            .catch(err => err);
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
            // check if there are more pages 
            if(!!res.headers.link){
                const [nextURL , lastURL] = res.headers.link.split(',');
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
            console.log(repoName+" "+ funcName+" " + counts);
            return counts;
        })
        .catch(err => err);
}


module.exports = {
    getRepoDetails: getRepoDetails,
    myCache:myCache   
}