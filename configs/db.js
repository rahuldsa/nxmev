const mongoose = require('mongoose')
const connection = mongoose.connect('mongodb+srv://rahul:rahul@cluster0.otd8es0.mongodb.net/nxmev?retryWrites=true&w=majority')

module.exports = {
    connection
}