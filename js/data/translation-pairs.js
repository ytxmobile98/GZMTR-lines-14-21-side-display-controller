"use strict";

import { TypeChecker } from "../type-checker.js";

class TranslationPair {
  constructor(Chinese, English) {
    [Chinese, English].forEach((element) => {
      TypeChecker.checkTypeOf(element, "string");
    })
    this.Chinese = Chinese;
    this.English = English;
  }
}

class TranslationsObj extends Object {};

export { TranslationPair, TranslationsObj };
