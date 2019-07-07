"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType, Station } from "../data/PROCESSED-LINES-DATA.js";

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

		TypeChecker.checkTypeOf(props.line, "string");
		TypeChecker.checkInstanceOf(props.serviceType, ServiceType);
		TypeChecker.checkInstanceOf(props.destination, Station);

		this.state = {
			// Current dialog state
			currentDialog: setDestination,

			// Handling navigation
			handleGoBack: undefined,
			handleDone: this.goToSetServiceType,
			doneText: nextStepText,

			// Initialize using current operation information
			line: String(props.line || ""),
			filterName: "",
			destination: props.destination,
			serviceType: props.serviceType
		};

		// Saving scrollTops for each scrolling field
		this.scrollTops = {
			lineSelector: 0,
			filterSelector: 0,
			destSelector: 0
		};
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
			}
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
			this.state.currentDialog === setDestination ? React.createElement(SetDestinationGrid, { line: this.state.line }) : null
		);
	}
}

export { SetServiceDialog };