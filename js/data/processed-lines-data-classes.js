"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";
import { Filter } from "./filter-classes.js";

import { mapTextListToServiceTypes, mapTextListToDests } from "./TRANSLATIONS-DATA.js";

// this class stores the information used by a line
// to be used on destination selector filters and LED display output
class LineInfo {
	constructor(lineName, isPassengerService, destList, serviceTypesList, filters = undefined) {

		this.lineName = String(lineName || "");
		this.isPassengerService = !!(String(isPassengerService).match(/true/gi));
		this.destList = mapTextListToDests(String(destList));
		this.serviceTypes = mapTextListToServiceTypes(String(serviceTypesList));
		this.filters = new Map();

		Object.freeze(this);

		if (filters instanceof Array) {
			this.addFilters(filters);
		}
	}

	addFilter(filter) {
		TypeChecker.checkInstanceOf(filter, Filter);
		this.filters.set(filter.filterName, filter);
	}
}

export { ServiceType, Station, Filter, LineInfo };
