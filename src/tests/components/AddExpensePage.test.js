import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses"

let startAddExpense, navigate, wrapper
beforeEach(() => {
    startAddExpense = jest.fn()
    navigate = jest.fn()
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} navigate={navigate} />)
})

test('should render add expense page correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
    expect(navigate).toHaveBeenLastCalledWith('/')
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0])
})