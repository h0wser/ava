const record = require('node-record-lpcm16');
const request = require('request');
const config = require('../config');
const fs = require('fs'); // for testing

// The callback will receive the json response as a parameter
start_voice_recognition = function(callback) {
    record.start().pipe(request.post({
		url: 'https://api.wit.ai/speech',
		headers: {
			'Content-Type': 'audio/wav',
			'Authorization': 'Bearer ' + config.witai_client_token
		},
		qs: {
			v: '20160526'
		}
    }, (err, res, body) => {
		console.log("In voice recon request callback");
		if (err) {
			console.log(err);
		} else {
			if (res.statusCode == 200) {
				callback(JSON.parse(body));
			} else {
				console.log("Something goofed voice recognition");
			}
		}
    }));
}

module.exports = {
    start: start_voice_recognition
}
