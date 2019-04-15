# vmware-task
Short description of the task. 
Create a website which has the following pages:
- Login Page
- Dashboard Page
- Detailed Page
- General Info & commit Tabs 

## Requrements 
In dashboard page (after the user is logged in)github’s API retrieve  [https://github.com/vmware](https://github.com/vmware) pinned repos and visualize them using Clarity.

The data in the UI per repo should have: name, license, commits, contributors, releases and branches. It should be easily filtered.

Clicking on repo name will lead to detailed page. There should be general info and commits tabs.
In ‘general info’ tab there should visualization of README.md or package.json. 

In ‘commits’ tab there should be datagrid with recent commits. For each commit a ‘download patch’ button will allow downloading a patch file for this commit.

Interaction to github should be done in the BE using node.js. Data may be cached in the BE and the client UI and grids should retrieve paginated data from the BE.

### Used Technologies 

#### Font-end Angular CLI 7 
 - Clarity
 - RxJS
 
#### Back-end NodeJS
  - Express
  - Bluebird
  - Request
  - node-cache
  - cors
  - Chai
  - Sinon
  - Mocha
  - [Mongoose](https://github.com/Automattic/mongoose) (to save the user credentials )
  - [sjcl](https://github.com/bitwiseshiftleft/sjcl) (for password encryption) 
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) (to create and check the token )
  - [body-parser](https://github.com/expressjs/body-parser)
  - [cookie-parser](https://github.com/expressjs/cookie-parser)
 

### Login Page 
Login  is implemented with `JWT` token and signed cookie, so when the user is authenticated , JWT token is send through the back-end server to the user. The browser can't assess the JWT token and cannot mutate it (if its changed somehow the server will know that and wont authenticate us).

The point of using JWT is also to send a data with the authetication , but in this implementation the browser can't read the JWT. It's more secure of point accessing/ reading the token.

User credentials are saved in mlab, using `mongoose` The password is encrypted using sjcl.

### Dashboard Page 




### Detailed Page 


## Run the project 
Install all of the deppendencies with: 
`npm install`
and 
`cd server && npm install` 


From the root director run the nodeJS server: 

`node server/` or you can run it with nodemon

And the Front-End server:
`ng serve` 

## Tests 




### What can be improved
 - some of the functions in the nodeJS routes/repos.js file. If you write the functions with async/await the code will look more readable. 
 - My opinion is that server should handle all of the authentication and routing. So I would build the project, serve it from dist folder and again check for credentials, before loading a specific route. 
 - if you really want to view some stats I would craw the html and get the stats, because it would be easier and time saving
 


## What was a challange 
Github API ! It exclude some of the results. 

For example for `/releases` does not return the amount of releases thats mentioned on the github repository page, because the releases that are mentioned on the official page are releases + tags.



## Usefill links 

Some emails are not the same as the commiter - [explanation](https://help.github.com/en/articles/about-commit-email-addresses)