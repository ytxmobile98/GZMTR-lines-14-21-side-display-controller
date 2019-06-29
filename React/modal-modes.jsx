"use strict";

import { TypeChecker } from "../type-checker.js";

const MODAL_MODE_NAMES = ["standby", "setDisplayMode", "setDestination"];
const MODAL_MODES = Object.freeze(new (function() {
	TypeChecker.checkArrayType(MODAL_MODE_NAMES, "string");
	const that = this;
	MODAL_MODE_NAMES.forEach((name) => {
		that[name] = Symbol();
	})
})());
console.log(`MODAL MODES: `, MODAL_MODES);

export { MODAL_MODES };
