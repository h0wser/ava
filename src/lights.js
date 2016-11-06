const config = require('../config');
const hue = require('node-hue-api');

var bridge_ip;

init = function() {
	hue.nupnpSearch((err, result) => {
		if (err) {
			throw err;
		}
		bridge_ip = result[0].ipaddress;
		console.log("Hue bridge IP: " + bridge_ip);
	});
}

on_off_callback = function(entities) {
	console.log("on off callback");
}

module.exports = {
	init: init,
	on_off_callback: on_off_callback
};
