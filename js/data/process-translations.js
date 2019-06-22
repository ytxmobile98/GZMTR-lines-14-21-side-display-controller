"use strict";

import { TypeChecker } from "../type-checker.js";
import { TranslationPairs } from "./translation-pairs.js";

const processTranslations = (translationsArray, subClass = TranslationPairs) => {
	TypeChecker.checkInstanceOf(translationsArray, Array);
	TypeChecker.checkIsPrototypeOf(TranslationPairs, subClass);

	const translationsObj = Object.fromEntries(translationsArray);

	for (let [Chinese, English] of Object.entries(translationsObj)) {
		translationsObj[Chinese] = new subClass(Chinese, English);
	}

	return translationsObj;
}

export { processTranslations };
