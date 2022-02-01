import React from "react";
import PropTypes from "prop-types";

export default function VariantList(props) {

	const Variant = props.variant;

	const toZeroPads = (number) => `${number.toString().padStart(2, "0")}:00`;

	return (
		<div className="row">
			{props.variants.map((v, i) => <Variant key={i} value={toZeroPads(v)}/>)}
		</div>
	);
}

VariantList.propTypes = {
	variant: PropTypes.any.isRequired,
	variants: PropTypes.array.isRequired
};