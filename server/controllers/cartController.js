const swag = require('../models/swag')

module.exports = {
    add: (req, res) => {
        const { id } = req.query
        const { user } = req.session

        const index = user.cart.findIndex(swag => swag.id == id)
        if(index === -1) {
            const selected = swag.find(swag => swag.id == id)
            user.cart.push(selected)
            user.total += selected.price
        } 

        res.status(200).send(user)
    },
    delete: (req, res) => {
        const { id } = req.query
        const { user } = req.session

        const index = user.cart.findIndex(swag => swag.id == id)
        const selected = swag.find(swag => swag.id == id)
        if(index !== -1) {
            user.cart.splice(index, 1)
            user.total -= selected.price
        } 

        res.status(200).send(user)
    },
    checkout: (req, res) => {
        const { user } = req.session
        user.cart = []
        user.total = 0

        res.send(user)
    }
}