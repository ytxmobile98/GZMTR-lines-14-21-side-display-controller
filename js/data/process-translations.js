"use strict";

import { TypeChecker } from "../type-checker.js";
import { TranslationPair } from "./translation-pairs.js";

const processTranslations = (translations, SubClass) => {
	TypeChecker.checkInstanceOf(translations, Array);
	TypeChecker.checkIsPrototypeOf(TranslationPair, SubClass);

	const mappedTranslations = translations.map((translation) => {
		const Chinese = translation[0];
		return [Chinese, new SubClass(...translation)];
	});

	const translationsObj = Object.fromEntries(mappedTranslations);
	return translationsObj;
}

export { processTranslations };
