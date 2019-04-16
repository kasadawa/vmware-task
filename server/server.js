const   express = require('express'),
        cors = require('cors'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        Promise = require("bluebird"),
        mongoose = Promise.promisifyAll(require("mongoose")),
        config = require('./config'),
        app = express();



/* Init bundles */
app.use(cors({origin: 'http://localhost:4200', credentials: true}));
app.use(cookieParser(config.secret))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



/* Connect to the database */
mongoose.connect(config.database)
        .then(()=> {
                console.log('Connected to the Database')
        })
        .catch((err)=> console.log("Database Error: " + err))



/* Router includes */
const login = require('./routes/login'),
         auth = require('./routes/auth');


app.use('/', login);
app.use('/auth',auth);



/* if we want to serve from DIST folder , when we biuld our angular project */
/* We should use wildcast , because we are serving SPA ,otherwise we can get errors */

// app.get('/', (req, res) =>{
//     res.sendFile(__dirname + '/dist/index.html');
// })

// app.use(express.static(__dirname + '/dist'))

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))
