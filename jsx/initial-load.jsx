"use strict";

import { readTranslationsData } from "../data/TRANSLATIONS-DATA.js";
import { loadLinesInfo } from "../data/LINES-DATA.js";

import { Controller } from "./controller.js";

const root = document.getElementById("js-root");

const documentIsLocal = () => {
	const location = document.location;
	return ((location.protocol === "file:")
		|| (location.hostname === "127.0.0.1"));
}

const initialLoad = async () => {
	await readTranslationsData();
	await loadLinesInfo();

	if (documentIsLocal()) {
		document.title = `[LOCAL] ${document.title}`;
	}

	ReactDOM.render(<Controller />, root);
};

export { initialLoad };
