"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, Station, LineInfo } from "./processed-lines-data-classes.js";

import { makeRequest } from "./read-raw-data.js";
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
		console.log(LINES_INFO);
	})();
};

export { loadLinesInfo, LINES_INFO };
