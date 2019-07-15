"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, Station, LineInfo } from "./processed-lines-data-classes.js";
import { Filter } from "./filter-classes.js";

import { makeRequest } from "./request-raw-data.js";
import { parseDataFields } from "./parse-data-fields.js";
import { readTranslationsData, getServiceType, getDestination } from "./TRANSLATIONS-DATA.js";

const LINES_INFO = new Map();

const loadLinesInfo = async () => {
	await (async () => {
		const linesBasicInfoText = await makeRequest("RAW-DATA/LINES-BASIC-INFO.csv");
		const linesBasicInfo = parseDataFields(linesBasicInfoText);
		linesBasicInfo.forEach((item) => {
			const newLineInfo = new LineInfo(...(item.slice(0, 4)));
			LINES_INFO.set(item[0], newLineInfo);
		});
	})();

	await (async () => {
		const linesFiltersText = await makeRequest("RAW-DATA/LINES-FILTERS.csv");
		const linesFiltersData = parseDataFields(linesFiltersText);
		linesFiltersData.forEach((item) => {
			const newFilter = new Filter(...(item.slice(0, 5)));
			LINES_INFO.get(newFilter.getLine()).addFilter(newFilter);
		})
	})();

	Object.freeze(LINES_INFO);
	console.log(`LINES_INFO: `, LINES_INFO);
};

export { loadLinesInfo, LINES_INFO };
