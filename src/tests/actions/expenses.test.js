import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startAddExpense, addExpense, removeExpense, editExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";
import { getDatabase, ref, set, remove, update, onValue, off, push, onChildRemoved, onChildChanged, onChildAdded } from "firebase/database";

const uid = 'testuid'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ description, amount, note, id, createdAt }) => {
        expensesData[id] = { description, amount, note, createdAt }
    })
    set(ref(database, `users/${uid}/expenses`), expensesData).then(() => done())
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
    const store = createMockStore(defaultAuthState)

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

        onValue(ref(database, `users/${uid}/expenses/${actions[0].expense.id}`), (snapshot) => {
            expect(snapshot.val()).toEqual(expenseData)
            done()
        }, {
            onlyOnce: true
        })
    })
})

test('should add default values to database and store', (done) => {
    const store = createMockStore(defaultAuthState)

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

        onValue(ref(database, `users/${uid}/expenses/${actions[0].expense.id}`), (snapshot) => {
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
    const store = createMockStore(defaultAuthState)
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
    const store = createMockStore(defaultAuthState)
    const id = expenses[2].id
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        })
        onValue(ref(database, `users/${uid}/expenses/${id}`), (snapshot) => {
            expect(snapshot.val()).toBeFalsy()
            done()
        }, {
            onlyOnce: true
        })
    })
})

test('should edit expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)

    const updates = {
        amount: 220000
    }

    const id = expenses[0].id

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })

        onValue(ref(database, `users/${uid}/expenses/${id}`), (snapshot) => {
            expect(snapshot.val().amount).toBe(updates.amount)
            done()
        }, {
            onlyOnce: true
        })
    })
})