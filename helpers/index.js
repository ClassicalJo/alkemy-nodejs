function limitToFields(obj, fields) {
    let response = {}
    fields.forEach(key => {
        if (obj[key] !== undefined && obj[key].length > 0) response[key] = obj[key]
    })
    return response
}

function getFieldsFromModel(model) {
    return Object.keys(model.rawAttributes).filter(k => nonAvailableFields(k))
}

function getQueriableFieldsFromModel(model) {
    return fields = [...Object.keys(model.rawAttributes), 'order'].filter(k => nonAvailableFields(k))

}

function nonAvailableFields(field) {
    return field !== 'createdAt' && field !== 'updatedAt' && field !== 'id'
}

function hasQuery(obj) {
    return !!Object.keys(obj).length
}

function isArrayOfInts(arr) {
    let reducer = (a, b) => a && b
    let reduced = arr.reduce((a, b) => reducer(a, !isNaN(b), true))
    let isArray = arr instanceof Array
    return isArray && reduced
}

let helpers = {
    limitToFields,
    nonAvailableFields,
    getFieldsFromModel,
    getQueriableFieldsFromModel,
    hasQuery,
    isArrayOfInts,
}
module.exports = helpers
