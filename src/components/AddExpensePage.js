import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startAddExpense } from "../actions/expenses";

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense)
        this.props.navigate('/')
    }

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}


const mapDispatchToProp = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
})

const WithNavigate = (props) => {
    const navigate = useNavigate()
    return <AddExpensePage {...props} navigate={navigate} />
}

export default connect(undefined, mapDispatchToProp)(WithNavigate)