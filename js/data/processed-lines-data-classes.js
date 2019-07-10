"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";

import { RawFilter, Filter } from "./filter-classes.js";

import { SERVICE_TYPES, DESTINATIONS, LINES_INFO } from "./PROCESSED-LINES-DATA.js";

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

class LineInfoWrapper {
	constructor() {
		throw new Error(`LineInfoWrapper may not be instantiated`);
	}

	// Fundamental service info: destination and service type

	static getDestination(destNameChinese) {
		const destination = DESTINATIONS[destNameChinese];
		TypeChecker.checkOptionalInstanceOf(destination, Station);
		return destination;
	}

	static getDefaultDest() {
		return this.getDestination("不载客");
	}

	static getServiceType(serviceTypeChinese) {
		const serviceType = SERVICE_TYPES[serviceTypeChinese];
		TypeChecker.checkOptionalInstanceOf(serviceType, ServiceType);
		return serviceType;
	}

	static getDefaultServiceType() {
		return this.getServiceType("不载客");
	}

	// Get line information

	static getLineInfo(line) {
		const lineInfo = LINES_INFO.get(line);
		TypeChecker.checkOptionalInstanceOf(lineInfo, LineInfo);
		return lineInfo;
	}

	static checkPassengerService(line) {
		const lineInfo = this.getLineInfo(line);
		return !!(lineInfo && lineInfo.isPassengerService);
	}

	static getLineFilters(line) {
		const lineInfo = this.getLineInfo(line);
		const filters = (lineInfo == undefined) ?
			undefined : lineInfo.filters;
		TypeChecker.checkOptionalInstanceOf(filters, Map);
		return filters;
	}

	static getLineServiceTypes(line) {
		const lineInfo = this.getLineInfo(line);
		const serviceTypes = (lineInfo == undefined) ?
			undefined : lineInfo.serviceTypes;
		TypeChecker.checkOptionalInstanceOf(serviceTypes, Array);
		return serviceTypes;
	}

	// Get filter information

	static getFilter(line, filterName) {
		const filters = this.getLineFilters(line);
		const filter = (filters == undefined) ?
			undefined : filters.get(filterName);
		TypeChecker.checkOptionalInstanceOf(filter, Filter);
		return filter;
	}

	static getFilterServiceType(line, filterName) {
		const filter = this.getFilter(line, filterName);
		const serviceType = (filter == undefined) ?
			undefined : filter.serviceType;
		TypeChecker.checkOptionalInstanceOf(serviceType, ServiceType);
		return serviceType;
	}

	static getFilterCrossLineServiceType(line, filterName) {
		const filter = this.getFilter(line, filterName);
		const crossLineServiceType = (filter == undefined) ?
			undefined : filter.crossLineServiceType;
		TypeChecker.checkOptionalInstanceOf(crossLineServiceType, ServiceType);
		return crossLineServiceType;
	}
}

export { ServiceType, Station, LineInfo, Filter, LineInfoWrapper };
