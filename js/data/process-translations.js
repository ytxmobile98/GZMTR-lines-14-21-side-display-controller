"use strict";

import { TypeChecker } from "../type-checker.js";
import { TranslationPair } from "./translation-pairs.js";

const processTranslations = (translations, subClass) => {
	TypeChecker.checkInstanceOf(translations, Array);
	TypeChecker.checkIsPrototypeOf(TranslationPair, subClass);

	const mappedTranslations = translations.map((translation) => {
		const Chinese = translation[0];
		return [Chinese, new subClass(...translation)];
	})

	const translationsObj = Object.fromEntries(mappedTranslations);
	return translationsObj;
}

export { processTranslations };
