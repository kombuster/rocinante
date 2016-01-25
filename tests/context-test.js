'use strict';
const assert = require('assert');
const ctx = require('./../index');

class Provider {
	constructor(){ }
}
// this will register class under camelized class name
// the instance will be available via ctx.provider
ctx.register(Provider);

class Consumer { 
	constructor(provider) {
		this.provider = provider;
	}
}

ctx
	.register(Consumer)
	// inject provider object into the constructor
	.inject(ctx.provider);

class MagiQ {
	
	constructor() { }
	
	importantMethod() {
		assert(this.provider, 'should have a provider');
		assert(this.consumer, 'should have a consumer');
	}
}

ctx
	//override default registration key
	.register(MagiQ, "que")
	// autowire these properties, so they could be 
	// used by class methods  
	.autowire(ctx.provider, ctx.consumer);

class SuperLazy {
	constructor(provider, consumer, que) {
		this.provider = provider;
		this.consumer = consumer;
		this.que = que;
	}
}

ctx.register(SuperLazy)
	// this will inject dependencies inferred from constructor 
	// parameter names
	.inject(); 

module.exports = {

	underTest: { path: './../index' },
	

	testInjectorAndAutowire:function() {
		assert(ctx, 'module under test is instantiated');
		assert(ctx.provider, 'provider should have been created');
		assert(ctx.consumer, 'consumer should have been created');
		assert(ctx.consumer.provider, 'provider in consumer should have been injected');
		assert(ctx.que, 'que should have been created');
		assert(ctx.que.provider, 'provider should have been autowired');
		assert(ctx.que.consumer, 'consumer should have been autowired');
		assert(ctx.superLazy && ctx.superLazy.provider && ctx.superLazy.consumer && ctx.superLazy.que);

	}
}