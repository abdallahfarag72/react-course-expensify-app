import moment from "moment"

export default [{
    id: '2',
    description: 'Rent',
    note: '',
    amount: 19542,
    createdAt: 0
}, {
    id: '3',
    description: 'Coffee',
    note: '',
    amount: 230,
    createdAt: moment(0).add(4, 'days').valueOf()
}, {
    id: '4',
    description: 'Gum',
    note: '',
    amount: 1234568,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}]