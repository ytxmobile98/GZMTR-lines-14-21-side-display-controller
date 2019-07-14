"use strict";

import { TypeChecker } from "../type-checker.js";

const getQuotedFieldData = (field) => {
	field = String(field);
	const re = /".*"|'.*'/g;
	if (field.match(re)) {
		// strip the first and last quotation marks
		return field.slice(1, -1);
	}
	return field;
}

const parseDataFields = (text, fieldSeparator = "\t", newLine = "\n") => {
	text = String(text);
	const rows = text.split(newLine);
	const result = rows.map((row) => {
		return row.split(fieldSeparator).map(item => getQuotedFieldData(item));
	});
	return result;
}

const isEmptyRow = (arr) => {
	TypeChecker.checkInstanceOf(arr, Array);
	for (let i of arr) {
		if (getQuotedFieldData(i)) {
			return false;
			break;
		}
	}
	return true;
}

const isHeaderRow = (arr, regexp = /^!/g) => {
	TypeChecker.checkInstanceOf(arr, Array);
	for (let item of arr) {
		if (!(String(item).match(regexp))) {
			return false;
			break;
		}
	}
	return true;
}

export { parseDataFields, isEmptyRow, isHeaderRow };
