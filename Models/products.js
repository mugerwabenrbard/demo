const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    label: {type:String, required: true},
    brand: {type:String, required: true},
    name: {type:String, required: true},
    price: {type:Number, required: true},
    ingredients: {type:String, required: false},
    numberInStock: {type:Number, required: false, default: 1},
    description: {type:String, required: true},
    image: {
        publicID:{type:String, required:true},
        url:{type:String, required:true}
    },
    featured: {type:Boolean, required: true},
}, {timestamps:true})

module.exports = mongoose.model('product', productSchema)