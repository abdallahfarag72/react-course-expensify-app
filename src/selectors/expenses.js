import moment from "moment"
// -------Get Visible Expenses---------

export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true //if startDate is undefined, don't filter and return all expenses. if its a number, filter accordingly 
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt > b.createdAt ? -1 : 1 //sorting by most recent
        } else if (sortBy === 'amount') {
            return a.amount > b.amount ? -1 : 1 //sorting by highest amount
        }
    })
}