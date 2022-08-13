import React from "react";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";
import { ExpenseList } from "../../components/ExpenseList";

test('Should render expense list with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should render expene list without expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />)
    expect(wrapper).toMatchSnapshot()
})