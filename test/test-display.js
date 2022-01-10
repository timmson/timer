const React = require("react");
const PropTypes = require("prop-types");
const renderer = require("react-test-renderer");

const Display = require("../src/display");
const {getKeyValue} = require("eslint-plugin-react/lib/util/ast");

class MockDisplayValue extends React.Component {

	static propTypes = {
		value: PropTypes.string,
		style: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
	}


	render() {
		return <span style={this.props.style}> {this.props.value}</span>;
	}
}

describe("Display should", () => {

	test("return stopped timer", () => {
		const component = renderer.create(
			<Display displayValue={MockDisplayValue} status={Display.STOPPED} value={[0, 1]}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});

	test("return started timer", () => {
		const component = renderer.create(
			<Display displayValue={MockDisplayValue} status={Display.STARTED} value={[0, 1]}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});

	test("return alerted timer", () => {
		const component = renderer.create(
			<Display displayValue={MockDisplayValue} status={Display.ALERTED} value={[0, 0]}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});

	test("contain properties", () => {
		expect(Display.propTypes).toHaveProperty("status");
		expect(Display.propTypes).toHaveProperty("value");
		expect(Display.propTypes).toHaveProperty("onClick");
	});

});