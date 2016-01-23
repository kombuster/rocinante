'use strict';
const assert = require('assert');

class Provider {
	constructor(){

	}
}

class Consumer { 
	constructor(provider) {
		this.provider = provider;
	}
}

var register = {
	provider: __filename,
	consumer: __filename
}


module.exports = {

	underTest: { path: './../context', buildWith: [register] },
	

	testConstructorInjector:function(mut) {
		assert(mut, 'module under test is instantiated');
		assert(mut.register, 'register is assigned');
		var instance = mut.build('consumer');
		// var consumer = mut
		// .register(Provider, 'provider')
		// .register(Consumer, 'consumer')
		// .build(Consumer);

		// assert(consumer.provider != null, 'Provider was not assigned');

	}
}