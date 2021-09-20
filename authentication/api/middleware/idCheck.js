const { isNaN } = require("../../../helpers")

let idCheck = (req, res, next) => {
    if (isNaN(req.body.id)) res.status(400).send("ID field must be an integer.")
    else next()
}
module.exports = idCheck
