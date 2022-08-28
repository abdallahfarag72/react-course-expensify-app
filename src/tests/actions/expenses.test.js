import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startAddExpense, addExpense, removeExpense, editExpense, setExpenses, startSetExpenses, startRemoveExpense } from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";
import { getDatabase, ref, set, remove, update, onValue, off, push, onChildRemoved, onChildChanged, onChildAdded } from "firebase/database";


const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ description, amount, note, id, createdAt }) => {
        expensesData[id] = { description, amount, note, createdAt }
    })
    set(ref(database, 'expenses'), expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense('abc123', { note: 'my new note' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: { note: 'my new note' }
    })
})

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    }) 
})

test('should add expense to database and store', (done) => {
    const store = createMockStore({})

    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions  = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })

        onValue(ref(database, `expenses/${actions[0].expense.id}`), (snapshot) => {
            expect(snapshot.val()).toEqual(expenseData)
            done()
        }, {
            onlyOnce: true
        })
    })
})

test('should add default values to database and store', (done) => {
    const store = createMockStore({})

    const expenseDefault = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        })

        onValue(ref(database, `expenses/${actions[0].expense.id}`), (snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefault)
            done()
        }, {
            onlyOnce: true
        })
    })
})

test('should setup set expenses action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore()
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        done()
    })
})

test('should remove expenses from firebase', (done) => {
    const store = createMockStore()
    const id = expenses[2].id
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        })
        onValue(ref(database, `expenses/${id}`), (snapshot) => {
            expect(snapshot.val()).toBeFalsy()
            done()
        }, {
            onlyOnce: true
        })
    })
})