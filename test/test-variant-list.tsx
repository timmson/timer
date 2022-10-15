import React from "react"
import PropTypes from "prop-types"
import renderer from "react-test-renderer"

import VariantList from "../src/variant-list"


function Variant(props) {
	return <div>{props.value}</div>
}

Variant.prototype.propTypes = {
	value: PropTypes.string
}

describe("VariantList should", () => {

	test("return variants", () => {
		const component = renderer.create(<VariantList variant={Variant} variants={[1, 2]}/>)
		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	})
})