"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, Station, LineInfo } from "./processed-lines-data-classes.js";
import { Filter } from "./filter-classes.js";

import { makeRequest } from "./make-XMLHttpRequest.js";
import { parseDataFields } from "./parse-data-fields.js";
import { readTranslationsData, getServiceType, getDestination } from "./TRANSLATIONS-DATA.js";

const LINES_INFO = new Map();

// initial loading, read data from external data file
const loadLinesInfo = async () => {
	// get basic information about the lines
	await (async () => {
		// read in data for each line
		const linesBasicInfoText = await makeRequest("RAW-DATA/LINES-BASIC-INFO.tsv");
		const linesBasicInfo = parseDataFields(linesBasicInfoText);
		// convert basic info into structured data
		// argument order: line, isPassengerService, destList, serviceTypesList, filters
		linesBasicInfo.forEach((item) => {
			const newLineInfo = new LineInfo(...(item.slice(0, 4)));
			LINES_INFO.set(item[0], newLineInfo);
		});
	})();

	// get filters data
	await (async () => {
		// read in data for filters
		const linesFiltersText = await makeRequest("RAW-DATA/LINES-FILTERS.tsv");
		const linesFiltersData = parseDataFields(linesFiltersText);
		// create filters and add them to each line
		linesFiltersData.forEach((item) => {
			const newFilter = new Filter(...(item.slice(0, 5)));
			const line_name = newFilter.getLineName();
			LINES_INFO.get(line_name).addFilter(newFilter);
		})
	})();

	// ensure that the data are read in properly
	Object.freeze(LINES_INFO);
	console.info(`LINES_INFO: `, LINES_INFO);
};

// interfaces for getting info for individual lines
// NOTE: all members are static functions; instantiation of this object type is NOT allowed
class LineInfoWrapper {

	constructor() {
		throw new Error(`LineInfoWrapper may not be instantiated`);
	}

	// Fundamental service info: destination and service type

	static getDefaultLine() {
		return "不载客";
	}

	static getDestination(destNameChinese) {
		const destination = getDestination(destNameChinese);
		TypeChecker.checkOptionalInstanceOf(destination, Station);
		return destination;
	}

	static getDefaultDest() {
		return this.getDestination("不载客");
	}

	static getServiceType(serviceTypeChinese) {
		const serviceType = getServiceType(serviceTypeChinese);
		TypeChecker.checkOptionalInstanceOf(serviceType, ServiceType);
		return serviceType;
	}

	static getDefaultServiceType() {
		return this.getServiceType("不载客");
	}

	// Get line information

	static getLines() {
		const lines = Array.from(LINES_INFO.keys());
		return lines;
	}

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

export { loadLinesInfo, LineInfoWrapper };
