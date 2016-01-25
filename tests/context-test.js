'use strict';
const assert = require('assert');
const ctx = require('./../context');


class Provider {
	constructor(){ }
}
ctx.register(Provider);

class Consumer { 
	constructor(provider) {
		this.provider = provider;
	}
}

ctx
	.register(Consumer)
	.inject(ctx.provider);

class MagiQ {
	constructor(){ }
	importantMethod() {
		assert(this.provider, 'should have a provider');
		assert(this.consumer, 'should have a consumer');
	}
}

ctx
	.register(MagiQ, "que")
	.autowire(ctx.provider, ctx.consumer);



module.exports = {

	underTest: { path: './../context' },
	

	testInjectorAndAutowire:function() {
		assert(ctx, 'module under test is instantiated');
		assert(ctx.provider, 'provider should have been created');
		assert(ctx.consumer, 'consumer should have been created');
		assert(ctx.consumer.provider, 'provider in consumer should have been injected');
		assert(ctx.que, 'que should have been created');
		assert(ctx.que.provider, 'provider should have been autowired');
		assert(ctx.que.consumer, 'consumer should have been autowired');

	}
}