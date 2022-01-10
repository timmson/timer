const React = require("react");
const PropTypes = require("prop-types");

const Variant = (props) =>
	<div className="variants col-sm">
		<a href="#" onClick={() => props.onClick(props.value)}>{props.value}</a>
	</div>;

Variant.propTypes = {
	value: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

module.exports = Variant;