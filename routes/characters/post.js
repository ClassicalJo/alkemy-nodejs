var axios = require('axios')
let post = (req, res, next) => {
    let token = req.headers.authorization
    axios.request({
        url: process.env.API_URL + '/characters',
        method: 'POST',
        headers: { 'Authorization': token },
    })
        .then(response => res.json(response.data))
        .catch(err => res.json({ error: 'error', message: err.message }))
}

module.exports = post
