const config = require('../config');
const hue = require('node-hue-api');

var api = new hue.HueApi();

var bridge_ip;
var light_map = {};

function basic_callback(err, res) {
	if (err)
		console.log(err);
}

function create_light_mapping(lights) {
	ls = lights.lights;

	for (i in lights.lights) {
		light_map[ls[i].name] = ls[i].id;
	}
}

function register_user () {
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

function init() {
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
			if (err) {
				throw err;
			}
			create_light_mapping(result);
		});
	});
}

function on_off_callback(entities) {
	var light_state = hue.lightState.create();
	var id;

	if (entities.device_group) {
		id = light_map[entities.device_group[0].value];
	} else {
		console.log("No device_group");
		return;
	}

	if (entities.on_off[0].value == 'on')
		light_state.on();
	else if (entities.on_off[0].value == 'off')
		light_state.off();

	api.setLightState(id, light_state, basic_callback);
}

module.exports = {
	init: init,
	on_off_callback: on_off_callback
};
