const React = require("react");
const useState = require("react").useState;
const useEffect = require("react").useEffect;
const PropTypes = require("prop-types");

const Variant = require("./variant");
const VariantList = require("./variant-list");
const Display = require("./display");
const Time = require("./time");
const Version = require("./version");

const Timer = (props) => {

	let [state, setState] = useState({
		status: Display.STOPPED,
		remainingTimeSource: [0, 5],
		currentTime: 0
	});

	useEffect(() => {
		const startStopHandler = (event) => {
			if (event.key === " ") {
				toggleStart();
				event.preventDefault();
			}
		};
		props.window.addEventListener("keyup", startStopHandler);

		const timerID = setInterval(() => tick(), 1000);

		return () => {
			props.window.removeEventListener("keyup", startStopHandler);
			clearTimeout(timerID);
		};

	});

	function tick() {
		state.currentTime++;

		if (state.status === Display.STARTED) {
			if (state.remainingTimeSource[0] > 0) {
				state.remainingTimeSource[0] = state.remainingTimeSource[0] - 1;
			} else {
				if (state.remainingTimeSource[1] > 0) {
					state.remainingTimeSource[1] = state.remainingTimeSource[1] - 1;
					state.remainingTimeSource[0] = 59;
				} else {
					state.status = Display.ALERTED;
					props.audio.play();
				}
			}
		}

		setState({
			status: state.status,
			remainingTimeSource: state.remainingTimeSource,
			currentTime: state.currentTime
		});
	}

	function toggleStart() {
		if (state.remainingTimeSource.reduce((a, c) => a + c) === 0) {
			state.status = Display.STOPPED;
		} else {
			state.status = (state.status === Display.STOPPED ? Display.STARTED : Display.STOPPED);
		}

		setState({
			status: state.status,
			remainingTimeSource: state.remainingTimeSource,
			currentTime: state.currentTime
		});
	}

	function setTime(value) {
		state.status = Display.STARTED;
		state.remainingTimeSource = value.split(":").map((i) => parseInt(i, 10)).reverse();

		setState({
			status: state.status,
			remainingTimeSource: state.remainingTimeSource,
			currentTime: state.currentTime
		});
	}


	return (
		<div className="container-fluid">
			<VariantList variant={Variant} variants={props.variants} onClick={setTime}/>
			<Display status={state.status} value={state.remainingTimeSource} onClick={toggleStart}/>
			<Time moment={props.moment().locale("ru")}/>
			<Version year={"2022"} oldUrl={"./old/"}/>
		</div>
	);
};

Timer.propTypes = {
	audio: PropTypes.object.isRequired,
	window: PropTypes.object.isRequired,
	moment: PropTypes.func.isRequired,
	variants: PropTypes.array.isRequired
};

module.exports = Timer;