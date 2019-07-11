"use strict";

import { TypeChecker } from "../type-checker.js";

import { RawLineInfo, RawFilter } from "./raw-lines-data-classes.js";
import { RAW_LINES_INFO } from "./RAW-LINES-DATA.js";

import { ServiceType, Station, LineInfo } from "./processed-lines-data-classes.js";
import { getServiceType, getDestination } from "./processed-translations-getter.js";

// Processed data

const LINES_INFO = Object.freeze((() => {

	TypeChecker.checkArrayType(RAW_LINES_INFO, RawLineInfo);

	const LINES_INFO = new Map();

	RAW_LINES_INFO.forEach((rawLineInfo) => {

		const line = rawLineInfo.line;
		const isPassengerService = !!rawLineInfo.isPassengerService;
		const destinations = rawLineInfo.destinations.map((ChineseName) => {
			return getDestination(ChineseName);
		});

		const serviceTypes = rawLineInfo.serviceTypes.map((ChineseName) => {
			return getServiceType(ChineseName);
		});
		const defaultServiceType = getServiceType(rawLineInfo.defaultServiceType);
		const crossLineServiceType = getServiceType(rawLineInfo.crossLineServiceType);

		const rawFilters = rawLineInfo.rawFiters;

		/* LineInfo constructor:
			new LineInfo(line, isPassengerService, destinations, serviceTypes, defaultServiceType, crossLineServiceType, rawFilters)

			Argument types:
				line: string
				isPassengerService: boolean
				destinations: array of Statiion
				serviceTypes: array of ServiceType
				defaultServiceType, crossLineServiceType: ServiceType
				rawFilters: array of RawFilter
		*/
		const newLineInfo = new LineInfo(line, isPassengerService, destinations, serviceTypes, defaultServiceType, crossLineServiceType, rawFilters);

		LINES_INFO.set(line, newLineInfo);
	});

	console.log(`LINES_INFO: `, LINES_INFO);

	return LINES_INFO;

})());

export { ServiceType, Station, LineInfo, LINES_INFO };
