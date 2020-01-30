"use strict";

import { TranslationPair } from "./translation-pairs.js";
import { TypeChecker } from "../type-checker.js";

class Station extends TranslationPair {
	constructor(Chinese, English) {
		super(Chinese, English);
		Object.freeze(this);
	}
}

export { Station };
