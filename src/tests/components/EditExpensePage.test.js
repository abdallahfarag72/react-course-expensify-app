import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses"

let wrapper, navigate, id, startEditExpense, startRemoveExpense
beforeEach(() => {
    startEditExpense = jest.fn()
    startRemoveExpense = jest.fn()
    navigate = jest.fn()
    id = { id: jest.fn() }
    wrapper = shallow(<EditExpensePage startEditExpense={startEditExpense} startRemoveExpense={startRemoveExpense} navigate={navigate} id={id.id} />)
})

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(startEditExpense).toHaveBeenLastCalledWith(id.id, expenses[1])
    expect(navigate).toHaveBeenLastCalledWith('/')
})
