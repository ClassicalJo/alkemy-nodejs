let authHeader = (req, res, next) => {
    if (!req.headers.authorization) res.status(401).send('Missing authorization code')
    else next()
}

module.exports = authHeader
