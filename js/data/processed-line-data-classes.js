"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";
import { RawFilter, Filter } from "./filter-classes.js";

import { SERVICE_TYPES, DESTINATIONS } from "./PROCESSED-LINES-DATA.js";

class LineInfo {
	constructor(line, destinations, serviceTypes, defaultServiceType, crossLineServiceType, rawFilters) {

		TypeChecker.checkTypeOf(line, "string");
		TypeChecker.checkArrayType(destinations, Station);

		TypeChecker.checkArrayType(serviceTypes, ServiceType);
    TypeChecker.checkInstanceOf(defaultServiceType, ServiceType);
    TypeChecker.checkInstanceOf(crossLineServiceType, ServiceType);

		TypeChecker.checkArrayType(rawFilters, RawFilter);

		const that = this;

		that.line = line;
		that.destinations = destinations;

		that.serviceTypes = serviceTypes;
		that.defaultServiceType = defaultServiceType;
		that.crossLineServiceType = crossLineServiceType;

		that.filters = new Map();
		rawFilters.forEach((rawFilter) => {
			that.addFilter(rawFilter.name, rawFilter.destinations, rawFilter.serviceType);
		});
	}

	addFilter(name, destinations, serviceType = undefined) {

		TypeChecker.checkTypeOf(name, "string");
		TypeChecker.checkArrayType(destinations, "string");
		if (serviceType !== undefined) {
			TypeChecker.checkTypeOf(serviceType, "string");
		}

		const that = this;

		/* Filter constructor:
			new Filter(line, name, destinations, serviceType, crossLineServiceType);

			Argument types:
				line, name: strings
				destinations: array of type Station
				serviceType, crossLineServiceType: ServiceType
		*/

		const line = that.line;;
		destinations = destinations.map((ChineseName) => {
			return DESTINATIONS[ChineseName];
		});

		serviceType = SERVICE_TYPES[serviceType] || that.defaultServiceType;
		const crossLineServiceType = that.crossLineServiceType;

		const newFilter = new Filter(line, name, destinations, serviceType, crossLineServiceType);
		that.filters.set(newFilter.name, newFilter);
	}
}

export { LineInfo };
