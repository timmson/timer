const React = require("react");
const PropTypes = require("prop-types");


const Display = (props) => {

	const getValueAt = (index) => props.value[index].toString().padStart(2, "0");
	const getSeconds = () => getValueAt(0);
	const getMinutes = () => getValueAt(1);

	const computedClassName = props.status !== Display.ALERTED ? "timer normal" : "timer alert";
	const dotStyle = props.status === Display.STARTED ? {animation: "blinker 1s linear infinite"} : {};

	return (
		<div className="row">
			<div className="col">
				<div className={computedClassName} onClick={props.onClick}>
					{getMinutes()}
					<span style={dotStyle}>{":"}</span>
					{getSeconds()}
				</div>
			</div>
		</div>
	);
};

Display.STOPPED = "stopped";
Display.STARTED = "started";
Display.ALERTED = "alerted";

Display.propTypes = {
	status: PropTypes.string.isRequired,
	value: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired
};

module.exports = Display;