'use strict';

const readline = require('readline');
const fs = require('fs');
const S = require('string');
const assert = require('assert');

var descriptors = {};


class TypeDescriptor {
	
	constructor(type, ctx, typeInfo) {
		this.ctx = ctx;
		this.type = type;
		this.typeInfo = typeInfo;
	}

	inject() {
		this._inject = Array.from(arguments);
		if (!this._inject.length) {
			//use ctor parameters to inject
			this._inject = this.typeInfo.constructorParameterNames.map(name => {
				var descriptor = descriptors[name];
				assert(descriptor, 'descriptor not found when injecting ' + name);
				return descriptor.resolveShared();
			});
		}
		return this;
	}

	autowire() {
		this._autowire = Array.from(arguments);
		return this;
	}

	resolveShared() {
		if (this._instance) {
			return this._instance;
		}

		//total hack
		if (this._inject) {
			this._instance = new this.type(this._inject[0], this._inject[1], this._inject[2], this._inject[3], this._inject[4]);
		} else {
			this._instance = new this.type();
		}
		
		this._instance.descriptor = this;

		if (this._autowire) {
			for(let obj of this._autowire) {
				var key = obj.descriptor.typeInfo.key;
				this._instance[key] = obj;
			}
		}

		return this._instance;
	}

}

function processType(type) {
	var lines = (type + '').split('\n');
	var constructorRegex = /(?:^|\s)constructor\s?\(/;	
	var className = lines[0].trim().split(' ')[1];
	var camelized = className.substring(0,1).toLowerCase() + className.substring(1, className.length);
	for(let line of lines) {
		if (line.match(constructorRegex)) {
			var constructorParameterNames = S(line).between('(',')').s.split(',').map(s => s.trim());
		}
	}

	return { className, camelized, constructorParameterNames };
}

class Context {
	register(type, key) {
		var typeInfo = processType(type);
		key = key || typeInfo.camelized;
		typeInfo.key = key;
		assert(descriptors[key] == null, 'key ' + key + ' is already in use');
		var descriptor = new TypeDescriptor(type, this, typeInfo);
		descriptors[key] = descriptor;
		Object.defineProperty(this, key, {
			get:function() {
				var descriptor = descriptors[key];
				assert(descriptor, 'requested key ' + key + ' is not registered');
				return descriptor.resolveShared();
			},
			set:function(newValue) {

			}
		});
		return descriptor;
	}

	status() {
		console.log('hi');
	}
}

const ctx = new Context();

module.exports = ctx;