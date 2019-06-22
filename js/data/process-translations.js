"use strict";

import { TypeChecker } from "../type-checker.js";
import { TranslationPair, TranslationsObj } from "./translation-pairs.js";

const processTranslations = (translationsArray, subClass, collectionObj) => {
	TypeChecker.checkInstanceOf(translationsArray, Array);
	TypeChecker.checkIsPrototypeOf(TranslationPair, subClass);
	TypeChecker.checkIsPrototypeOf(TranslationsObj, collectionObj);

	const translationsObj = collectionObj.fromEntries(translationsArray);

	for (let [Chinese, English] of Object.entries(translationsObj)) {
		translationsObj[Chinese] = new subClass(Chinese, English);
	}

	return translationsObj;
}

export { processTranslations };
