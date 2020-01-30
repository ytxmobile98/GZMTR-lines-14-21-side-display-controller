"use strict";

import { TypeChecker } from "../type-checker.js";
import { TranslationPair } from "./translation-pairs.js";

import { parseDataFields } from "./parse-data-fields.js";

const processTranslations = (text, SubClass, fieldSeparator = "\t", newLine = "\n") => {

	/* This function processes the .tsv files translation data.

		@text: the text content of the .tsv file
		@subclass: a subclass of TranslationPair, with a "Chinese" key and a "English" key in each of its instances

		return: an map from Chinese names (keys) to translation pairs (values)
	*/

	TypeChecker.checkIsPrototypeOf(TranslationPair, SubClass);

	let dataArray = parseDataFields(text, fieldSeparator, newLine);

	// keep Chinese and English columns only
	dataArray.forEach((row, index) => {
		if (row.length >= 3) {
			dataArray[index] = row.slice(1, 3);
		}
		else {
			dataArray[index] = row.slice(0, 2);
		}
	});

	// remove duplicates
	const dataStrsSet = new Set(dataArray.map((row) => {
		return row.join(fieldSeparator);
	}));
	dataArray = Array.from(dataStrsSet).map((str) => {
		return String(str).split(fieldSeparator);
	});

	// use Chinese field names as keys
	const translations = {};
	dataArray.forEach((row) => {
		translations[row[0]] = new SubClass(...row);
	});
	Object.freeze(translations);
	return translations;
};

export { processTranslations };
