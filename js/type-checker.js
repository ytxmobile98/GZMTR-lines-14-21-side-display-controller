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

	static checkArrayType(array, type) {
		const that = this;

		that.checkInstanceOf(array, Array);
		array.forEach((element) => {
			if (typeof type === "string") {
				that.checkTypeOf(element, type);
			}
			else {
				that.checkInstanceOf(element, type);
			}
		});

		return true;
	}

	static checkIsPrototypeOf(superClass, subClass, errMsg = undefined) {
		if (!(superClass.isPrototypeOf(subClass))) {
			throw new TypeError(errMsg || `ERROR: ${superClass.name} is not a prototype of ${subClass.name}`);
		}
		return true;
	}

}

export { TypeChecker };
