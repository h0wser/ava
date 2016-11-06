const EventEmitter = require('events');

// Might be overkill to extend this
// but it will simplify later if we need to
// add things.
class intentEmitter extends EventEmitter {

    // Prints all the intents that have registered listeners
    listIntents() {
	console.log("Currently handled intents:");
	var x = this.eventNames();
		for (var i in x) {
			console.log(x[i]);
		}
    }
}

module.exports = intentEmitter;
