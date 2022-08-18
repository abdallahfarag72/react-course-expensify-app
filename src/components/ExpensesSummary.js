import React from "react";
import { connect } from "react-redux";
import getVisibleExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";
import numeral from "numeral";

export const ExpensesSummary = (props) => {
    const s = props.expensesCount === 1 ? '' : 's'
    return (
        <div>
            <h1>Viewing {props.expensesCount} expense{s} totalling {numeral(props.expensesTotal / 100).format('$0,0.00')}</h1>
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

