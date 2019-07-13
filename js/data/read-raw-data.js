"use strict";

const makeRequest = (url, mimeType = "text/plain") => {
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

const parallelProcess = async () => {
	let destinations, serviceTypes;
	const mimeType = "text/csv";

	await Promise.all([
		(async () => {
			destinations = await makeRequest("./RAW-DATA/DESTINATIONS.csv", mimeType);
		})(),
		(async () => {
			serviceTypes = await makeRequest("./RAW-DATA/SERVICE-TYPES.csv", mimeType);
		})(),
	]);
	console.log(destinations)
	console.log(serviceTypes);
}

parallelProcess();
