"use strict";

import { RawFilter, FilterList, FullServiceList } from "./filters.js";

const strSelfMap = (str) => str;

const	line = strSelfMap;
const rawFilters = Array;
	const name = strSelfMap;
const stationNames = Array;
const	serviceType = strSelfMap;

const SERVICES = new FullServiceList([

	new FilterList(
		line("不载客"),
		rawFilters(
			new RawFilter(
				name("全部"),
				stationNames("不载客", "回厂", "试车"),
			),
		),
	),


	new FilterList(
		line("14号线"),
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

]);

console.log(SERVICES);
