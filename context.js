'use strict';
const readline = require('readline');
class Context {
	constructor(register) {
		this.register = register;
		this.map = {};
		for(var key in this.register) {
			this.map[key] = {
				source: this.register[key],
				instance: null
			}
		}
	}

	build(classRef) {
		if(this.map[classRef].instance) {
			console.log('already have instance');
			return instance;
		} else {

			var reader = readline.createInterface( { input: fs.createReadStream(this.map[classRef].source) } );
			reader.on('line', line => {
				console.log(line);
			});

			var type = require(this.map[classRef].source);

		}
		return this;
	}
}


module.exports = Context;