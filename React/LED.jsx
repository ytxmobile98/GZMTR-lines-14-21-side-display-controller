"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType } from "../data/service-type-classes.js";
import { Station } from "../data/station-classes.js";

import { SERVICE_TYPES, DESTINATIONS } from "../data/PROCESSED-LINES-DATA.js";
const DEFAULT_SERVICE_TYPE = SERVICE_TYPES["不载客"];
const DEFAULT_DESTINATION = DESTINATIONS["不载客"];

class LEDServiceType extends React.PureComponent {

	render() {

		const serviceType = this.props.serviceType;
		TypeChecker.checkInstanceOf(serviceType, ServiceType);

		return (
			<div className="LED__service-type" data-js-service-type={serviceType.Chinese}>
				<div className="LED__service-type--Chinese">
					{serviceType.Chinese}
				</div>
				<div className="LED__service-type--English">
					{serviceType.English}
				</div>
			</div>
		);
	}
}

class LEDDestination extends React.PureComponent {
	constructor(props) {

		const destination = props.destination;
		TypeChecker.checkInstanceOf(destination, Station);

		super(props);

		const that = this;
		that.destArray = [destination.Chinese, destination.English];
		that.state = {
			currentIndex: 0,
			useT2TextSize: false,
		};
		that.flipInterval = Math.max(1000, props.flipInterval) || 2500; // in ms
		that.destTextRef = React.createRef();
		that.containerRef = props.containerRef;
	}

	setTimer() {
		const that = this;

		const getNextIndex = () => {
			if (that.destArray.length === 0) {
				throw new Error(`${that.destArray} is of length 0`);
			}
			return (that.state.currentIndex + 1) % (that.destArray.length);
		};

		const flipDisplay = () => {
			that.setState({
				currentIndex: getNextIndex(),
				useT2TextSize: false,
			});
			that.timer = window.setTimeout(flipDisplay, that.flipInterval);
		}
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

	setT2TextSize() {
		const destText = this.destTextRef.current;
		const container = this.containerRef.current;

		if (destText && container) {
			if (destText.scrollHeight > container.scrollHeight) {
				this.setState({
					useT2TextSize: true,
				});
			}
		}
	}

	componentDidMount() {
		this.resetTimer();
		this.setT2TextSize();
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	componentDidUpdate() {
		this.setT2TextSize();
	}

	render() {
		const destination = this.props.destination;
		TypeChecker.checkInstanceOf(destination, Station);

		return (
			<div className="LED__destination-container">
				<div
					className="LED__destination-text"
					data-js-t2-size={this.state.useT2TextSize ? true : null}
					ref={this.destTextRef}
				>
					{this.destArray[this.state.currentIndex]}
				</div>
			</div>
		);
	}
}

class LED extends React.PureComponent {

	constructor(props) {

		const serviceType = props.serviceType;
		TypeChecker.checkOptionalInstanceOf(serviceType, ServiceType);

		const destination = props.destination;
		TypeChecker.checkOptionalInstanceOf(destination, Station);

		const showContent = (props.showContent != undefined) ? props.showContent : true;

		super(props);

		this.state = {
			showContent: showContent,
			serviceType: serviceType || DEFAULT_SERVICE_TYPE,
			destination: destination || DEFAULT_DESTINATION,
		};
		this.refreshTime = Math.max(props.refreshTime, 1000) || 1000;
		this.containerRef = React.createRef();
		this.destRef = React.createRef();
	}

	/* Usage:
	Two parameters:
		updateDisplay(newServiceType, newDestination) OR
		updateDisplay(newDestination, newServiceType)

	One parameter:
		updateDisplay(newServiceType) OR
		updateDisplay(newDestination)
	*/
	updateDisplay(...args) {

		const that = this;

		const showUsageInfo = () => {
			throw new TypeError(`Usage:

				Two parameters:
					updateDisplay(newServiceType, newDestination) OR
					updateDisplay(newDestination, newServiceType)

				One parameter:
					updateDisplay(newServiceType) OR
					updateDisplay(newDestination)
			`);
		}

		if ((args.length !== 1) && (args.length !== 2)) {
			showUsageInfo();
		}

		else {

			// set current state

			args.forEach((arg) => {
				if (arg instanceof ServiceType) {
					that.setState({
						serviceType: arg,
					});
				}
				else if (arg instanceof Station) {
					that.setState({
						destination: arg,
					});
				}
				else {
					showUsageInfo();
				}
			});

			// refresh display

			const showContent = this.state.showContent;

			that.setState((prevState) => {
				return {
					showContent: false,
				}
			});

			window.setTimeout(() => {
				that.setState((prevState) => {
					return {
						showContent: showContent,
					}
				});
			}, that.refreshTime);
		}
	}

	render() {

		return (
			<div
				className="LED__container"
				ref={this.containerRef}
			>
				{ this.state.showContent ?
					<div className="LED__content">
						<LEDServiceType
							serviceType={this.state.serviceType}
						/>
						<LEDDestination
							destination={this.state.destination}
							flipInterval={this.props.flipInterval}
							containerRef={this.containerRef}
							ref={this.destRef}
						/>
					</div>
					: null
				}
			</div>
		);
	}
}

export { LEDServiceType, LEDDestination, LED };
