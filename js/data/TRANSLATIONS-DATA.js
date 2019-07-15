"use strict";

import { TypeChecker } from "../type-checker.js";

import { TranslationPair } from "./translation-pairs.js";
import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";

import { makeRequest } from "./request-raw-data.js";
import { processTranslations } from "./process-translations.js";

const SERVICE_TYPES = {};
const DESTINATIONS = {};

const readTranslationsData = async () => {
	const mimeType = "text/csv";

	await Promise.all([
		(async () => {
			const serviceTypesText = await makeRequest("./RAW-DATA/SERVICE-TYPES.csv");
			Object.assign(SERVICE_TYPES, processTranslations(serviceTypesText, ServiceType));
			Object.freeze(SERVICE_TYPES);
		})(),

		(async () => {
			const destText = await makeRequest("./RAW-DATA/DESTINATIONS.csv");
			Object.assign(DESTINATIONS, processTranslations(destText, Station));
			Object.freeze(DESTINATIONS);
		})(),
	]);

	console.log(`SERVICE_TYPES: `, SERVICE_TYPES);
	console.log(`DESTINATIONS: `, DESTINATIONS);
};

const getServiceType = (serviceTypeChinese) => {
	return SERVICE_TYPES[serviceTypeChinese];
};

const getDestination = (destNameChinese) => {
	return DESTINATIONS[destNameChinese];
};

const mapTextListToServiceTypes = (text, separator = ",") => {
	const listText = String(text).split(separator);
	return listText.map((text) => {
		const serviceType = getServiceType(text);
		TypeChecker.checkInstanceOf(serviceType, ServiceType);
		return serviceType;
	});
}

const mapTextListToDests = (text, separator = ",") => {
	const listText = String(text).split(separator);
	return listText.map((text) => {
		const destination = getDestination(text);
		TypeChecker.checkInstanceOf(destination, Station);
		return destination;
	});
}

export { readTranslationsData, getServiceType, getDestination, mapTextListToServiceTypes, mapTextListToDests };
