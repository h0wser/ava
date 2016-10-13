const api_ai = require('apiai');
const config = require('./config');
const tss = require('./tss');
const fs = require('fs');

var app = api_ai(config.client_token);



tss.playText("Created reminder for you!")
