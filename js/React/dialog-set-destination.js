"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType } from "../data/service-type-classes.js";
import { Station } from "../data/station-classes.js";

import { Dialog } from "./dialog.js";

class SetDestinationDialog extends React.Component {
	constructor(props) {
		super(props);

		TypeChecker.checkTypeOf(props.line, "string");
		TypeChecker.checkInstanceOf(props.serviceType, ServiceType);
		TypeChecker.checkInstanceOf(props.destination, Station);

		const that = this;

		that.dialogs = {
			setServiceType: Symbol(),
			setDestination: Symbol()
		};

		that.doneTexts = {
			nextStepText: "下一步",
			finishText: "完成"
		};

		that.state = {
			// Current dialog state
			currentDialog: that.dialogs.setDestination,
			handleGoBack: undefined,
			handleDone: that.goToSetServiceType,
			doneText: that.doneTexts.nextStepText,

			// Initialize using current operation information
			line: props.line,
			serviceType: props.serviceType,
			destination: props.destination
		};

		// Saving scrollTops for each scrolling field
		that.scrollTops = {
			lineSelector: 0,
			filterSelector: 0,
			destinationSelector: 0
		};
	}

	saveScrollTops(item, scrollTop) {
		// use 0 if converted to NaN
		this.scrollTops[item] = Number(scrollTop) || 0;
	}

	goToSetDestination() {
		this.setState({
			currentDialog: this.dialogs.setDestination,
			handleGoBack: undefined,
			handleDone: this.goToSetServiceType,
			doneText: this.doneTexts.nextStepText
		});
	}

	goToSetServiceType() {
		this.setState({
			currentDialog: this.dialogs.setServiceType,
			handleGoBack: this.goToSetDestination,
			handleDone: undefined,
			doneText: this.doneTexts.finishText
		});
	}

	updateOutputDisplay() {
		this.props.updateOutputDisplay(this.state.line, this.state.serviceType, this.state.destination);
	}

	close() {
		this.props.onClose();
	}

	render() {
		const that = this;
		const dialogs = that.dialogs;

		const title = (() => {
			switch (that.state.currentDialog) {
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

		return React.createElement(
			Dialog,
			{
				onGoBack: that.state.handleGoBack && that.state.handleGoBack.bind(that),
				title: title,

				onDone: that.state.handleDone && that.state.handleDone.bind(that),
				doneText: that.state.doneText,
				onClose: that.close.bind(that)
			},
			that.state.currentDialog === that.dialogs.setDestination ? React.createElement(
				"div",
				{ className: "set-destination-grid__container" },
				React.createElement(
					"div",
					{ className: "set-destination-grid__item set-destination-grid__item--header" },
					"\u7EBF\u8DEF"
				),
				React.createElement(
					"div",
					{ className: "set-destination-grid__item set-destination-grid__item--options-container" },
					React.createElement(
						"div",
						null,
						"\u4E0D\u8F7D\u5BA2"
					),
					React.createElement(
						"div",
						null,
						"14\u53F7\u7EBF"
					),
					React.createElement(
						"div",
						null,
						"21\u53F7\u7EBF"
					)
				),
				React.createElement(
					"div",
					{ className: "set-destination-grid__item set-destination-grid__item--header" },
					"\u7B5B\u9009\u5217\u8868"
				),
				React.createElement(
					"div",
					{ className: "set-destination-grid__item set-destination-grid__item--options-container" },
					React.createElement(
						"div",
						null,
						"\u7279\u522B\u670D\u52A1"
					),
					React.createElement(
						"div",
						null,
						"\u7279\u522B\u670D\u52A1"
					)
				),
				React.createElement(
					"div",
					{ className: "set-destination-grid__item set-destination-grid__item--header" },
					"\u76EE\u7684\u5730"
				),
				React.createElement(
					"div",
					{ className: "set-destination-grid__item set-destination-grid__item--options-container set-destination-grid__item--destinations" },
					React.createElement(
						"div",
						null,
						"\u4EAC\u6EAA\u5357\u65B9\u533B\u9662"
					),
					React.createElement(
						"div",
						null,
						"\u4EAC\u6EAA\u5357\u65B9\u533B\u9662"
					),
					React.createElement(
						"div",
						null,
						"\u4EAC\u6EAA\u5357\u65B9\u533B\u9662"
					)
				)
			) : null
		);
	}
}

export { SetDestinationDialog };