"use strict";

import { RawFilter, FilterList, FullServiceList } from "./filters.js";
import { ServiceType, ServiceTypeList } from "./service-type-classes.js";

const selfMap = (myVar) => myVar;

const	line = selfMap;
const isPassengerService = selfMap;
const rawFilters = Array;
const name = selfMap;
const stationNames = Array;
const	serviceType = selfMap;

const SERVICE_TYPES = new ServiceTypeList(
	new ServiceType("不载客", "Not in Service"),
	new ServiceType("普通", "Local"),
	new ServiceType("快速", "Express"),
	new ServiceType("特别服务", "Special"),
);

const SERVICES = new FullServiceList(

	/* Format of FilterList:
		new FilterList(
			line(nameOfLine),
			isPassengerService(true | false);
			rawFilters(
				// rawFilter 1
				new RawFilter(
					name(nameOfFilter),
					stationNames("One", "Two", "Three", ...),
				),
				// rawFilter 2
				new RawFilter(
					name(nameOfFilter),
					stationNames("One", "Five", "Ten", ...),
					serviceType(specialServiceType),
				),
				...
			)
		),
		...
	*/

	new FilterList(
		line("不载客"),
		isPassengerService(false),
		rawFilters(
			new RawFilter(
				name("全部"),
				stationNames("不载客", "回厂", "试车"),
			),
		),
	),


	new FilterList(
		line("14号线"),
		isPassengerService(true),
		rawFilters(
			new RawFilter(
				name("常用"),
				stationNames("嘉禾望岗", "新和", "东风", "镇龙"),
			),
			new RawFilter(
				name("全部"),
				stationNames("嘉禾望岗", "白云东平", "夏良", "太和", "竹料", "钟落潭", "马沥", "新和", "太平", "神岗", "赤草", "从化客运站", "东风", "红卫", "新南", "枫下", "知识城", "何棠下", "旺村", "汤村", "镇龙北", "镇龙"),
			),
			new RawFilter(
				name("快速"),
				stationNames("嘉禾望岗", "新和", "从化客运站", "东风", "镇龙"),
				serviceType("快速"),
			),
			new RawFilter(
				name("主线"),
				stationNames("嘉禾望岗", "白云东平", "夏良", "太和", "竹料", "钟落潭", "马沥", "新和", "太平", "神岗", "赤草", "从化客运站", "东风"),
			),
			new RawFilter(
				name("支线"),
				stationNames("新和", "红卫", "新南", "枫下", "知识城", "何棠下", "旺村", "汤村", "镇龙北", "镇龙"),
			),
		),
	),

	new FilterList(
		line("21号线"),
		isPassengerService(true),
		rawFilters(
			new RawFilter(
				name("常用"),
				stationNames("镇龙西", "增城广场"),
			),
			new RawFilter(
				name("全部"),
				stationNames("镇龙西", "镇龙", "中新", "坑贝", "凤岗", "朱村", "山田", "钟岗", "增城广场"),
			),
		),
	),

);

console.log(SERVICE_TYPES, SERVICES);

export { SERVICES };
