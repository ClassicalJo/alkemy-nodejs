var axios = require('axios');
var { verifier, challenge } = require('./verifier')

const auth0 = async (req, res, next) => {
    var code = req.query.code;
    if (!code) {
        res.redirect('http://localhost:5500/auth/login')
    }
    const params = new URLSearchParams()
    params.append('grant_type', "authorization_code")
    params.append('client_id', process.env.AUTH0_CLIENT_ID)
    params.append('client_secret', process.env.AUTH0_SECRET)
    params.append('code', code)
    params.append('redirect_uri', 'http://localhost:5500')
    params.append('code_verifier', verifier)


    axios.post(process.env.AUTH0_ISSUER + "/oauth/token", params)
        .then(payload => {
            req.oauth = payload.data
            next()
        })
        .catch(err => next(err))

}

module.exports = auth0
