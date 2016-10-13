var api_ai = require('apiai');
var config = require('./config');
var tss = require('./tss');;

var app = api_ai(config.client_token);
/*
var request = app.textRequest('Im going to bed now');

request.on('response', (res) => {
    console.log(res);
});

request.on('error', (err) => {
    console.log(err);
});

request.end();
*/

tss.getSpeech("Hello this is an amazing test")
