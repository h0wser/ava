const api_ai = require('apiai');
const config = require('./config');
const tss = require('./tss');
const fs = require('fs');
const voice = require('./voicerecognition');
const intent = require('./intent');

//var app = api_ai(config.apiai_client_token);

//tss.playText("Created reminder for you!")

//voice.start((text) => {console.log(text)});

testIntent = new intent();

testIntent.on('bedtime', () => {
    console.log("bedtime event");
});

testIntent.on('remind', () => {
    console.log("remind event");
});

testIntent.listIntents();
testIntent.emit('bedtime');
testIntent.emit('remind');
