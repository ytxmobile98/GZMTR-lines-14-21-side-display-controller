"use strict";

import { TypeChecker } from "./type-checker.js";
import { ServiceType } from "./data/service-type-classes.js";
import { Station } from "./data/station-classes.js";

class LEDServiceType extends React.Component {
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

class LEDDestination extends React.Component {
	constructor(props) {
		const destination = props.destination;
		TypeChecker.checkInstanceOf(destination, Station);

		super(props);

		const that = this;
		that.destArray = [destination.Chinese, destination.English];
		that.state = {
			currentIndex: 0
		};
		that.flipInterval = Math.max(1000, props.flipInterval) || 2500; // in ms
	}

	setTimer() {
		const that = this;

		const getNextIndex = () => {
			return (that.state.currentIndex + 1) % that.destArray.length;
		};

		const flipDisplay = () => {
			that.setState({
				currentIndex: getNextIndex()
			});
			that.timer = window.setTimeout(flipDisplay, that.flipInterval);
		};
		that.timer = window.setTimeout(flipDisplay, that.flipInterval);
	}

	clearTimer() {
		const that = this;
		window.clearTimeout(that.timer);
	}

	resetTimer() {
		this.clearTimer();
		this.setTimer();
	}

	componentDidMount() {
		this.resetTimer();
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	render() {
		return React.createElement(
			"div",
			{ className: "LED__destination-container" },
			React.createElement(
				"div",
				{ className: "LED__destination-text" },
				this.destArray[this.state.currentIndex]
			)
		);
	}
}

class LED extends React.Component {
	constructor(props) {
		const serviceType = props.serviceType;
		TypeChecker.checkInstanceOf(serviceType, ServiceType);
		const destination = props.destination;
		TypeChecker.checkInstanceOf(destination, Station);

		super(props);

		this.state = {
			showContent: this.props.showContent !== undefined ? !!this.props.showContent : false,
			serviceType: serviceType,
			destination: destination
		};
		this.refreshTime = Math.max(props.refreshTime, 1000) || 1000;
	}

	updateDisplay(...args) {

		/* Usage:
  	updateDisplay(newServiceType, newDestination) OR
  	updateDisplay(newDestination, newServiceType) OR
  	updateDisplay(newServiceType) OR
  	updateDisplay(newDestination)
  */

		const that = this;

		const showUsageInfo = () => {
			throw new TypeError(`Usage:
				updateDisplay(newServiceType, newDestination) OR
				updateDisplay(newDestination, newServiceType) OR
				updateDisplay(newServiceType) OR
				updateDisplay(newDestination)
			`);
		};

		if (args.length !== 1 && args.length !== 2) {
			showUsageInfo();
		} else {
			args.forEach(arg => {
				if (arg instanceof ServiceType) {
					that.setState({
						serviceType: arg
					});
				} else if (arg instanceof Station) {
					that.setState({
						destination: arg
					});
				} else {
					showUsageInfo();
				}
			});

			that.setState(prevState => {
				return {
					showContent: false
				};
			});

			window.setTimeout(() => {
				that.setState(prevState => {
					return {
						showContent: true
					};
				});
			}, that.refreshTime);
		}
	}

	render() {
		return React.createElement(
			"div",
			{ className: "LED__container" },
			this.state.showContent ? React.createElement(
				"div",
				{ className: "LED__content" },
				React.createElement(LEDServiceType, {
					serviceType: this.state.serviceType
				}),
				React.createElement(LEDDestination, {
					destination: this.state.destination,
					flipInterval: this.props.flipInterval
				})
			) : null
		);
	}
}

ReactDOM.render(React.createElement(LED, {
	showContent: true,
	serviceType: new ServiceType("快速", "Express"),
	destination: new Station("东风", "Dongfeng")
}), document.getElementById("js-root"));
