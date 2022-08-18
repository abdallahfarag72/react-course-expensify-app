import getExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test('should return 0 if no expenses', () => {
    expect(getExpensesTotal([])).toBe(0)
})

test('should correctly add up a single expense', () => {
    expect(getExpensesTotal([expenses[0]])).toBe(expenses[0].amount)
})

test('should correctly add up multiple expenses', () => {
    expect(getExpensesTotal(expenses)).toBe(expenses.map(expense => expense.amount).reduce((a, b) => a + b))
})