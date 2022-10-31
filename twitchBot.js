const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'jakezsrbot',
		password: 'oauth:98h9ub4lerwsf384kigw8gvqpe31zj'
	},
	channels: [ 'jakezsr' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, heya!`);
	}
});