const api_ai = require('apiai');
const config = require('../config');
const tss = require('./tss');
const fs = require('fs');
const voice = require('./voicerecognition');
const intent = require('./intent');

intentEmitter = new intent();

intentEmitter.on('bedtime', (entities) => {
    console.log("bedtime event fired");
});

voice_callback = function(res) {
    console.log("Query: " + res._text);
    if (res.entities) {
	if (res.entities.intent) {
	    console.log("Intent: " + res.entities.intent[0].value);
	    intentEmitter.emit(res.entities['intent'][0]['value'], res.entities);
	}
    } else {
	console.log("No entities found");
    }
}

voice.start(voice_callback);
