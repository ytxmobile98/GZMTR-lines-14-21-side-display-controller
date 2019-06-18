"use strict";

import { destinations } from "./all-destinations.js";
import { TypeChecker } from "../type-checker.js";

class RawFilter {
  constructor(name, stationNames, serviceType = undefined) {
    this.name = name;
    this.stationNames = stationNames;
    this.serviceType = serviceType;
  }
}

class Filter extends RawFilter {

  constructor(line, ...args) {
    let name, stationNames, serviceType = undefined;

    if (args.length === 2 || args.length === 3) {
      // new Filter(line, name, stationNames, serviceType = undefined);
      name = args[0];
      stationNames = args[1];
      serviceType = args[2];
      super(name, stationNames, serviceType);
    }

    else if ((args.length === 1) && (args[0] instanceof RawFilter)) {
      // new Filter(line, rawFilter);
      const rawFilter = args[0];
      name = rawFilter.name;
      stationNames = rawFilter.stationNames;
      serviceType = rawFilter.serviceType;
      super(rawFilter.name, rawFilter.stationNames, rawFilter.serviceType);
    }

    else {
      throw new TypeError(`Filter constructor format:
        new Filter(line, name, stationNames, serviceType = undefined); OR
        new Filter(line, rawFilter);
      `);
    }

    this.line = line;
    this.stations = this.getStationsFromNames(stationNames);
    Object.freeze(this);
  }

  getStation(ChineseName) {
    let line = destinations[this.line];
    return line && line[ChineseName];
    // if the line or the station does not exist, then return undefined
  }

  getStationsFromNames(stationNames) {
    const that = this;
    let stations = [];

    stationNames.forEach((stationName, index) => {
      if (typeof stationName !== "string") {
        throw new TypeError(`${stationName} should be a string`);
      }
      stations[index] = that.getStation(stationName);
    });

    return stations;
  }
}

class FilterList extends Map {
  constructor(line, rawFilters) {
    /* Format of arguments:
      line: "14号线",
      rawFiters: [
        // MUST BE CONSTRUCTED USING:
          new RawFilter(name, stationNames, serviceType)
        {
          name: "全部",
          stationNames: ["一号站", "二号站", "三号站", "四号站", ...],
          serviceType: "快速", // this key is optional
        },
        {
          name: "快速",
          stationNames: ["一号站", "五号站", "十号站", "二十号站", ...],
        },
        ...
      ]
    */

    if (typeof line !== "string") {
      throw new TypeError(`${line} should be a string`);
    }

    super();
    const that = this;
		that.line = line;
    rawFilters.forEach((rawFilter) => {
      TypeChecker.checkInstanceOf(rawFilter, RawFilter);
      let filter = new Filter(line, rawFilter);
      that.set(rawFilter.name, filter);
    });

		Object.freeze(that);
  }
}

class FullServiceList extends Map {
	constructor(filterLists) {
		super();

		let that = this;

		filterLists.forEach((filterList) => {
			TypeChecker.checkType(filterList, FilterList);
			that.set(filterList.line, filterList);
		});

		Object.freeze(that);
	}
}

const allServices = new FullServiceList([

	new FilterList("不载客", [

		new RawFilter("全部",
			["不载客", "回厂", "试车"],
		),

	]),


	new FilterList("14号线", [

		new RawFilter("常用",
			["嘉禾望岗", "新和", "东风", "镇龙"],
		),

		new RawFilter("全部",
			["嘉禾望岗", "白云东平", "夏良", "太和", "竹料", "钟落潭", "马沥", "新和", "太平", "神岗", "赤草", "从化客运站", "东风", "红卫", "新南", "枫下", "知识城", "何棠下", "旺村", "汤村", "镇龙北", "镇龙"],
		),

		new RawFilter("快速",
			["嘉禾望岗", "新和", "从化客运站", "东风", "镇龙"],
			"快速"
		),

		new RawFilter("主线",
			["嘉禾望岗", "白云东平", "夏良", "太和", "竹料", "钟落潭", "马沥", "新和", "太平", "神岗", "赤草", "从化客运站", "东风"],
		),

		new RawFilter("支线",
			["新和", "红卫", "新南", "枫下", "知识城", "何棠下", "旺村", "汤村", "镇龙北", "镇龙"],
		),

	]),

	new FilterList("21号线", [

		new RawFilter("常用",
			["镇龙西", "增城广场"],
		),

		new RawFilter("全部",
			["镇龙西", "镇龙", "中新", "坑贝", "凤岗", "朱村", "山田", "钟岗", "增城广场"],
		),

	]),

]);

console.log(allServices);
