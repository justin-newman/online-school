var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();
var port = 1337;

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/contact', function (request, response) {
    response.sendFile(__dirname + '/contact.html');
});

app.get('/classes', function (req, res) {
    fs.readFile('classes.json', 'utf8', function (err, data) {
        var classes = JSON.parse(data);
        res.locals = {
            classes: classes
        }   
        res.render('classes.ejs');
    })
});

app.get('/classes/:id', function(req, res) {
    fs.readFile('classes.json', 'utf8', function (err, data) {
    var classes = JSON.parse(data);
    var eachClass = classes.filter( function(obj) {
        console.log(obj)
        return parseInt(obj.id) === parseInt(req.params.id)
    })[0];
    
    res.locals = { eachClass: eachClass }
    res.render('class.ejs');

    });
});

app.listen(port);
console.log('Sever running on http://localhost:' + port);