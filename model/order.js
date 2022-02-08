const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
   
    user: {
        first_name: {
            type: String,
        },
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        sit: {
            type: 'string',
            default:"pending"
        }
    },
    products: [{
        title: {
            type: 'string',
            required: true
        },
        quantity: {
            type: 'number',
            default: 0
        },
        description: {
            type: 'string',
            required: true
        },
        price: {
            type: 'number',
            required: true
        },
        imageUrl: {
            type: 'string',
            required: true
        }
       
    }],
    totalPrice: {
        type: 'number',
    }
}, {
    timestamps: true
});

module.exports= mongoose.model('Orders', ordersSchema);
