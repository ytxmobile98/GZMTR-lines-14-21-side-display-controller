"use strict";

import { readTranslationsData } from "../data/TRANSLATIONS-DATA.js";
import { loadLinesInfo } from "../data/LINES-DATA.js";

import { Controller } from "./controller.js";

const root = document.getElementById("js-root");

const initialLoad = async () => {
	await readTranslationsData();
	await loadLinesInfo();
	ReactDOM.render(React.createElement(Controller, null), root);
};

export { initialLoad };