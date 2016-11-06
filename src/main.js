const api_ai = require('apiai');
const config = require('../config');
const tss = require('./tss');
const fs = require('fs');
const voice = require('./voicerecognition');
const intent = require('./intent');
const request = require('request');
const lights = require('./lights');

intentEmitter = new intent();

lights.init();

intentEmitter.on('bedtime', (entities) => {
    console.log("bedtime event fired");
});

intentEmitter.on('on_off', lights.on_off_callback);


// For testing
text_query = function(text, callback) {
	request.get({
		url: 'https://api.wit.ai/message',
		headers: {
			'Authorization': 'Bearer ' + config.witai_client_token
		},
		qs: {
			v: '20160526', // TODO: Move into config file
			q: text
		}
	}, (err, res, body) => {
		if (err) {
			console.log(err);
		}
		if (res.statusCode == 200) {
			callback(JSON.parse(body));
		} else {
			console.log("Text query error, HTTP Code: " + res.statusCode);
		}
	});
};

voice_callback = function(res) {
    console.log("Query: " + res._text);
    if (res.entities) {
		if (res.entities.intent) {
			console.log("Intent: " + res.entities.intent[0].value);
			intentEmitter.emit(res.entities['intent'][0]['value'], res.entities);
		} else if (res.entities.on_off) {
			intentEmitter.emit("on_off", res.entities);
		}
    } else {
		console.log("No entities found");
    }
}

var xxx = 0;
while (xxx++ <100000000);
text_query("Turn on the living room light", voice_callback);
