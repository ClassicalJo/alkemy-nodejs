var axios = require('axios')
let post = (req, res, next) => {
    let APIEndpoint = process.env.API_URL + '/movies'
    let options = { headers: { 'Authorization': req.headers.authorization } }
    
    axios
        .post(APIEndpoint, req.body, options)
        .then(response => res.json(response.data))
        .catch(err => next(err))
}

module.exports = post
