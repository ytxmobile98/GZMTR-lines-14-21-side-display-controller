"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";

import { getServiceType, mapTextListToDests } from "./TRANSLATIONS-DATA.js";

// this class stores the information for a filter
// filters appear on the destination selector, so that the train conductors can more easily get the list of the most commonly selected destinations, and then tap on the destination they want to display
class Filter {
	constructor(lineName, filterName, destList, serviceTypeChinese, crossLineServiceTypeChinese) {
		this.lineName = String(lineName);
		this.filterName = String(filterName);
		this.destinations = mapTextListToDests(String(destList));
		this.serviceType = getServiceType(String(serviceTypeChinese));
		this.crossLineServiceType = getServiceType(String(crossLineServiceTypeChinese));

		Object.freeze(this);
	}

	getLineName() {
		return this.lineName;
	}

	getFilterName() {
		return this.filterName;
	}
}

export { Filter };
