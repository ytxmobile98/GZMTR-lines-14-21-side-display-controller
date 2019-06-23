"use strict";

import { TranslationPair } from "./translation-pairs.js";
import { TypeChecker } from "../type-checker.js";

class ServiceType extends TranslationPair {
	constructor(Chinese, English) {
		super(Chinese, English);
		Object.freeze(this);
	}
}

export { ServiceType };
