const path = require('path');
const express = require('express')
const app = express()
const handlebars = require('express-handlebars');
const morgan = require('morgan');

const route = require('./routes');
//connect database
const db = require('./config/db');

//connect to DB
db.connect();

app.use(morgan('combined'));

const port = 3003

//use static folder

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//Template enginer
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs'
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Route
//route init
route(app);


app.listen(process.env.PORT || port, () => {
    console.log(`App listening at http://localhost:${port}`);
});