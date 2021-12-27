export const humanReadableTime = (date) => {
    date = new Date(date);
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return {
        fulldate: day + ' ' + monthNames[monthIndex] + ' ' + year,
        day,
        month: monthNames[monthIndex],
        year
    }
}

export const addDate = (date, add, type='months') => {
    date = new Date(date);
    switch(type){
        case 'monthly':
            return new Date(date.setMonth(date.getMonth() + add));
        case 'daily':
            return new Date(date.setDate(date.getDate() + add));
        case 'years':
            return new Date(date.setFullYear(date.getFullYear() + add));
        default:
            return date;
    }
}