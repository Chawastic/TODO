require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs').promises;
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var todosRouter = require('./routes/todos');
var categoryRouter = require('./routes/category');
var statusesRouter = require('./routes/statuses');
var db = require('./models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/todos', todosRouter);
app.use('/category', categoryRouter);
app.use('/statuses', statusesRouter);

app.use(bodyParser.json())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const populateStatuses = async () => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data/statuses.json'), 'utf-8');
        const statuses = JSON.parse(data);
        await db.Status.bulkCreate(statuses);
        console.log('Statuses table populated!');
    } catch (error) {
        console.error('Error populating Statuses table: ', error);
    }
};

// Sync database and then populate statuses
if (process.env.NODE_ENV !== 'test') {
    db.sequelize.sync({ force: true }).then(() => {
        populateStatuses();
    });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;