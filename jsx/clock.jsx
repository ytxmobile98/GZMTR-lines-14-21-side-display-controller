"use strict";

class Clock extends React.PureComponent {

	constructor(props) {
		super(props);
		this.days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		this.state = {
			date: new Date(),
		};
	}

	componentDidMount() {
		this.tick();
	}

	componentWillUnmount() {
		window.clearTimeout(this.timer);
	}

	tick() {
		this.setState({
			date: new Date(),
		});
		this.timer = window.setTimeout(() => {
			this.tick();
		}, 10);
	}

	render() {
		const dateObj = this.state.date;

		const addLeadingZero = (num) => {
			return String((Number(num) < 10 ? "0" : null) + num);
		}

		const year = dateObj.getFullYear();
		const month = addLeadingZero(dateObj.getMonth() + 1);
		const date = addLeadingZero(dateObj.getDate());

		const dateStr = `${year}-${month}-${date}`;
		const dayStr = this.days[dateObj.getDay()];
		const timeStr = `${dateObj.toTimeString().split(" ", 1)[0]}`;

		return (
			<div className="clock">
				<div className="clock__date">{dateStr}</div>
				<div className="clock__day">{dayStr}</div>
				<div className="clock__time">{timeStr}</div>
			</div>
		);
	}
}

export { Clock };
