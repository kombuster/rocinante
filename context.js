'use strict';
const readline = require('readline');
const fs = require('fs');
const S = require('string');

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
			var className = classRef.substring(0,1).toUpperCase() + classRef.substring(1, classRef.length);
			var regex = new RegExp('(?:^|\s)class ' + className);
			var constructorRegex = /(?:^|\s)constructor\s?\(/;
			var reader = readline.createInterface( { input: fs.createReadStream(this.map[classRef].source) } );
			var search = line =>  {
  			if (line.match(regex)) {
  				//console.log(line);
  				search = line => {
  					if (line.match(constructorRegex)) {
  						//console.log(line);
  						var args = S(line).between('(', ')').s.split(',').map(s => { 
  							var key = s.trim();
  							if (!key) {
  								return null;
  							}
  							//console.log('looking for:', key);
  							return this.build(s.trim()); 
  						});
  						return true;
  					} 
  				};
  			}
  			return false;
			};
			reader.on('line', line => {
				if (search && search(line)) {
					search = null;
					reader.close();
				}
			});
			var type = require(this.map[classRef].source);
			this.map[classRef].instance = new type(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);

		}
		return this;
	}
}


module.exports = Context;