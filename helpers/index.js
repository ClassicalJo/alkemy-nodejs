function limitToFields(obj, fields) {
    let response = {}
    fields.forEach(key => {
        if (obj[key] !== undefined) response[key] = obj[key]
    })
    return response
}

function getAvailableFields(model) {
    return Object.keys({ ...model.rawAttributes, order: "DESC" }).filter(k => nonAvailableFields(k))
}

function nonAvailableFields(field) {
    return field !== 'createdAt' && field !== 'updatedAt' && field !== 'id'
}

function hasQuery(obj) {
    return !!Object.keys(obj).length
}

function isArrayOfInts(arr) {
    let reducer = (a, b) => a && b
    let reduced = arr.reduce((a, b) => reducer(a, !Number.isNaN(Number(b)), true))
    let isArray = arr instanceof Array
    return isArray && reduced
}

let helpers = { limitToFields, nonAvailableFields, getAvailableFields, hasQuery, isArrayOfInts }
module.exports = helpers
