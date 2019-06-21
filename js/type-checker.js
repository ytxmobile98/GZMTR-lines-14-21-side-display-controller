"use strict";

class TypeChecker {
	constructor() {
		throw new Error(`TypeChecker may not be instantiated`);
	}

	static checkTypeOf(obj, type, errMsg = undefined) {
		if (!(typeof obj === type)) {
			throw new TypeError(errMsg || `ERROR: ${obj} is not of type ${type}`);
		}
		return true;
	}

	static checkInstanceOf(obj, type, errMsg = undefined) {
		if (!(obj instanceof type)) {
			throw new TypeError(errMsg || `ERROR: ${obj} is not of type ${type.name}`);
		}
		return true;
	}
}

export { TypeChecker };
