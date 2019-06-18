"use strict";

import { TranslationPairs } from "./translation-pairs.js";
import { TypeChecker } from "../type-checker.js";

class Station extends TranslationPairs {
  constructor(Chinese, English) {
    super(Chinese, English);
    Object.freeze(this);
  }
}

class StationList {
  constructor(stations) {
    /* Mapping: ChineseName: { Chinese: ChineseName, English: EnglishName }
      e.g. "14号线": {
        "嘉禾望岗": { Chinese: "嘉禾望岗", English: "Jiahewanggang" },
        "白云东平": { Chinese: "白云东平", English: "Baiyun Dongping" },
        ...
      }
    */

    TypeChecker.checkInstanceOf(stations, Array);

    const that = this;

    stations.forEach((station) => {
      TypeChecker.checkInstanceOf(station, Station);
      let Chinese = station.Chinese;
      that[Chinese] = station;
    });

    Object.freeze(that);
  }
}

export { Station, StationList };
