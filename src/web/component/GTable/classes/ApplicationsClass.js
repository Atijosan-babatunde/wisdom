import { humanReadableTime } from '../../../../helpers/date';
import { formatCurrency } from '../../../../helpers/util';

export default class ApplicationsClass {
    constructor({ id, createdAt, amount, status, applicationType: { name }, customer: { user: { firstName, lastName } } }) {
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
            { data: 'price', title: "Ticket Price" },
            { data: 'type', title: "Trip Type" },
            { data: 'status', title: "Status", searchable: false },
            { data: 'action', title: "Action", type: "html" }
        ]
}