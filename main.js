const api_ai = require('apiai');
const config = require('./config');
const tss = require('./tss');
const fs = require('fs');

var app = api_ai(config.apiai_client_token);



tss.playText("Created reminder for you!")
