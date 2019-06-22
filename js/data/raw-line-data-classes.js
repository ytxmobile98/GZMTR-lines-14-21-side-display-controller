"use strict";

import { TypeChecker } from "../type-checker.js";

class ServiceTypesChineseArray extends Array {};
const ServiceTypes = ServiceTypesChineseArray;

class DestNameChineseArray extends Array {};
const DestNames = DestNameChineseArray;

class RawLineInfo {
	constructor(serviceTypesChinese, destNamesChinese) {
		TypeChecker.checkInstanceOf(serviceTypesChinese, ServiceTypesChineseArray);
		this.serviceTypes = serviceTypesChinese.valueOf();

		TypeChecker.checkInstanceOf(destNamesChinese, DestNameChineseArray);
		this.destNames = destNamesChinese.valueOf();
	}
}

export { ServiceTypes, DestNames, RawLineInfo };
