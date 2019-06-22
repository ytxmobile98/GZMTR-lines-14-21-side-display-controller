"use strict";

import { TypeChecker } from "../type-checker.js";

class ServiceTypesChineseArray extends Array {};
const ServiceTypes = ServiceTypesChineseArray;

class DestNameChineseArray extends Array {};
const DestNames = DestNameChineseArray;

class RawLineInfo {
	constructor(serviceTypesChinese, destNamesChinese) {
		TypeChecker.checkInstanceOf(serviceTypesChinese, ServiceTypesChineseArray);
		this.serviceTypesChinese = serviceTypesChinese.valueOf();

		TypeChecker.checkInstanceOf(destNamesChinese, DestNameChineseArray);
		this.destNamesChinese = destNamesChinese.valueOf();
	}
}

export { ServiceTypes, DestNames, RawLineInfo };
