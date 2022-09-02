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
                <div className="page-header" >
                    <div className="content-container" >
                        <h1 className="page-header__title" >Add Expense</h1>
                    </div>
                </div>
                <div className="content-container" >
                    <ExpenseForm
                        onSubmit={this.onSubmit}
                    />
                </div>
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