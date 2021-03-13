

require ('dotenv').config ();
const express = require ('express');
const cors = require ('cors');
const hbs = require ('hbs');
const helmet = require ('helmet');
const xss = require ('xss-clean');
const mongoose = require ('mongoose');
const PORT = process.env.PORT || 80
const path = require ('path');
const bodyParser = require ('body-parser');
const { RouteHandler } = require (path.resolve (__dirname, 'RouteHandler', 'RouteHandler'));


mongoose.Promise = global.Promise;
mongoose.connect (process.env.MONGO_DATABASE_URL, { useUnifiedTopology: true }).then (() => {
    console.log (`Connected to Database ${process.env.MONGO_DATABASE_URL}`);
}).catch ((error) => {
    console.log (`Error: ${error.message}`);
})


const app = express ();
//app.use (cors ());
app.use (helmet ());
app.use (xss ());
app.use (bodyParser.json ({ limit: '10kb' }));
app.use (express.static (path.resolve (__dirname, 'public')));
app.set ('view engine', 'hbs');
hbs.registerPartials (path.resolve (__dirname, 'views', 'partials'));

app.use ('/api', RouteHandler);

app.listen (PORT, () => {
    console.log (`http://localhost:${PORT}`);
})