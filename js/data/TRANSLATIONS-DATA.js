"use strict";

import { TypeChecker } from "../type-checker.js";

import { TranslationPair } from "./translation-pairs.js";
import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";

import { makeRequest } from "./read-raw-data.js";
import { processTranslations } from "./process-translations.js";

const SERVICE_TYPES = {};
const DESTINATIONS = {};

const readTranslationsData = async () => {
	const mimeType = "text/csv";

	await Promise.all([
		(async () => {
			const serviceTypesText = await makeRequest("./RAW-DATA/SERVICE-TYPES.csv");
			Object.assign(SERVICE_TYPES, processTranslations(serviceTypesText, ServiceType));
		})(),

		(async () => {
			const destText = await makeRequest("./RAW-DATA/DESTINATIONS.csv");
			Object.assign(DESTINATIONS, processTranslations(destText, Station));
		})(),
	]);

	console.log(SERVICE_TYPES, DESTINATIONS);
};

const getServiceType = (serviceTypeChinese) => {
	return SERVICE_TYPES[serviceTypeChinese];
};

const getDestination = (destNameChinese) => {
	return DESTINATIONS[destNameChinese];
};

export { readTranslationsData, getServiceType, getDestination };
