"use strict";

class WarningNote extends React.PureComponent {
	render() {
		return (
			<div className="notes--warning">
				{this.props.content}
			</div>
		)
	}
}

export { WarningNote };
