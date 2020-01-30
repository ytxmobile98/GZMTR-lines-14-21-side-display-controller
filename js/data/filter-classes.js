"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";

import { getServiceType, mapTextListToDests } from "./TRANSLATIONS-DATA.js";

class Filter {
	constructor(line, name, destList, serviceTypeChinese, crossLineServiceTypeChinese) {
		this.line = String(line);
		this.name = String(name);
		this.destinations = mapTextListToDests(String(destList));
		this.serviceType = getServiceType(String(serviceTypeChinese));
		this.crossLineServiceType = getServiceType(String(crossLineServiceTypeChinese));

		Object.freeze(this);
	}

	getLine() {
		return this.line;
	}

	getName() {
		return this.name;
	}
}

export { Filter };
