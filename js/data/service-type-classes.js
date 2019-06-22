"use strict";

import { TranslationPairs } from "./translation-pairs.js";
import { TypeChecker } from "../type-checker.js";

class ServiceType extends TranslationPairs {
	constructor(Chinese, English) {
		super(Chinese, English);
		Object.freeze(this);
	}
}

class ServiceTypesObj {
	constructor(serviceTypes) {
		const that = this;
		TypeChecker.checkInstanceOf(serviceTypes, Array);
		serviceTypes.forEach((serviceType) => {
			TypeChecker.checkInstanceOf(serviceType, ServiceType);
			that[serviceType.Chinese] = serviceType;
		});
	}

	checkServiceType(serviceTypeStr) {
		if (!(this.hasOwnProperty(serviceTypeStr))) {
			throw new Error(`${serviceTypeStr} is not a avalid service type`);
		}
		return true;
	}
}

export { ServiceType, ServiceTypesObj };
