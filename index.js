/*const http = require("http");
const hostName = '127.0.0.1';*/
const express = require('express');
const app = express();
const port = 8080;
let router = require("./route/router")
let path = require("path")

app.use(express.urlencoded({ extended: false }))
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "static")));

app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

