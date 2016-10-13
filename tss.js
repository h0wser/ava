// Module for using api.ai's text-to-speech service
// Downloads wav file and saves it in <config.audio_dir>/output.wav

const request = require('request');
const config = require('./config');
const fs = require('fs');
const play = require('audio-play');
const load = require('audio-loader');

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
	fs.writeFileSync(config.audio_dir + "output.wav", body);
	load(config.audio_dir + "output.wav").then(play);
    }
}

// Gets a string of text and plays the text using api.ai
var playText = function(string) {
    if (string) {
	options.qs.text = string;
    } else {
	return;
    }

    request(options, callback);
}

module.exports = {
    playText: playText
};
