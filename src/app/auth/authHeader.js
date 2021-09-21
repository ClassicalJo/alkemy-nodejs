let authHeader = (req, res, next) => {
    if (!req.headers.authorization) {
        let error = new Error('Missing authorization header.')
        throw error
    }
    else next()
}

module.exports = authHeader
