var express = require('express');
var path=require('path')
var app = express();
var bodyParser = require('body-parser')
var router=require('./router')

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/'))
// app.set('views',path.join(__dirname+'/view'))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(router)

app.listen(8000,function () {
    console.log('server is running 8000')
})