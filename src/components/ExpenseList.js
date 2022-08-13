import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";


// exporting unconnected version (unconnected from the store) for testing only 
export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No Expenses</p>
            )   :   (
                props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
            )
        }
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

// exporting the connected version to be used in the app
export default connect(mapStateToProps)(ExpenseList)

