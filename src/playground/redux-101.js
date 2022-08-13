import { createStore } from "redux";


// action generators
const incrementBy = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementBy = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount = ({ count }) => ({
    type: 'SET',
    count
})

const resetCount = () => ({
    type: 'RESET'
})

// Reducers
// 1. reducers are pure functions(They depend only on the inputs and return an output)
// 2. never change state or action(don't reassign them instead mutate them or get a value from them)

const counterReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state
    }
}

const store = createStore(counterReducer)


const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(incrementBy())

store.dispatch(incrementBy({ incrementBy: 5 }))

store.dispatch(resetCount())

store.dispatch(decrementBy())

store.dispatch(decrementBy({ decrementBy: 5 }))

store.dispatch(setCount({ count: 101 }))

