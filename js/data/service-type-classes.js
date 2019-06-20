"use strict";

import { TranslationPairs } from "./translation-pairs.js";
import { TypeChecker } from "../type-checker.js";

class ServiceType extends TranslationPairs {
	constructor(Chinese, English) {
		super(Chinese, English);
		Object.freeze(this);
	}
}

class ServiceTypeList {
	constructor(...serviceTypes) {
		const that = this;
		serviceTypes.forEach((serviceType) => {
			TypeChecker.checkInstanceOf(serviceType, ServiceType);
			that[serviceType.Chinese] = serviceType;
		})
	}
}

export { ServiceType, ServiceTypeList };
