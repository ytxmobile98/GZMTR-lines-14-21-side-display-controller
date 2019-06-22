"use strict";

import { TranslationPair, TranslationsObj } from "./translation-pairs.js";
import { TypeChecker } from "../type-checker.js";

class ServiceType extends TranslationPair {
	constructor(Chinese, English) {
		super(Chinese, English);
		Object.freeze(this);
	}
}

class ServiceTypesObj extends TranslationsObj {
	
	checkServiceType(serviceTypeStr) {
		if (!(this.hasOwnProperty(serviceTypeStr))) {
			throw new Error(`${serviceTypeStr} is not a avalid service type`);
		}
		return true;
	}
}

export { ServiceType, ServiceTypesObj };
