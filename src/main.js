const api_ai = require('apiai');
const config = require('../config');
const tss = require('./tss');
const fs = require('fs');
const voice = require('./voicerecognition');
const intent = require('./intent');
const request = require('request');

intentEmitter = new intent();

intentEmitter.on('bedtime', (entities) => {
    console.log("bedtime event fired");
});

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
		}
    } else {
		console.log("No entities found");
    }
}

text_query("Set the brightness in the kitchen to 20", voice_callback);
