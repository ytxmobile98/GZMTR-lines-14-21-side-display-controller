"use strict";

import { RawLineInfo } from "./raw-lines-data-classes.js";
import { RawFilter } from "./filter-classes.js";

const RAW_LINES_INFO = (() => {

	const line = String;
	const isPassengerService = Boolean;
	const destinations = Array;

	const serviceTypes = Array;
	const defaultServiceType = String;
	const crossLineServiceType = String;

	const rawFilters = Array;
	const name = String;
	const serviceType = String;

	/* RawLineInfo constructor:
		new RawLineInfo(line, isPassengerService, destinations, serviceTypes, defaultServiceType, crossLineServiceType, rawFilters);

		Argument types:
			line, defaultServiceType, crossLineServiceType: strings
			isPassengerService: boolean
			destinations, serviceTypes: array of strings
			rawFilters: array of type RawFilter
	*/

	/* RawFilter constructor:
		constructor(name, destinations, serviceType = undefined)

		Argument types:
			name, serviceType: strings
			destinations: array of strings
	*/

	return [
		new RawLineInfo(
			line("不载客"),
			isPassengerService(false),
			destinations("不载客", "回厂", "试车"),

			serviceTypes("不载客"),
			defaultServiceType("不载客"),
			crossLineServiceType("不载客"),

			rawFilters(
				new RawFilter(
					name("全部"),
					destinations("不载客", "回厂", "试车"),
				),
			),
		),

		new RawLineInfo(
			line("14号线"),
			isPassengerService(true),
			destinations("嘉禾望岗", "白云东平", "夏良", "太和", "竹料", "钟落潭", "马沥", "新和", "太平", "神岗", "赤草", "从化客运站", "东风", "红卫", "新南", "枫下", "知识城", "何棠下", "旺村", "汤村", "镇龙北", "镇龙"),

			serviceTypes("普通", "快速", "特别服务"),
			defaultServiceType("普通"),
			crossLineServiceType("特别服务"),

			rawFilters(
				new RawFilter(
					name("常用"),
					destinations("嘉禾望岗", "新和", "东风", "镇龙"),
				),
				new RawFilter(
					name("全部"),
					destinations("嘉禾望岗", "白云东平", "夏良", "太和", "竹料", "钟落潭", "马沥", "新和", "太平", "神岗", "赤草", "从化客运站", "东风", "红卫", "新南", "枫下", "知识城", "何棠下", "旺村", "汤村", "镇龙北", "镇龙"),
				),
				new RawFilter(
					name("快速"),
					destinations("嘉禾望岗", "新和", "从化客运站", "东风", "镇龙"),
					serviceType("快速"),
				),
				new RawFilter(
					name("主线"),
					destinations("嘉禾望岗", "白云东平", "夏良", "太和", "竹料", "钟落潭", "马沥", "新和", "太平", "神岗", "赤草", "从化客运站", "东风"),
				),
				new RawFilter(
					name("支线"),
					destinations("新和", "红卫", "新南", "枫下", "知识城", "何棠下", "旺村", "汤村", "镇龙北", "镇龙"),
				),
			)
		),

		new RawLineInfo(
			line("21号线"),
			isPassengerService(true),
			destinations("镇龙西", "镇龙", "中新", "坑贝", "凤岗", "朱村", "山田", "钟岗", "增城广场"),

			serviceTypes("普通", "快速", "特别服务"),
			defaultServiceType("普通"),
			crossLineServiceType("特别服务"),

			rawFilters(
				new RawFilter(
					name("常用"),
					destinations("镇龙西", "增城广场"),
				),
				new RawFilter(
					name("全部"),
					destinations("镇龙西", "镇龙", "中新", "坑贝", "凤岗", "朱村", "山田", "钟岗", "增城广场"),
				),
			),
		),
	];

})();

console.log(`RAW_LINES_INFO: `, RAW_LINES_INFO);

export { RAW_LINES_INFO };
