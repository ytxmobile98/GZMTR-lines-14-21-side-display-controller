"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, Station } from "../data/PROCESSED-LINES-DATA.js";

import { StatusCell, StatusGridContainer, StatusContainer } from "./status-grid.js";
import { LED } from "./LED.js";
import { RadioGroup, RadioItem } from "./radio-group.js";

class ServiceTypeSelector extends React.Component {

	constructor(props) {
		super(props);
		this.previewLEDRef = React.createRef();
	}

	updatePreviewLED(serviceType, destination) {
		TypeChecker.checkInstanceOf(serviceType, ServiceType);
		TypeChecker.checkInstanceOf(destination, Station);
	}

	render() {

		const serviceTypes = this.props.serviceTypes;
		TypeChecker.checkArrayType(serviceTypes, ServiceType);

		const hasBorder = true;

		const handleUpdateServiceType = e => {
			this.props.updateServiceType(e.target.value);
		};

		const serviceTypeItems = serviceTypes.map(serviceType => {
			return React.createElement(RadioItem, {
				name: "serviceType",
				value: serviceType.Chinese,
				hasBorder: hasBorder,
				checked: this.props.serviceType === serviceType,
				onClick: handleUpdateServiceType,
				text: serviceType.Chinese,
				key: serviceType.Chinese,
				ref: React.createRef()
			});
		});

		const line = this.props.line;
		const destination = this.props.destination;
		const serviceType = this.props.serviceType;

		return React.createElement(
			React.Fragment,
			null,
			React.createElement(
				"div",
				{ className: "service-type-selector" },
				React.createElement(
					RadioGroup,
					{ header: "\u9009\u62E9\u8F66\u79CD" },
					serviceTypeItems
				)
			),
			React.createElement(
				StatusContainer,
				null,
				React.createElement(
					StatusGridContainer,
					{ sectionHeader: "\u5DF2\u9009\u5185\u5BB9" },
					React.createElement(StatusCell, {
						itemHeader: "\u7EBF\u8DEF",
						itemText: line,
						dataTag: "status-line",
						dataValue: line
					}),
					React.createElement(StatusCell, {
						itemHeader: "\u76EE\u7684\u5730",
						itemText: destination.Chinese
					}),
					React.createElement(StatusCell, {
						itemHeader: "\u8F66\u79CD",
						itemText: serviceType.Chinese,
						dataTag: "status-service-type",
						dataValue: serviceType.Chinese
					})
				)
			),
			React.createElement(
				"div",
				{ className: "LED-preview" },
				React.createElement(
					"div",
					{ className: "warning-notes" },
					"\u9884\u89C8\uFF08\u8BF7\u70B9\u51FB\u201C\u5B8C\u6210\u201D\u4EE5\u4FDD\u5B58\uFF09"
				),
				React.createElement(LED, {
					serviceType: serviceType,
					destination: destination
				})
			)
		);
	}

}

export { ServiceTypeSelector };