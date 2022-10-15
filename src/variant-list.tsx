import React from "react"

type VariantListProps = {
	variant: React.Component,
	variants: Array<number>
}

export default function VariantList(props: VariantListProps) {

	const Variant = props.variant

	const toZeroPads = (number) => `${number.toString().padStart(2, "0")}:00`

	return (
		<div className="row">
			{props.variants.map((v, i) => <Variant key={i} value={toZeroPads(v)}/>)}
		</div>
	)
}
