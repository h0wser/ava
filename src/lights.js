const config = require('../config');
const hue = require('node-hue-api');

var api = new hue.HueApi();

var bridge_ip;

basic_callback = function(err, res) {
	if (err)
		console.log(err);
}

register_user = function() {
	api.createUser(bridge_ip, (err, user) => {
		if (err)
			console.log("You must press the link button on the bridge before running!");
		else {
			console.log("Put this in the hue_user field of config.json and restart");
			console.log(user);
			process.exit(0);
		}
	});
}

init = function() {
	hue.nupnpSearch((err, result) => {
		if (err) {
			throw err;
		}

		bridge_ip = result[0].ipaddress;
		console.log("Hue bridge IP: " + bridge_ip);

		if (!config.hue_user) {
			console.log("No hue user detected, generating");
			register_user();
		}

		api = new hue.HueApi(bridge_ip, config.hue_user);
		api.lights((err, result) => {
			if (err) throw err;
			console.log(JSON.stringify(result, null, 2));
		});
	});
}

on_off_callback = function(entities) {
	var light_state = hue.lightState.create();
	if (entities.
	light_state.off();
	api.setLightState(4, light_state, basic_callback);
}

module.exports = {
	init: init,
	on_off_callback: on_off_callback
};
