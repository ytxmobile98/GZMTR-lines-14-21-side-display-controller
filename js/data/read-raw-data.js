"use strict";

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

const parallelProcess = async () => {
	let destinations, serviceTypes, filters;
	const mimeType = "text/csv";

	await Promise.all([
		(async () => {
			destinations = await makeRequest("./RAW-DATA/DESTINATIONS.csv", mimeType);
			destinations = parseDataFields(destinations);
		})(),
		(async () => {
			serviceTypes = await makeRequest("./RAW-DATA/SERVICE-TYPES.csv", mimeType);
			serviceTypes = parseDataFields(serviceTypes);
		})(),
		(async () => {
			filters = await makeRequest("./RAW-DATA/LINES-FILTERS.csv", mimeType);
			filters = parseDataFields(filters);
		})(),
	]);
	console.log(destinations)
	console.log(serviceTypes);
	console.log(filters);

	serviceTypes.forEach((row) => {
		console.log(isHeaderRow(row, /^!.{1,}/g));
	});
}

parallelProcess();
