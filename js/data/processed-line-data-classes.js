"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType } from "./service-type-classes.js";
import { Filter } from "./filter-classes.js";

class LineInfo {
	constructor(line, serviceTypes, defaultServiceType, defaultCrossLineServiceType, destinations, filters) {

		TypeChecker.checkTypeOf(line, "string");

		TypeChecker.checkArrayType(serviceTypes, ServiceType);

    TypeChecker.checkInstanceOf(defaultServiceType, ServiceType);
    TypeChecker.checkInstanceOf(crossLineServiceType, ServiceType);

    TypeChecker.checkArrayType(destinations, Station);

		TypeChecker.checkArrayType(filters, Filter);

		this.line = line;
		this.serviceTypes = serviceTypes;
		this.defaultServiceType = defaultServiceType;
		this.crossLineServiceType = crossLineServiceType;
		this.destinations = destinations;

		this.filters = new Map(
			filters.map((filter) => {
				return [filter.name, filter];
			})
		);
	}

	addFilter(filterName, serviceType, destinations) {

	}
}
