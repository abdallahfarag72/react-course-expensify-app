import React from "react";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, startRemoveExpense } from "../actions/expenses";
import { useNavigate } from "react-router-dom";

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.id, expense)
        this.props.navigate('/')
    }
    onClick = () => {
        this.props.startRemoveExpense({ id: this.props.id })
        this.props.navigate('/')
    }

    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onClick}>Remove</button>
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
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    startRemoveExpense: ({ id }) => dispatch(startRemoveExpense({ id }))
})

export default connect(mapStateToProps, mapDispatchToProp)(WithNavigateAndParams)