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

	static checkOptionalTypeOf(obj, type, errMsg = undefined) {
		if (obj != undefined) {
			return this.checkTypeOf(obj, type, errMsg);
		}
		return true;
	}

	static checkInstanceOf(obj, type, errMsg = undefined) {
		if (!(obj instanceof type)) {
			throw new TypeError(errMsg || `ERROR: ${obj} is not of type ${type.name}`);
		}
		return true;
	}

	static checkOptionalInstanceOf(obj, type, errMsg = undefined) {
		if (obj != undefined) {
			return this.checkInstanceOf(obj, type, errMsg);
		}
		return true;
	}

	static checkArrayType(arr, type) {
		this.checkInstanceOf(arr, Array);
		arr.forEach((element) => {
			if (typeof type === "string") {
				this.checkTypeOf(element, type);
			}
			else {
				this.checkInstanceOf(element, type);
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
