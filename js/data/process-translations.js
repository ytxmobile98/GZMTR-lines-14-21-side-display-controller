"use strict";

import { TypeChecker } from "../type-checker.js";
import { TranslationPair } from "./translation-pairs.js";

const processTranslations = (translationsArray, subClass) => {
	TypeChecker.checkInstanceOf(translationsArray, Array);
	TypeChecker.checkIsPrototypeOf(TranslationPair, subClass);

	const translationsObj = Object.fromEntries(translationsArray);
	for (let [Chinese, English] of Object.entries(translationsObj)) {
		translationsObj[Chinese] = new subClass(Chinese, English);
	}
	return translationsObj;
}

export { processTranslations };
