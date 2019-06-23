"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType } from "./service-type-classes.js";
import { RawFilter, Filter } from "./filter-classes.js";

import { SERVICE_TYPES, DESTINATIONS } from "./PROCESSED-LINES-DATA.js";

class LineInfo {
	constructor(line, serviceTypes, defaultServiceType, defaultCrossLineServiceType, destinations, rawFilters) {

		TypeChecker.checkTypeOf(line, "string");
		TypeChecker.checkArrayType(serviceTypes, ServiceType);
    TypeChecker.checkInstanceOf(defaultServiceType, ServiceType);
    TypeChecker.checkInstanceOf(crossLineServiceType, ServiceType);
    TypeChecker.checkArrayType(destinations, Station);
		TypeChecker.checkArrayType(rawFilters, Filter);

		const that = this;

		that.line = line;
		that.serviceTypes = serviceTypes;
		that.defaultServiceType = defaultServiceType;
		that.crossLineServiceType = crossLineServiceType;
		that.destinations = destinations;

		that.filters = new Map();
		rawFilter.forEach((rawFilter) => {
			that.addFilter(rawFilter.name, rawFilter.destinations, rawFilter.serviceType);
		});

		console.log(that);
	}

	addFilter(name, destinations, serviceType = undefined) {

		TypeChecker.checkTypeOf(name, "string");
		TypeChecker.checkArrayType(destinations, "string");
		if (serviceType !== undefined) {
			TypeChecker.checkTypeOf(serviceType, "string");
		}

		const that = this;

		/* Filter Constructor:
			new Filter(line, name, destinations, serviceType, crossLineServiceType);
		*/
		const line = that.line;
		destinations = that.destinations.map((ChineseName) => {
			return DESTINATIONS[ChineseName];
		});
		serviceType = SERVICES[serviceType || that.defaultServiceType];
		crossLineServiceType = SERVICES[that.crossLineServiceType];

		const newFilter = new Filter(line, name, destinations, serviceType, crossLineServiceType);
		that.filters.set(newFilter.name, newFilter);
	}
}

export { LineInfo };
