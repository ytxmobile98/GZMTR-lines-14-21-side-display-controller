"use strict";

import { Station, StationList } from "./station-classes.js";

const DESTINATIONS = Object.freeze({

  "不载客": new StationList(
    new Station("不载客", "Not in service"),
    new Station("回厂", "To yard"),
    new Station("试车", "Test run"),
  ),

  "14号线": new StationList(
    new Station("嘉禾望岗", "Jiahewanggang"),
    new Station("白云东平", "Baiyun Dongping"),
    new Station("夏良", "Xialiang"),
    new Station("太和", "Taihe"),
    new Station("竹料", "Zhuliao"),
    new Station("钟落潭", "Zhongluotan"),
    new Station("马沥", "Mali"),
    new Station("新和", "Xinhe"),
    new Station("太平", "Taiping"),
    new Station("神岗", "Shengang"),
    new Station("赤草", "Chicao"),
    new Station("从化客运站", "Conghua Coach Terminal"),
    new Station("东风", "Dongfeng"),
    new Station("红卫", "Hongwei"),
    new Station("新南", "Xinnan"),
    new Station("枫下", "Fengxia"),
    new Station("知识城", "Sino-Singapore Guangzhou Knowledge City"),
    new Station("何棠下", "Hetangxia"),
    new Station("旺村", "Wangcun"),
    new Station("汤村", "Tangcun"),
    new Station("镇龙北", "Zhenlongbei"),
    new Station("镇龙", "Zhenlong"),
  ),

  "21号线": new StationList(
    new Station("镇龙西", "Zhenlongxi"),
    new Station("镇龙", "Zhenlong"),
    new Station("中新", "Zhongxin"),
    new Station("坑贝", "Kengbei"),
    new Station("凤岗", "Fenggang"),
    new Station("朱村", "Zhucun"),
    new Station("山田", "Shantian"),
    new Station("钟岗", "Zhonggang"),
    new Station("增城广场", "Zengcheng Square"),
  ),

});

export { DESTINATIONS };
