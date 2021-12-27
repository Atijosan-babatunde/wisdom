const data = require('../resources/province.json');

export const formatCurrency = (number, options) => {
    return number && number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export const isNullOrEmpty = (text) => {
    console.log(text)
    console.log(text === null || text === "" || text?.trim() === "");
    return text === null || text === "" || text?.trim() === "" || text === undefined;
}


export const Province = {
    getStates: () => ({
        slug: Object.keys(data),
        name: Object.values(data).map(v => v.name),
    }),
    getStateByName: (name) => data[name],
    getStateById: (id) => Object.values(data).find(v => v.id.toString() === id.toString()),
    getStateByCapital: (capital) => Object.values(data).find(v => v.capital.toLowerCase() === capital.toLowerCase()),
    getLocalGovtCount: (name) => data[name].locals.length,
    getLocalGovtByName: (name) => data[name].locals,
    searchByState: (name) => Object.values(data).filter(v => v.name.toLowerCase().indexOf(name.toLowerCase()) > -1),
}