"use strict";

import { TypeChecker } from "../type-checker.js";
import { RawFilter } from "./filter-classes.js"

class RawLineInfo {
	constructor(line, destinations, serviceTypes, defaultServiceType, crossLineServiceType, rawFilters) {

		TypeChecker.checkTypeOf(line, "string");
		TypeChecker.checkArrayType(destinations, "string");

		TypeChecker.checkArrayType(serviceTypes, "string");
		TypeChecker.checkTypeOf(defaultServiceType, "string");
		TypeChecker.checkTypeOf(crossLineServiceType, "string");

		TypeChecker.checkArrayType(rawFilters, RawFilter);

		this.line = line;
		this.destinations = destinations;

		this.serviceTypes = serviceTypes;
		this.defaultServiceType = defaultServiceType;
		this.crossLineServiceType = crossLineServiceType;

		this.rawFiters = rawFilters;
	}
}

export { RawLineInfo };
