import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses"

let wrapper, navigate, id, editExpense, removeExpense
beforeEach(() => {
    editExpense = jest.fn()
    removeExpense = jest.fn()
    navigate = jest.fn()
    id = { id: jest.fn() }
    wrapper = shallow(<EditExpensePage editExpense={editExpense} removeExpense={removeExpense} navigate={navigate} id={id.id} />)
})

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(editExpense).toHaveBeenLastCalledWith(id.id, expenses[1])
    expect(navigate).toHaveBeenLastCalledWith('/')
})

test('should handle remove expense', () => {
    wrapper.find('button').prop('onClick')()
    expect(removeExpense).toHaveBeenLastCalledWith(id)
    expect(navigate).toHaveBeenLastCalledWith('/')
})