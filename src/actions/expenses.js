import { v4 as uuidv4 } from 'uuid'
import database from "../firebase/firebase";
import { getDatabase, ref, set, remove, update, onValue, off, push, onChildRemoved, onChildChanged, onChildAdded, get } from "firebase/database";


// -------Action Generators for Expenses-------

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
})

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData
        
        const expense = { description, note, amount, createdAt }

        return push(ref(database, 'expenses'), expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        return remove(ref(database, `expenses/${id}`)).then(() => {
            dispatch(removeExpense({ id }))
        })
    }
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

export const startSetExpenses = () => {
    return (dispatch) => {
        const expenses = []
        return get(ref(database, 'expenses')).then((snapshot) => {
            snapshot.forEach(childSnapshot => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });
            dispatch(setExpenses(expenses))
        })
    }
}