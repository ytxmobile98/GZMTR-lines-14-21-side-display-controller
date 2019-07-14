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

const processTranslations = (text, SubClass, fieldSeparator = "\t", newLine = "\n") => {
	TypeChecker.checkIsPrototypeOf(TranslationPair, SubClass);

	let dataArray = parseDataFields(text, fieldSeparator, newLine);

	// filter out only valid rows
	dataArray = dataArray.filter((row, index) => {
		return !(isEmptyRow(row) || isHeaderRow(row));
	});
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

	// use Chinese fields as key
	const translations = {};
	dataArray.forEach((row) => {
		translations[row[0]] = new SubClass(...row);
	});
	return translations;
}

const parallelProcess = async () => {
	let destinations, serviceTypes, filters;
	const mimeType = "text/csv";

	await Promise.all([
		(async () => {
			const destText = await makeRequest("./RAW-DATA/DESTINATIONS.csv", mimeType);
			destinations = processTranslations(destText, Station);
		})(),

		(async () => {
			const serviceTypesText = await makeRequest("./RAW-DATA/SERVICE-TYPES.csv", mimeType);
			serviceTypes = processTranslations(serviceTypesText, ServiceType);
		})(),

		(async () => {
			filters = await makeRequest("./RAW-DATA/LINES-FILTERS.csv", mimeType);
			filters = parseDataFields(filters);
		})(),
	]);

	console.log(destinations)
	console.log(serviceTypes);
	console.log(filters);
}

parallelProcess();
