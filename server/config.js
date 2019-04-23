module.exports ={ 
    port : 3000, 
    _HOST : 'http://localhost:4200',
    secret : 'cookie_secret',  /* using it with JWT and sjcl */
    database : 'mongodb://mitko:mitko123@ds135776.mlab.com:35776/vmware-task',
    api_href: 'https://api.github.com/repos/vmware',
    github_token:'token 3a714e8c036c7d5c6104008d508b79aff61acc2b',
    pinned_repos: [ 'clarity', 'photon','pyvmomi', "open-vm-tools",'govmomi'] ,
    cookie_name:'JWT_token'
}