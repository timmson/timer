const React = require("react");
const PropTypes = require("prop-types");

const VariantList = (props) => {
	const Variant = props.variant;

	const toZeroPads = (number) => `${number.toString().padStart(2, "0")}:00`;

	return (
		<div className="row">
			{props.variants.map((v, i) => <Variant key={i} onClick={props.onClick} value={toZeroPads(v)}/>)}
		</div>
	);
};

VariantList.propTypes = {
	variant: PropTypes.any.isRequired,
	variants: PropTypes.array.isRequired,
	onClick: PropTypes.func
};

module.exports = VariantList;