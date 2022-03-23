import { humanReadableTime } from '../../../../helpers/date';
import { formatCurrency } from '../../../../helpers/util';

/**
 * All Application class must have a static `getColumns` function
 */
export default class TransactionsClass {
    constructor({ id, createdAt, amount, status, application:{ applicationType: { name }}, user: { firstName, lastName } }) {
        this.date = humanReadableTime(createdAt).fulldate;
        this.name = `${firstName.toLowerCase()} ${lastName.toLowerCase()}`;
        this.price = `NGN ${formatCurrency(amount)}`;
        this.type = name.toLowerCase();
        this.status = status.toLowerCase();
        this.action = id
        // this.action = () => {
        //     return ("<i class='fa-regular fs-12 fa-eye'></i></a>")
        // }
    }

    static getColumns =
        [
            { data: 'date', title: "Date" },
            { data: 'name', title: "Customer Name" },
            { data: 'price', title: "Amount Paid Out" },
            { data: 'type', title: "Loan ID" },
            { data: 'status', title: "Due Date", searchable: false },
            { data: 'action', title: "Action", type: "html" }
        ]
}