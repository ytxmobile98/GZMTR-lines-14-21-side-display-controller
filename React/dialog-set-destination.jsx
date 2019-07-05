"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType, Station } from "../data/PROCESSED-LINES-DATA.js";

import { Dialog } from "./dialog.js";
import { SetDestinationGrid } from "./dialog-set-destination-grid.js";

class SetDestinationDialog extends React.Component {
	constructor(props) {
		super(props);

		TypeChecker.checkTypeOf(props.line, "string");
		TypeChecker.checkInstanceOf(props.serviceType, ServiceType);
		TypeChecker.checkInstanceOf(props.destination, Station);

		const that = this;

		that.dialogs = {
			setServiceType: Symbol(),
			setDestination: Symbol(),
		};

		that.doneTexts = {
			nextStepText: "下一步",
			finishText: "完成",
		};

		that.state = {
			// Current dialog state
			currentDialog: that.dialogs.setDestination,
			handleGoBack: undefined,
			handleDone: that.goToSetServiceType,
			doneText: that.doneTexts.nextStepText,

			// Initialize using current operation information
			line: String(props.line || ""),
			filterName: "",
			serviceType: props.serviceType,
			destination: props.destination,
		};


		// Saving scrollTops for each scrolling field
		that.scrollTops = {
			lineSelector: 0,
			filterSelector: 0,
			destSelector: 0,
		};
	}

	goToSetDestination() {
		this.setState({
			currentDialog: this.dialogs.setDestination,
			handleGoBack: undefined,
			handleDone: this.goToSetServiceType,
			doneText: this.doneTexts.nextStepText,
		});
	}

	goToSetServiceType() {
		this.setState({
			currentDialog: this.dialogs.setServiceType,
			handleGoBack: this.goToSetDestination,
			handleDone: undefined,
			doneText: this.doneTexts.finishText,
		});
	}

	updateOutputDisplay() {
		this.props.updateOutputDisplay(
			this.state.line,
			this.state.serviceType,
			this.state.destination,
		);
	}

	close() {
		this.props.onClose();
	}

	render() {
		const that = this;
		const dialogs = that.dialogs;

		const title = (() => {
			switch(that.state.currentDialog) {
				case dialogs.setDestination:
					return "选择目的地";
					break;
				case dialogs.setServiceType:
					return "选择车种";
					break;
				default:
					return null;
					break;
			}
		})();

		return (
			<Dialog
				onGoBack={that.state.handleGoBack &&
					that.state.handleGoBack.bind(that)}
				title={title}

				onDone={that.state.handleDone &&
					that.state.handleDone.bind(that)}
				doneText={that.state.doneText}
				onClose={that.close.bind(that)}
			>
				{that.state.currentDialog ===
					that.dialogs.setDestination ?

					<SetDestinationGrid />
				: null}

			</Dialog>
		);
	}
}

export { SetDestinationDialog };
