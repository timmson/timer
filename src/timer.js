const React = require("react");
const PropTypes = require("prop-types");

const Variant = require("./variant");
const VariantList = require("./variant-list");
const Display = require("./display");
const Time = require("./time");
const Version = require("./version");

class Timer extends React.Component {

	static propTypes = {
		audio: PropTypes.object,
		window: PropTypes.object,
		moment: PropTypes.func,
		variants: PropTypes.array
	};

	constructor(props, context) {
		super(props, context);

		this.setTime = this.setTime.bind(this);
		this.toggleStart = this.toggleStart.bind(this);

		this.state = {
			displayStatus: Display.STOPPED,
			remainingTimeSource: [0, 5]
		};
	}

	componentDidMount() {
		this.props.window.addEventListener("keyup", (event) => {
			if (event.key === " ") {
				this.toggleStart();
				event.preventDefault();
			}
		});

		this.timerID = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		let state = this.state;

		if (state.displayStatus === Display.STARTED) {
			if (state.remainingTimeSource[0] > 0) {
				state.remainingTimeSource[0] = state.remainingTimeSource[0] - 1;
			} else {
				if (state.remainingTimeSource[1] > 0) {
					state.remainingTimeSource[1] = state.remainingTimeSource[1] - 1;
					state.remainingTimeSource[0] = 59;
				} else {
					state.displayStatus = Display.ALERTED;
					this.props.audio.play();
				}
			}
		}

		this.setState(state);
	}

	toggleStart() {
		let state = this.state;

		if (state.remainingTimeSource.reduce((a, c) => a + c) === 0) {
			state.displayStatus = Display.STOPPED;
		} else {
			state.displayStatus = state.displayStatus === Display.STOPPED ? Display.STARTED : Display.STOPPED;
		}

		this.setState(state);
	}

	setTime(v) {
		this.setState({
			displayStatus: Display.STARTED,
			remainingTimeSource: v.target.outerText.split(":").map((i) => parseInt(i, 10)).reverse()
		});
	}

	render() {
		return (
			<div className="container-fluid">

				<VariantList variant={Variant} onClick={this.setTime} variants={this.props.variants}/>

				<Display onClick={this.toggleStart} status={this.state.displayStatus} value={this.state.remainingTimeSource}/>

				<Time moment={this.props.moment().locale("ru")}/>

				<Version year={"2022"} oldUrl={"./old/"}/>
			</div>
		);
	}
}

module.exports = Timer;