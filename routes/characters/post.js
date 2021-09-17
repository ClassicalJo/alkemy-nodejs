var axios = require('axios')
let post = (req, res, next) => {
    let APIEndpoint = process.env.API_URL + '/characters'
    let options = { headers: { 'Authorization': req.headers.authorization } }
    axios
        .post(APIEndpoint, req.body, options)
        .then(response => res.json(response.data))
        .catch(err => res.json({ error: 'error', message: err.message }))
}

module.exports = post
