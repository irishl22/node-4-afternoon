const swag = require('../models/swag')

module.exports = {
    search: (req, res) => {
        const { category } = req.query
        if(!category) {
            res.status(200).send(swag)
        } else {
            let filtered = swag.filter(item => item.category === category)
                res.status(200).send(filtered)
            }
        
    }
}