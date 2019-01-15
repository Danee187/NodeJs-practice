const express = require("express");
const bodyParser = require("body-parser");
let path = require("path");
let expressValidator = require('express-validator');

var app = express();

/* var logger = function(req, res, next){
    console.log("Logging...");
    next();
}

app.use(logger); */

// View Engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));


// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public'))); //Stzatikusan megadjuk, hogy a path mappából töltse be a dokumentumokat.

// Global Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});


/* var peapole = [
    {
        name:'Jeff',
        age: 30
    },
    {
        name:'Sarah',
        age: 28
    },
    {
        name:'Sandor',
        age: 40
    }
]; */

//Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value 
        };
    }
}));

var users = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'Johndoe@gmail.com'
    },
    {
        id: 2,
        first_name: 'Bob',
        last_name: 'Lee',
        email: 'BobLee@gmail.com'
    },
    {
        id: 3,
        first_name: 'Jane',
        last_name: 'Detox',
        email: 'JaneDetox@gmail.com'
    }
]

app.get('/', function(req,res){
    //res.json(peapole);
    //res.send('Hello World');

    res.render('index', {
        title: 'Customers',
        users: users
    });
});

app.post('/users/add', function(req,res){ //Ide küldi a form a cuccokat

    req.checkBody('first_name', 'First name is Required').notEmpty();
    req.checkBody('last_name', 'Last name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('index', {
            title: 'Customers',
            users: users,
            errors: errors
        });
    }else{
        var newUser = {
            first_name: req.body.first_name,
            lasst_name: req.body.last_name,
            email: req.body.email
        }

        console.log('SUCCES');
    }

    console.log(newUser);
    
    //console.log(req.body.first_name);
    //console.log('FORM SUBMITTED');
});

app.listen(3000, function() {
    console.log("Server started on Port 3000");
});