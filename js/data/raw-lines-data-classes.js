"use strict";

import { TypeChecker } from "../type-checker.js";
import { RawFilter } from "./filter-classes.js"

class RawLineInfo {
	constructor(line, isPassengerService, destinations, serviceTypes, defaultServiceType, crossLineServiceType, rawFilters) {

		TypeChecker.checkArrayType(destinations, "string");
		TypeChecker.checkArrayType(serviceTypes, "string");
		TypeChecker.checkArrayType(rawFilters, RawFilter);

		this.line = String(line || "");
		this.isPassengerService = !!isPassengerService;
		this.destinations = destinations;

		this.serviceTypes = serviceTypes;
		this.defaultServiceType = String(defaultServiceType || "");
		this.crossLineServiceType = String(crossLineServiceType || "");

		this.rawFiters = rawFilters;
	}
}

export { RawLineInfo };
