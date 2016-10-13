// Module for using api.ai's text-to-speech service
// Downloads wav file and saves it in <config.audio_dir>/output.wav

var request = require('request');
var config = require('./config');
var fs = require('fs');

var endpoint = "https://api.api.ai/v1/tts";
var v = '20150910';

var options = {
    url: endpoint,
    encoding: null,
    headers: {
	'Authorization': 'Bearer' + config.client_token,
	'Accept-Language': 'en-US'
    },
    qs: {
	v: v,
	text: ''
    }
};

var callback = function(error, res, body) {
    if (error) {
	console.log(error);
    } else {
	console.log(typeof body);
	fs.writeFile(config.audio_dir + "output.wav", body, (err) => {
	    if (err)
		console.log(err);
	});
    }
}

var getSpeech = function(string) {
    if (string) {
	options.qs.text = string;
    } else {
	return;
    }

    request(options, callback);
}

module.exports = {
    getSpeech: getSpeech
};
