"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";

import { RawFilter, Filter } from "./filter-classes.js";

import { SERVICE_TYPES, DESTINATIONS } from "./PROCESSED-TRANSLATIONS-DATA.js";

class LineInfo {
	constructor(line, isPassengerService, destinations, serviceTypes, defaultServiceType, crossLineServiceType, rawFilters) {

		TypeChecker.checkArrayType(destinations, Station);

		TypeChecker.checkArrayType(serviceTypes, ServiceType);
    TypeChecker.checkInstanceOf(defaultServiceType, ServiceType);
    TypeChecker.checkInstanceOf(crossLineServiceType, ServiceType);

		TypeChecker.checkArrayType(rawFilters, RawFilter);

		this.line = String(line || "");
		this.isPassengerService = !!isPassengerService;
		this.destinations = destinations;

		this.serviceTypes = serviceTypes;
		this.defaultServiceType = defaultServiceType;
		this.crossLineServiceType = crossLineServiceType;

		this.filters = new Map();
		rawFilters.forEach((rawFilter) => {
			this.addFilter(rawFilter.name, rawFilter.destinations, rawFilter.serviceType);
		});
	}

	addFilter(name, destinations, serviceType = undefined) {

		TypeChecker.checkArrayType(destinations, "string");

		const line = this.line;
		name = String(name || "");
		destinations = destinations.map((ChineseName) => {
			return DESTINATIONS[ChineseName];
		});
		serviceType = SERVICE_TYPES[serviceType || ""] || this.defaultServiceType;
		const crossLineServiceType = this.crossLineServiceType;

		/* Filter constructor:
			new Filter(line, name, destinations, serviceType, crossLineServiceType);

			Argument types:
				line, name: strings
				destinations: array of Station
				serviceType, crossLineServiceType: ServiceType
		*/
		const newFilter = new Filter(line, name, destinations, serviceType, crossLineServiceType);
		this.filters.set(newFilter.name, newFilter);
	}
}

export { ServiceType, Station, LineInfo, Filter };