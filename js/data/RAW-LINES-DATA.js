"use strict";

import { ServiceTypes, DestNames, RawLineInfo } from "./raw-line-data-classes.js";

const RAW_SERVICE_TYPES_TRANSLATIONS = [
	["不载客", "Not in Service"],
	["普通", "Local"],
	["快速", "Express"],
	["特别服务", "Special"],
];

const RAW_DESTINATIONS_TRANSLATIONS = [
	// 不载客
  ["不载客", "Not in service"],
  ["回厂", "To yard"],
  ["试车", "Test run"],

  // 14号线
  ["嘉禾望岗", "Jiahewanggang"],
  ["白云东平", "Baiyun Dongping"],
  ["夏良", "Xialiang"],
  ["太和", "Taihe"],
  ["竹料", "Zhuliao"],
  ["钟落潭", "Zhongluotan"],
  ["马沥", "Mali"],
  ["新和", "Xinhe"],
  ["太平", "Taiping"],
  ["神岗", "Shengang"],
  ["赤草", "Chicao"],
  ["从化客运站", "Conghua Coach Terminal"],
  ["东风", "Dongfeng"],
  ["红卫", "Hongwei"],
  ["新南", "Xinnan"],
  ["枫下", "Fengxia"],
  ["知识城", "Sino-Singapore Guangzhou Knowledge City"],
  ["何棠下", "Hetangxia"],
  ["旺村", "Wangcun"],
  ["汤村", "Tangcun"],
  ["镇龙北", "Zhenlongbei"],
  ["镇龙", "Zhenlong"],

  // 21号线
  ["镇龙西", "Zhenlongxi"],
  ["镇龙", "Zhenlong"],
  ["中新", "Zhongxin"],
  ["坑贝", "Kengbei"],
  ["凤岗", "Fenggang"],
  ["朱村", "Zhucun"],
  ["山田", "Shantian"],
  ["钟岗", "Zhonggang"],
  ["增城广场", "Zengcheng Square"],
];

const RAW_LINES_INFO = [
	[
		"不载客",
		new RawLineInfo(
			new ServiceTypes("不载客"),
			new DestNames("不载客", "回厂", "试车"),
		),
	],

	[
		"14号线",
		new RawLineInfo(
			new ServiceTypes("普通", "快速", "特别服务"),
			new DestNames("嘉禾望岗", "白云东平", "夏良", "太和", "竹料", "钟落潭", "马沥", "新和", "太平", "神岗", "赤草", "从化客运站", "东风", "红卫", "新南", "枫下", "知识城", "何棠下", "旺村", "汤村", "镇龙北",  "镇龙"),
		),
	],

	[
		"21号线",
		new RawLineInfo(
			new ServiceTypes("普通", "快速", "特别服务"),
			new DestNames("镇龙西", "镇龙", "中新", "坑贝", "凤岗", "朱村", "山田", "钟岗", "增城广场"),
		),
	],
];

export { RAW_LINES_INFO, RAW_SERVICE_TYPES_TRANSLATIONS, RAW_DESTINATIONS_TRANSLATIONS };
