"use strict";

import { TypeChecker } from "../type-checker.js";

import { TranslationPair } from "./translation-pairs.js";
import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";

import { makeRequest } from "./make-XMLHttpRequest.js";
import { processTranslations } from "./process-translations.js";

const SERVICE_TYPES = {};
const DESTINATIONS = {};

// initial loading, read data from external data file
const readTranslationsData = async () => {
	const mimeType = "text/csv";

	await Promise.all([
		// read destinations
		(async () => {
			const destText = await makeRequest("./RAW-DATA/DESTINATIONS.tsv");
			Object.assign(DESTINATIONS, processTranslations(destText, Station));
			Object.freeze(DESTINATIONS);
		})(),

		// read service types
		(async () => {
			const serviceTypesText = await makeRequest("./RAW-DATA/SERVICE-TYPES.tsv");
			Object.assign(SERVICE_TYPES, processTranslations(serviceTypesText, ServiceType));
			Object.freeze(SERVICE_TYPES);
		})(),
	]);

	// ensure that the data are read in properly
	console.info(`DESTINATIONS: `, DESTINATIONS);
	console.info(`SERVICE_TYPES: `, SERVICE_TYPES);
};

// below are utility functions

// return: a service type in Chinese-English translation pair (type ServiceType)
// if not found, return undefined
const getServiceType = (serviceTypeChinese) => {
	return SERVICE_TYPES[serviceTypeChinese];
};

// return: a destination in Chinese-English translation pair (type Station)
// if not found, return undefined
const getDestination = (destNameChinese) => {
	return DESTINATIONS[destNameChinese];
};

// This function maps a string of service types to an array of Chinese-English translation pairs (type ServiceType)
// @text: the text string of service types, each item separated by @separator (default is comma ",")
// return: an array of Chinese-English translation pairs (type ServiceType)
const mapTextListToServiceTypes = (text, separator = ",") => {
	const listText = String(text).split(separator);
	return listText.map((text) => {
		const serviceType = getServiceType(text);
		TypeChecker.checkInstanceOf(serviceType, ServiceType);
		return serviceType;
	});
}

// This function maps a string of destination names to an array of Chinese-English translation pairs (type Station)
// @text: the text string of destinations, each item separated by @separator (default is comma ",")
// return: an array of Chinese-English translation pairs (type Station)
const mapTextListToDests = (text, separator = ",") => {
	const listText = String(text).split(separator);
	return listText.map((text) => {
		const destination = getDestination(text);
		TypeChecker.checkInstanceOf(destination, Station);
		return destination;
	});
}

export { readTranslationsData, getServiceType, getDestination, mapTextListToServiceTypes, mapTextListToDests };
