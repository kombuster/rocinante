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
	

	testConstructorInjector:function(ctx) {
		assert(ctx, 'module under test is instantiated');
		assert(ctx.register, 'register is assigned');
		var instance = ctx.build('consumer');

		// var consumer = mut
		// .register(Provider, 'provider')
		// .register(Consumer, 'consumer')
		// .build(Consumer);

		// assert(consumer.provider != null, 'Provider was not assigned');

	}
}