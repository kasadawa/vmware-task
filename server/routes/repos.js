const Promise = require("bluebird"),
      request = Promise.promisifyAll(require('request')); // there is an additional libraly for request with bluebird 
// this need to be optimised 
// but I didnt find any way to list organisation pinnedRepos
const repos = [ 'clarity', 'photon','pyvmomi', "open-vm-tools",'govmomi'] ; 
const apiHref = 'https://api.github.com/repos/vmware';
var options = {url: '' , headers: { 'User-Agent':'reuqest', 'Authorization': 'token b59bff6fffdb5ae66682a2377c8611a34162b6a1'}} // requred from github API 

function getRepoDetails(){

    // the approach should be to make a huge promise and promise all 
    repos.map((repoName)=>{
        const RepoObj =  {
            name: repoName,
            license:'',
            commits:0,
            contributors:0, 
            releases:0,
            branches:0
        }
        getLicense(repoName);

    })
    getCommits('govmomi',1);
    getCommits('govmomi',2);
    getCommits('govmomi',3);
    // getCommits('govmomi',4);
    // getCommits('govmomi',5);

       

}

function getLicense(repoName){
    const licenseUrl = `${apiHref}/${repoName}/license`;
    options.url = licenseUrl; 
    request.getAsync(options)
            .then((res) =>{
                res.body  = JSON.parse(res.body);                 
                console.log(res.body.license.name)
                }).catch(err => console.log(err));
}

var commitsSum = 0 ; 
var contributorsSum = 0;



// need to find a way to find all of hte commits 
function getReleases(){



}



// need to find a way to find all of hte commits 
function getBranches(){



}


// need to find a way to find all of hte commits 
function getCommits(){



}
// I need to rework it
function getContributors(repoName , page = '1'){
    // you are getting all of the contributors correct, but the commits are not correct ,because statistics exclude some of the commits

    const licenseUrl = `${apiHref}/${repoName}/contributors?page=${page}`;
    options.url = licenseUrl;
    request.getAsync(options)
            .then((res) =>{
                res.body  = JSON.parse(res.body)
                
                res.body.map((obj)=>{
                    commitsSum += obj.contributions
                })
                contributorsSum += res.body.length
                console.log(repoName+ ' ' + contributorsSum); 
                
                console.log(repoName+ ' ' + commitsSum); 
                })
            .catch(err => console.log(err));
}

module.exports = {
    getRepoDetails: getRepoDetails
}