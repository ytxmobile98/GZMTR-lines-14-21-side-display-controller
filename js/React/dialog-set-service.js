"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, SERVICE_TYPES, Station, DESTINATIONS, LINES_INFO } from "../data/PROCESSED-LINES-DATA.js";

import { Dialog } from "./dialog.js";
import { SetDestinationGrid } from "./dialog-set-destination-grid.js";

// Dialogs
const setDestination = Symbol();
const setServiceType = Symbol();

// Texts on done
const nextStepText = "下一步";
const finishText = "完成";

class SetServiceDialog extends React.Component {
	constructor(props) {
		super(props);

		TypeChecker.checkInstanceOf(props.serviceType, ServiceType);
		TypeChecker.checkInstanceOf(props.destination, Station);

		this.initialLine = String(props.line || ""); // this property is kept to determine whether or not it is a cross-line service

		this.state = {
			currentDialog: setDestination,

			// Handle navigation
			handleGoBack: undefined,
			handleDone: this.goToSetServiceType,
			doneText: nextStepText,

			// Initialize service data using current operation information
			savedLine: this.initialLine,
			savedFilterName: "",
			savedDestination: props.destination || DESTINATIONS["不载客"],
			savedServiceType: props.serviceType || SERVICE_TYPES["不载客"],

			// Save scroll tops
			savedLineSelScrTop: 0,
			savedfilterSelScrTop: 0,
			savedDestSelScrTop: 0
		};
	}

	saveSelections(line, filterName, destination, serviceType) {
		TypeChecker.checkInstanceOf(destination, Station);
		TypeChecker.checkInstanceOf(serviceType, ServiceType);

		this.setState({
			savedLine: String(line || ""),
			savedFilterName: String(filterName || ""),
			savedDestination: destination,
			savedServiceType: serviceType
		});
	}

	saveScrollTops(lineSelScrTop, filterSelScrTop, destSelScrTop) {
		this.setState({
			savedLineSelScrTop: Number(lineSelScrTop || 0),
			savedfilterSelScrTop: Number(filterSelScrTop || 0),
			savedDestSelScrTop: Number(destSelScrTop || 0)
		});
	}

	goToSetDestination() {
		this.setState({
			currentDialog: setDestination,

			handleGoBack: undefined,
			handleDone: this.goToSetServiceType,
			doneText: nextStepText
		});
	}

	goToSetServiceType() {
		this.setState({
			currentDialog: setServiceType,

			handleGoBack: this.goToSetDestination,
			handleDone: this.updateOutputDisplay,
			doneText: finishText
		});
	}

	updateOutputDisplay() {
		const line = this.state.savedLine;
		const serviceType = this.state.savedServiceType;
		const destination = this.state.savedDestination;

		// update output display in the parent component
		this.props.updateOutputDisplay(line, serviceType, destination);
	}

	close() {
		this.props.onClose();
	}

	render() {
		const title = (() => {
			switch (this.state.currentDialog) {
				case setDestination:
					return "选择目的地";
					break;
				case setServiceType:
					return "选择车种";
					break;
				default:
					return null;
					break;
			};
		})();

		return React.createElement(
			Dialog,
			{
				onGoBack: this.state.handleGoBack && this.state.handleGoBack.bind(this),
				title: title,

				onDone: this.state.handleDone && this.state.handleDone.bind(this),
				doneText: this.state.doneText,
				onClose: this.close.bind(this)
			},
			this.state.currentDialog === setDestination ? React.createElement(SetDestinationGrid, {
				initialLine: this.initialLine,

				line: this.state.savedLine,
				filterName: this.state.savedFilterName,

				saveSelections: this.saveSelections.bind(this),
				saveScrollTops: this.saveScrollTops.bind(this)
			}) : null,
			this.state.currentDialog === setServiceType ? React.createElement(
				React.Fragment,
				null,
				React.createElement(
					"div",
					null,
					this.state.savedLine
				),
				React.createElement(
					"div",
					null,
					this.state.savedFilterName
				),
				React.createElement(
					"div",
					null,
					this.state.savedDestination.Chinese
				),
				React.createElement(
					"div",
					null,
					this.state.savedServiceType.Chinese
				)
			) : null
		);
	}
}

export { SetServiceDialog };