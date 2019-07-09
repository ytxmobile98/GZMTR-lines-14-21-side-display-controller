"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType, SERVICE_TYPES, Station, DESTINATIONS } from "../data/PROCESSED-LINES-DATA.js";
const DEFAULT_SERVICE_TYPE = SERVICE_TYPES["不载客"];
const DEFAULT_DESTINATION = DESTINATIONS["不载客"];

class LEDServiceType extends React.PureComponent {

	render() {

		const serviceType = this.props.serviceType;
		TypeChecker.checkInstanceOf(serviceType, ServiceType);

		return React.createElement(
			"div",
			{ className: "LED__service-type", "data-js-service-type": serviceType.Chinese },
			React.createElement(
				"div",
				{ className: "LED__service-type--Chinese" },
				serviceType.Chinese
			),
			React.createElement(
				"div",
				{ className: "LED__service-type--English" },
				serviceType.English
			)
		);
	}
}

class LEDDestination extends React.PureComponent {
	constructor(props) {

		const destination = props.destination;
		TypeChecker.checkInstanceOf(destination, Station);

		super(props);

		this.destArray = [destination.Chinese, destination.English];
		this.state = {
			currentIndex: 0,
			useT2TextSize: false
		};
		this.flipInterval = Math.max(1000, props.flipInterval) || 2500; // in ms
		this.destTextRef = React.createRef();
		this.containerRef = props.containerRef;
	}

	setTimeout() {
		const getNextIndex = () => {
			if (this.destArray.length === 0) {
				throw new Error(`${this.destArray} is of length 0`);
			}
			return (this.state.currentIndex + 1) % this.destArray.length;
		};

		const flipDisplay = () => {
			this.setState({
				currentIndex: getNextIndex(),
				useT2TextSize: false
			});
			this.timer = window.setTimeout(flipDisplay, this.flipInterval);
		};
		this.timer = window.setTimeout(flipDisplay, this.flipInterval);
	}

	clearTimeout() {
		window.clearTimeout(this.timer);
	}

	resetTimeout() {
		this.clearTimeout();
		this.setTimeout();
	}

	setT2TextSize() {
		const destText = this.destTextRef.current;
		const container = this.containerRef.current;

		if (destText && container) {
			if (destText.scrollHeight > container.scrollHeight) {
				this.setState({
					useT2TextSize: true
				});
			}
		}
	}

	componentDidMount() {
		this.resetTimeout();
		this.setT2TextSize();
	}

	componentWillUnmount() {
		this.clearTimeout();
	}

	componentDidUpdate() {
		this.setT2TextSize();
	}

	render() {
		const destination = this.props.destination;
		TypeChecker.checkInstanceOf(destination, Station);

		return React.createElement(
			"div",
			{ className: "LED__destination-container" },
			React.createElement(
				"div",
				{
					className: "LED__destination-text",
					"data-js-t2-size": this.state.useT2TextSize ? true : null,
					ref: this.destTextRef
				},
				this.destArray[this.state.currentIndex]
			)
		);
	}
}

class LED extends React.PureComponent {

	constructor(props) {

		const serviceType = props.serviceType || DEFAULT_SERVICE_TYPE;
		TypeChecker.checkInstanceOf(serviceType, ServiceType);

		const destination = props.destination || DEFAULT_DESTINATION;
		TypeChecker.checkInstanceOf(destination, Station);

		const showContent = !!props.showContent;

		super(props);

		this.state = {
			showContent: showContent
		};
		this.refreshTime = Math.max(props.refreshTime, 1000) || 1000;
		this.containerRef = React.createRef();
		this.destRef = React.createRef();
	}

	turnOnOffLED(newState) {
		this.setState({
			showContent: !!newState
		});
	}

	refreshDisplay(showingContent) {
		showingContent = !!showingContent;
		if (showingContent) {
			this.turnOnOffLED(false);
			window.setTimeout(() => {
				this.turnOnOffLED(showingContent);
			}, this.refreshTime);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const props = this.props;

		const serviceType = props.serviceType || DEFAULT_SERVICE_TYPE;
		TypeChecker.checkOptionalInstanceOf(serviceType, ServiceType);

		const destination = props.destination || DEFAULT_DESTINATION;
		TypeChecker.checkOptionalInstanceOf(destination, Station);

		if (props.showContent !== prevProps.showContent) {
			this.turnOnOffLED(!!props.showContent);
		}

		if (props.serviceType !== prevProps.serviceType || props.destination !== prevProps.destination) {
			this.refreshDisplay(props.showContent);
		}
	}

	render() {

		return React.createElement(
			"div",
			{
				className: "LED__container",
				ref: this.containerRef
			},
			this.state.showContent ? React.createElement(
				"div",
				{ className: "LED__content" },
				React.createElement(LEDServiceType, {
					serviceType: this.props.serviceType
				}),
				React.createElement(LEDDestination, {
					destination: this.props.destination,
					flipInterval: this.props.flipInterval,
					containerRef: this.containerRef,
					ref: this.destRef
				})
			) : null
		);
	}
}

export { LED };