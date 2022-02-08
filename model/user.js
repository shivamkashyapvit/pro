const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  role : {type: String, default: null},
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  cart: [{
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    title: {
      type: String,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1 ,
    },
    
    price: {
      type: Number,
      ref: "Product",
      required: true,
    },
    Productprice: {
      type: Number,
      required: true,
    },
   
    description: {
      type: String,
      ref: "Product",
      required: true,
    },
    imageUrl: {
      type: String,
      ref: "Product",
      required: true,
    }
}]
 
},{
  timestamps: true
});

module.exports = mongoose.model("user", userSchema);
