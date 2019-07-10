"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType, Station, LineInfoWrapper } from "../data/processed-lines-data-classes.js";

const defaultDestination = LineInfoWrapper.getDefaultDest();
const defaultServiceType = LineInfoWrapper.getDefaultServiceType();

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

		super(props);

		const serviceType = props.serviceType || defaultServiceType;
		TypeChecker.checkInstanceOf(serviceType, ServiceType);

		const destination = props.destination || defaultDestination;
		TypeChecker.checkInstanceOf(destination, Station);

		const showContent = props.showContent == undefined || !!props.showContent;

		this.state = {
			showingContent: showContent
		};

		this.showContent = showContent;
		this.refreshTime = Math.max(props.refreshTime, 1000) || 1000;
		this.containerRef = React.createRef();
		this.destRef = React.createRef();

		this.timeout = null;
	}

	turnOnOffLED(newState) {
		this.setState({
			showingContent: !!newState
		});
	}

	refreshDisplay(showingContent) {
		showingContent = !!showingContent;
		if (showingContent) {
			this.turnOnOffLED(false);
			window.clearTimeout(this.timeout);
			this.timeout = window.setTimeout(() => {
				this.turnOnOffLED(showingContent);
			}, this.refreshTime);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const props = this.props;

		const serviceType = props.serviceType || defaultServiceType;
		TypeChecker.checkOptionalInstanceOf(serviceType, ServiceType);

		const destination = props.destination || defaultDestination;
		TypeChecker.checkOptionalInstanceOf(destination, Station);

		if (props.showContent !== prevProps.showContent) {
			this.turnOnOffLED(!!props.showContent);
		}

		if (props.serviceType !== prevProps.serviceType || props.destination !== prevProps.destination) {
			this.refreshDisplay(this.showContent);
		}
	}

	componentWillUnmount() {
		window.clearTimeout(this.timeout);
	}

	render() {

		return React.createElement(
			"div",
			{
				className: "LED__container",
				ref: this.containerRef
			},
			this.state.showingContent ? React.createElement(
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