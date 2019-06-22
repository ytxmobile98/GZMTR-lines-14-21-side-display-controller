"use strict";

import { RAW_LINES_INFO, RAW_SERVICE_TYPES_TRANSLATIONS, RAW_DESTINATIONS_TRANSLATIONS } from "./RAW-LINES-DATA.js";
import { processTranslations } from "./process-translations.js";
import { ServiceType, ServiceTypesObj } from "./service-type-classes.js";
import { Station, StationsObj } from "./station-classes.js";

const PROCESSED_SERVICE_TYPES_TRANSLATIONS = processTranslations(RAW_SERVICE_TYPES_TRANSLATIONS, ServiceType, ServiceTypesObj);

const PROCESSED_DESTINATIONS_TRANSLATIONS = processTranslations(RAW_DESTINATIONS_TRANSLATIONS, Station, StationsObj);

console.log(PROCESSED_SERVICE_TYPES_TRANSLATIONS, PROCESSED_DESTINATIONS_TRANSLATIONS);
