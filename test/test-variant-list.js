const React = require("react");
const renderer = require("react-test-renderer");

const VariantList = require("../src/variant-list");
const PropTypes = require("prop-types");

class Variant extends React.Component {

	static propTypes = {
		value: PropTypes.string
	};

	render() {
		return (<div>{this.props.value}</div>);
	}
}

describe("VariantList should", () => {

	test("return variants", () => {
		const component = renderer.create(
			<VariantList variant={Variant} variants={[1, 2]}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});
});