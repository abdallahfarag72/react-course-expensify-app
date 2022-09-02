import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import getVisibleExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";
import numeral from "numeral";

export const ExpensesSummary = (props) => {
    const s = props.expensesCount === 1 ? '' : 's'
    return (
        <div className="page-header">
         <div className="content-container">
          <h1 className="page-header__title">Viewing <span>{props.expensesCount}</span> expense{s} totalling <span>{numeral(props.expensesTotal / 100).format('$0,0.00')}</span></h1>
          <div className="page-header__actions" >
           <Link className="button" to='/create' >Add Expense</Link>
          </div>
         </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    return {
        expensesCount: visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)

