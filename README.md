# Rocinante
* Super lazy minimalist IOC container for node v5.5.
* Specifically designed to support ES6 classes
* Supports constructor injection and property autowiring

```javascript

const ctx = require('rocinante').create(__dirname);

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


ctx
	// use external module
	.register('./../loader')
	.inject(ctx.provider, {}, './some_file_somewhere');


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

// get an instance from the context
var que = ctx.que;

//do something with it
que.importantMethod();

```