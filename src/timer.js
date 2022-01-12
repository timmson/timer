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
		remainingTimeSource: [0, 5]
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
		setState((prevState) => {

			if (prevState.status === Display.STARTED) {
				if (prevState.remainingTimeSource[0] > 0) {
					prevState.remainingTimeSource[0] = prevState.remainingTimeSource[0] - 1;
				} else {
					if (prevState.remainingTimeSource[1] > 0) {
						prevState.remainingTimeSource[1] = prevState.remainingTimeSource[1] - 1;
						prevState.remainingTimeSource[0] = 59;
					} else {
						prevState.status = Display.ALERTED;
						props.audio.play();
					}
				}
			}

			return {
				status: prevState.status,
				remainingTimeSource: prevState.remainingTimeSource
			};
		});
	}

	function toggleStart() {
		setState((prevState) => {
			if (prevState.remainingTimeSource.reduce((a, c) => a + c) === 0) {
				prevState.status = Display.STOPPED;
			} else {
				prevState.status = (prevState.status === Display.STOPPED ? Display.STARTED : Display.STOPPED);
			}
			return prevState;
		});

	}

	function setTime(value) {
		setState((prevState) => {
			prevState.status = Display.STARTED;
			prevState.remainingTimeSource = value.split(":").map((i) => parseInt(i, 10)).reverse();
			return prevState;
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