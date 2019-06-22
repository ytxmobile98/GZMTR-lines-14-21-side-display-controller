"use strict";

import { TranslationPair } from "./translation-pairs.js";
import { TypeChecker } from "../type-checker.js";

class Station extends TranslationPair {
  constructor(Chinese, English) {
    super(Chinese, English);
    Object.freeze(this);
  }
}

class StationsObj {

  /* Mapping: ChineseName: { Chinese: ChineseName, English: EnglishName }
    e.g. "14号线": {
      "嘉禾望岗": { Chinese: "嘉禾望岗", English: "Jiahewanggang" },
      "白云东平": { Chinese: "白云东平", English: "Baiyun Dongping" },
      ...
    }
  */

  checkDestination(ChineseStationName) {
    if (!(this.hasOwnProperty(ChineseStationName))) {
      throw new Error(`${ChineseStationName} is not a valid destination`);
    }
    return true;
  }
}

export { Station, StationsObj };
