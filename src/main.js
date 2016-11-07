const config = require('../config');
const tss = require('./tss');
const fs = require('fs');
const voice = require('./voicerecognition');
const intent = require('./intent');
const request = require('request');
const lights = require('./lights');
const express = require('express');

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

callback = function(res) {
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

// TODO: break this out and turn it into a real module
var app = express();

app.get('/', (req, res) => {
	res.send('Ava status page');
});

// TODO: basic authentication
app.post('/trigger', (req, res) => {
	console.log("Voice trigger");
	voice.start(callback);
	res.end();
});

app.listen(8080, () => {});
