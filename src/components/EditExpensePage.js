import React from "react";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import { useNavigate } from "react-router-dom";

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.id, expense)
        this.props.navigate('/')
    }
    onClick = () => {
        this.props.startRemoveExpense({ id: this.props.id })
        this.props.navigate('/')
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onClick}>Remove Expense</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // let { id } = useParams();
    // return {
    //     expense: state.expenses.find(expense => {
    //         return expense.id === id 
    //     }),

    // }
    
    
    // for some reason this code solved the hooks error
    const params = { id: window.location.pathname.split("/")[2] }
    return {
        expense: state.expenses.find((expense) => expense.id === params.id)
    }
}

const WithNavigateAndParams = (props) => {
    const { id } = useParams()
    const navigate = useNavigate()
    return <EditExpensePage {...props} navigate={navigate} id={id} />
}

const mapDispatchToProp = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: ({ id }) => dispatch(startRemoveExpense({ id }))
})

export default connect(mapStateToProps, mapDispatchToProp)(WithNavigateAndParams)