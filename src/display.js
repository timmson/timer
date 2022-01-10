const React = require("react");
const PropTypes = require("prop-types");


class Display extends React.Component {

	static STOPPED = "stopped";
	static STARTED = "started";
	static ALERTED = "alerted";

	static propTypes = {
		status: PropTypes.string.isRequired,
		value: PropTypes.array.isRequired,
		onClick: PropTypes.func.isRequired
	};

	constructor(props, context) {
		super(props, context);
	}

	getValueAt(index) {
		return this.props.value[index].toString().padStart(2, "0");
	}

	getSeconds() {
		return this.getValueAt(0);
	}

	getMinutes() {
		return this.getValueAt(1);
	}


	render() {
		const computedClassName = this.props.status !== Display.ALERTED ? "timer normal" : "timer alert";
		const dotStyle = this.props.status === Display.STARTED ? {animation: "blinker 1s linear infinite"} : {};

		return (
			<div className="row">
				<div className="col">
					<div className={computedClassName} onClick={this.props.onClick}>
						{this.getMinutes()}
						<span style={dotStyle}>{":"}</span>
						{this.getSeconds()}
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Display;