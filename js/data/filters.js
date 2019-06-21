"use strict";

import { TypeChecker } from "../type-checker.js";
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

class Filter extends RawFilter {

  constructor(line, ...args) {
    let name, stationNames, serviceTypeStr = undefined;

    if (args.length === 2 || args.length === 3) {
      // new Filter(line, name, stationNames, serviceType = undefined);
      name = args[0];
      stationNames = args[1];
      serviceTypeStr = args[2];
      if (typeof serviceTypeStr === "string") {
        SERVICE_TYPES.checkServiceType(serviceTypeStr);
      }
      super(name, stationNames, serviceTypeStr);
    }

    else if ((args.length === 1) && (args[0] instanceof RawFilter)) {
      // new Filter(line, rawFilter);

      const rawFilter = args[0];
      name = rawFilter.name;
      stationNames = rawFilter.stationNames;
      serviceTypeStr = rawFilter.serviceTypeStr;
      super(name, stationNames, serviceTypeStr);
    }

    else {
      throw new TypeError(`Filter constructor format:
        new Filter(line, name, stationNames, serviceTypeStr = undefined); OR
        new Filter(line, rawFilter);
      `);
    }

    this.line = line;
    this.serviceType = SERVICE_TYPES[this.serviceTypeStr];
    this.stations = this.getStationsFromNames(stationNames);
    Object.freeze(this);
  }

  getStation(ChineseName) {
    let line = DESTINATIONS_BY_LINE[this.line];
    return line && line[ChineseName];
    // if the line or the station does not exist, then return undefined
  }

  getStationsFromNames(stationNames) {
    TypeChecker.checkInstanceOf(stationNames, Array);

    const that = this;
    let stations = [];

    stationNames.forEach((stationName, index) => {
      TypeChecker.checkTypeOf(stationName, "string");
      stations[index] = that.getStation(stationName);
    });

    return stations;
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
