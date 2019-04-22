module.exports ={ 
    port : 3000, 
    _HOST : 'http://localhost:4200',
    secret : 'cookie_secret',  /* using it with JWT and sjcl */
    database : 'mongodb://mitko:mitko123@ds135776.mlab.com:35776/vmware-task',
    api_href: 'https://api.github.com/repos/vmware',
    github_token:'token 7c380dcbc5210bb114d9b67d45b6c0b1d9453a11',
    pinned_repos: [ 'clarity', 'photon','pyvmomi', "open-vm-tools",'govmomi'] ,
    cookie_name:'JWT_token'
}