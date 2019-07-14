"use strict";

import { TypeChecker } from "../type-checker.js";

import { TranslationPair } from "./translation-pairs.js";
import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";

import { parseDataFields, isEmptyRow, isHeaderRow } from "./parse-data-fields.js";

const makeRequest = (url, mimeType = "text/plain") => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.overrideMimeType(mimeType);
		xhr.open("GET", url);

		xhr.onload = (e) => {
			resolve(xhr.responseText);
		};
		xhr.onerror = (e) => {
			reject(xhr.statusText);
		};

		xhr.send();
	});
};

export { makeRequest };
