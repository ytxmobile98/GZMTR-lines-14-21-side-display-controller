"use strict";

import { processTranslations } from "./process-translations.js";

import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";

import { RAW_SERVICE_TYPES_TRANSLATIONS, RAW_DESTINATIONS_TRANSLATIONS } from "./RAW-LINES-DATA.js";

const SERVICE_TYPES = Object.freeze( processTranslations(RAW_SERVICE_TYPES_TRANSLATIONS, ServiceType));

const getServiceType = (serviceTypeChinese) => {
	return SERVICE_TYPES[serviceTypeChinese];
}

const DESTINATIONS = Object.freeze( processTranslations(RAW_DESTINATIONS_TRANSLATIONS, Station));

const getDestination = (destNameChinese) => {
	return DESTINATIONS[destNameChinese];
}


export { getServiceType, getDestination };
