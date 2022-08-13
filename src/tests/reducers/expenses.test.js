import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";
import moment from "moment"

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should remove expene by id', () => {
    const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expene if id is not found', () => {
    const action = { type: 'REMOVE_EXPENSE', id: '-1' }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should an expense', () => {
    const expense = {
        description: 'Apple Pie',
        note: '',
        amount: 230,
        createdAt: moment().add(2, 'days').valueOf()
    }
    const action = { type: 'ADD_EXPENSE', expense }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, expense])
})

test('should edit an expense', () => {
    const updates = {
        description: 'Rent for July'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        updates,
        id: 2
    }
    const state = expensesReducer(expenses, action)
    expect(state[0]).toEqual({
        ...expenses[0],
        ...updates
    })
})

test('should not edit expense if expense is not found', () => {
    const updates = {
        description: 'Rent for July'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        updates,
        id: -1
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})