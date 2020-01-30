"use strict";

const makeRequest = (url, mimeType = "text/plain") => {

	// This function acts an API for making asynchronous XML HTTP requests.

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.overrideMimeType(mimeType);
		xhr.open("GET", url);

		xhr.onload = (e) => {
			resolve(xhr.responseText);
		};
		xhr.onerror = (e) => {
			reject(xhr.statusText);
		};

		xhr.send();
	});
};

export { makeRequest };
