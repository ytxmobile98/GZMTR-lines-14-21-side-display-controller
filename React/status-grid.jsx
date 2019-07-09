"use strict";

class StatusCell extends React.PureComponent {
	constructor(props) {
		super(props);
		this.itemTextRef = React.createRef();
	}

	updateDataTag() {
		const dataTag = this.props.dataTag ?
			`data-js-${this.props.dataTag}` : undefined;
		const dataValue = this.props.dataValue;

		const itemTextElement = this.itemTextRef.current;
		itemTextElement.removeAttribute(this.dataTag);

		if (!!dataTag) {
			this.dataTag = dataTag;
			this.dataValue = dataValue;
			itemTextElement.setAttribute(dataTag, dataValue);
		}
	}

	componentDidMount() {
		this.updateDataTag();
	}

	componentDidUpdate() {
		this.updateDataTag();
	}

	render() {
		return (
			<React.Fragment>
				<div className="status__item-header">
					{this.props.itemHeader}
				</div>
				<div className="status__item-text" ref={this.itemTextRef}>
					{this.props.itemText}
				</div>
			</React.Fragment>
		);
	}
}

class StatusGridContainer extends React.PureComponent {
	render() {
		return (
			<div className="status__grid-container">
				<div className="status__section-header">{this.props.sectionHeader}</div>
				{this.props.children}
			</div>
		);
	}
}

class StatusContainer extends React.PureComponent {
	render() {
		return (
			<div className="status__container">
				{this.props.children}
			</div>
		);
	}
}

export { StatusCell, StatusGridContainer, StatusContainer };
