"use strict";

import { TypeChecker } from "../type-checker.js";
import { RawFilter } from "./filter-classes.js"

class RawLineInfo {
	constructor(line, serviceTypes, defaultServiceType, crossLineServiceType, destinations, rawFilters) {
		TypeChecker.checkTypeOf(line, "string");
		TypeChecker.checkArrayType(serviceTypes, "string");
		TypeChecker.checkTypeOf(defaultServiceType, "string");
		TypeChecker.checkTypeOf(crossLineServiceType, "string");
		TypeChecker.checkArrayType(destinations, "string");
		TypeChecker.checkArrayType(rawFilters, RawFilter);

		this.line = line;
		this.serviceTypes = serviceTypes;
		this.defaultServiceType = defaultServiceType;
		this.crossLineServiceType = crossLineServiceType;
		this.destinations = destinations;
		this.rawFiters = rawFilters;
	}
}

export { RawLineInfo };
