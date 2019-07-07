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
			savedLineSelectorScrollTop: 0,
			savedfilterSelectorScrollTop: 0,
			savedDestSelectorScrollTop: 0
		};
	}

	saveSelections(line) {
		this.setState({
			savedLine: line
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
		this.props.updateOutputDisplay(this.state.line, this.state.serviceType, this.state.destination);
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
			this.state.currentDialog === setDestination ? React.createElement(SetDestinationGrid, { line: this.state.savedLine,
				saveSelections: this.saveSelections.bind(this)
			}) : null,
			this.state.currentDialog === setServiceType ? React.createElement(
				"div",
				null,
				this.state.savedLine
			) : null
		);
	}
}

export { SetServiceDialog };