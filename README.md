# vmware-task
Short description of the task. 
Create a website which has the following pages:
- Login Page
- Dashboard Page
- Detailed Page
- General Info & commit Tabs 

## Requrements 
In dashboard page (after the user is logged in)github’s API retrieve  https://github.com/vmware pinned repos and visualize them using Clarity.

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
  - Mongoose (to save the user credentials )
  - sjcl (for password encryption) 
  - jsonwebtoken (to create and check the token )
  - body-parser
  - cookie-parser
 

### Login Page 
Login  is implemented with `JWT` token and signed cookie, so when the user is authenticated , JWT token is send through the back-end server to the user. The browser can't assess the JWT token and cannot mutate it (if its changed somehow the server will know that and wont authenticate us).

The point of using JWT is also to send a data with the authetication , but in this implementation the browser can't read the JWT. It's more secure of point accessing/ reading the token.



### What can be improved
