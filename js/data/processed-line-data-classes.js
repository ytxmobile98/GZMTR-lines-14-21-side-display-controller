"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType } from "./service-type-classes.js";

import { Filter } from "./filters.js";

class LineInfo {
	constructor(line, serviceTypes, defaultServiceType, defaultCrossLineServiceType, destinations) {

		TypeChecker.checkTypeOf(line, "string");

		TypeChecker.checkArrayType(serviceTypes, ServiceType);

    TypeChecker.checkInstanceOf(defaultServiceType, ServiceType);
    TypeChecker.checkInstanceOf(crossLineServiceType, ServiceType);

    TypeChecker.checkArrayType(destinations, Station);

		this.filters = new Map();
	}

	addFilter(filterName, destinations, serviceType) {

	}
}
