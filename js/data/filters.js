"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";

import { DESTINATIONS_BY_LINE } from "./DESTINATIONS.js";
import { SERVICE_TYPES } from "./SERVICES.js";

class RawFilter {
  constructor(name, stationNames, serviceTypeStr = undefined) {
    TypeChecker.checkTypeOf(name, "string");
    this.name = name;
    this.stationNames = stationNames;
    if (typeof serviceTypeStr === "string") {
      SERVICE_TYPES.checkServiceType(serviceTypeStr);
    }
    this.serviceTypeStr = serviceTypeStr;
  }
}

class Filter {
  constructor(line, serviceType, crossLineServiceType, destinations) {
    TypeChecker.checkTypeOf(line, "string");

    TypeChecker.checkInstanceOf(serviceType, ServiceType);
    TypeChecker.checkInstanceOf(crossLineServiceType, ServiceType);

    TypeChecker.checkArrayType(destinations, Station);

    this.line = line;
    this.defaultServiceType = serviceType;
    this.crossLineServiceType = crossLineServiceType'
    this.destinations = destinations;

    console.log(this);
  }
}

class LineFiltersMap extends Map {
  constructor(line, ...filters) {
    super();

    const that = this;

    filters.forEach((filter) => {
      TypeChecker.checkInstanceOf(filter, Filter);
      if (!((DESTINATIONS_BY_LINE.hasOwnProperty(line)) && (line === filter.line))) {
        throw new Error("${line} is not a valid line");
      }
      that.set(filter.name, filter);
    });
  }
}

class FilterList extends Map {
  constructor(line, isPassengerService, rawFilters) {
    /* Format of arguments:
      line: "14号线",
      isPassengerService: true | false,
      rawFiters: [
        // MUST BE CONSTRUCTED USING:
          new RawFilter(name, stationNames, serviceType)
        {
          name: "全部",
          stationNames: ["一号站", "二号站", "三号站", "四号站", ...],
          serviceType: "快速", // this key is optional, value in Chinese
        },
        {
          name: "快速",
          stationNames: ["一号站", "五号站", "十号站", "二十号站", ...],
        },
        ...
      ]
    */

    TypeChecker.checkTypeOf(line, "string");

    super();

    const that = this;
		that.line = line;

    const defaultServiceType = "普通";
    const defaultCrossLineServiceType = "特别服务";
    const deadMileageServiceType = "不载客";
    that.defaultServiceType = isPassengerService ? defaultServiceType : deadMileageServiceType;
    that.defaultCrossLineServiceType = isPassengerService ? defaultCrossLineServiceType : deadMileageServiceType;

    rawFilters.forEach((rawFilter) => {
      TypeChecker.checkInstanceOf(rawFilter, RawFilter);
      let filter = new Filter(line, rawFilter);
      that.set(rawFilter.name, filter);
    });

		Object.freeze(that);
  }
}

class FullServiceList extends Map {
	constructor(...filterLists) {

    TypeChecker.checkInstanceOf(filterLists, Array);

		super();

		const that = this;

		filterLists.forEach((filterList) => {
			TypeChecker.checkInstanceOf(filterList, FilterList);
			that.set(filterList.line, filterList);
		});

		Object.freeze(that);
	}
}

export { RawFilter, Filter, FilterList, FullServiceList };
