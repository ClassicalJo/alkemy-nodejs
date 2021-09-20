function limitToFields(obj, fields) {
    let response = {}
    fields.forEach(key => {
        if (obj[key] !== undefined) response[key] = obj[key]
    })
    return response
}

function getAvailableFields(model) {
    return Object.keys(model.rawAttributes).filter(k => nonAvailableFields(k))
}

function nonAvailableFields(field) {
    return field !== 'createdAt' && field !== 'updatedAt' && field !== 'id'
}

function hasQuery(obj){
    return !!Object.keys(obj).length
}

let helpers = { limitToFields, nonAvailableFields, getAvailableFields, hasQuery }
module.exports = helpers
