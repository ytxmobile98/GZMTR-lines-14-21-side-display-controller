"use strict";

import { Station, StationsObj } from "./station-classes.js";

const DESTINATION_NAMES = [

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

const DESTINATIONS = Object.freeze((() => {

  /* Converts DESTINATION_NAMES to key-value pairs
    Each key is a destination in Chinese
    Each value is a station object

    Output:
    {
      "嘉禾望岗": {
        Chinese: "嘉禾望岗",
        English: "Jiahewanggang",
      },
      "白云东平": {
        Chinese: "白云东平",
        English: "Baiyun Dongping",
      },
      ...
    }

    Access: DESTINATIONS["嘉禾望岗"];
  */

  const uniqueDestinations = (() => {

    // remove repeated station names, and form an array of stations
    // each element is an instance of class Station

    const separator = "\t";

    const destNamesStrs = [];
    DESTINATION_NAMES.forEach((destName) => {
      destNamesStrs.push(destName.join(separator));
    });
    const uniqueDestNames = Array.from(new Set(destNamesStrs));

    const uniqueDestinations = [];
    uniqueDestNames.forEach((destName) => {
      const pair = destName.split(separator, 2);
      const Chinese = pair[0];
      const English = pair[1];
      uniqueDestinations.push(new Station(Chinese, English));
    });
    return uniqueDestinations;

  })();

  // Add keys (Chinese names) to each station after removing repeated names
  const DESTINATIONS = new StationsObj(...uniqueDestinations);
  return DESTINATIONS;

})());

const DESTINATIONS_BY_LINE = Object.freeze({

  /* Allows accessing destinations by line

    Output: {
      "14号线": {
        "嘉禾望岗": {
          Chinese: "嘉禾望岗",
          English: "Jiahewanggang",
        },
        "白云东平": {
          Chinese: "白云东平",
          English: "Baiyun Dongping",
        },
        ...
      },
      ...
    }

    Access: DESTINATIONS_BY_LINE["14号线"]["嘉禾望岗"];
  */

  "不载客": new StationsObj(
    DESTINATIONS["不载客"],
    DESTINATIONS["回厂"],
    DESTINATIONS["试车"],
  ),

  "14号线": new StationsObj(
    DESTINATIONS["嘉禾望岗"],
    DESTINATIONS["白云东平"],
    DESTINATIONS["夏良"],
    DESTINATIONS["太和"],
    DESTINATIONS["竹料"],
    DESTINATIONS["钟落潭"],
    DESTINATIONS["马沥"],
    DESTINATIONS["新和"],
    DESTINATIONS["太平"],
    DESTINATIONS["神岗"],
    DESTINATIONS["赤草"],
    DESTINATIONS["从化客运站"],
    DESTINATIONS["东风"],
    DESTINATIONS["红卫"],
    DESTINATIONS["新南"],
    DESTINATIONS["枫下"],
    DESTINATIONS["知识城"],
    DESTINATIONS["何棠下"],
    DESTINATIONS["旺村"],
    DESTINATIONS["汤村"],
    DESTINATIONS["镇龙北"],
    DESTINATIONS["镇龙"],
  ),

  "21号线": new StationsObj(
    DESTINATIONS["镇龙西"],
    DESTINATIONS["镇龙"],
    DESTINATIONS["中新"],
    DESTINATIONS["坑贝"],
    DESTINATIONS["凤岗"],
    DESTINATIONS["朱村"],
    DESTINATIONS["山田"],
    DESTINATIONS["钟岗"],
    DESTINATIONS["增城广场"],
  ),

});

export { DESTINATIONS, DESTINATIONS_BY_LINE };
