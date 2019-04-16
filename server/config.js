module.exports ={ 
    port : 3000, 
    _HOST : 'http://localhost:4200',
    secret : 'cookie_secret',  /* using it with JWT and sjcl */
    database : 'mongodb://mitko:mitko123@ds135776.mlab.com:35776/vmware-task',
    api_href: 'https://api.github.com/repos/vmware',
    github_token:'token 114e89e09f8fbd9a86ad9c47311c97b6dc25f190',
    pinned_repos: [ 'clarity', 'photon','pyvmomi', "open-vm-tools",'govmomi'] ,
    cookie_name:'JWT_token'
}