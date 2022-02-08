const Product = require('../model/product');
const User = require('../model/user');
const path = require("path");


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;  
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl
    //  userId: req.user
    });
    product
      .save()
     res.status(200).json({message :'product insert  successfully'})

      .then(result => {
        // console.log(result);
        console.log('Created Product');
        res.redirect('/admin/products');
      })
      .catch(err => {
        console.log(err);
      });
  };



  exports.getAllProducts = ( (req,res,next) => {
 Product.find()
  // res.status(200).json(product)
  .then( productsAll => {
    res.status(200).json(productsAll)
  })
  .catch(err => {console.log(err)})
})


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  
  Product.findByIdAndRemove(prodId)
    .then((del) => {
      res.status(200).json(del , {message : "Product deleted "})
     
      console.log('DESTROYED PRODUCT');
  
    })
    .catch(err => console.log(err));
};


exports.getById =  (req,res,next) =>{
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(result => {
    // res.status(200).json(result , {message : "Product get "})
    console.log(result)
  })
  .catch(err => console.log(err));
}



exports.updateProduct = async (req,res,next)=>

{

    let prodId=req.params.productId;

    try{



        let updatedProduct=new Product({



            title:req.body.title,

   

            price:req.body.price,

   

            description:req.body.description,

             

            imageUrl:req.body.imageUrl


        });

        let product= await Product.findById(prodId);

        if(!product)

        {

            return res.status(404).send('Product does not exists');

        }

        product=await  Product.findByIdAndUpdate(prodId,

          {

              $set:{
                  
                  title:updatedProduct.title? updatedProduct.title : product.title,

                  price:updatedProduct.price? updatedProduct.price : product.price,

                  description:updatedProduct.description? updatedProduct.description : product.description,

                  imageUrl:updatedProduct.imageUrl? updatedProduct.imageUrl : product.imageUrl,
                  totalPrice:updatedProduct.totalPrice? updatedProduct.totalPrice : product.totalPrice

              }

          },{new:true});

          res.status(200).json(product);

  }

 

  catch(error){

      console.log(error);

      res.status(500).send('update failed');

  }
};






exports.postCartItems = async (req, res, next) => {
  const id = req.params.id;
  const productId = req.params.productId;
  const quantity = req.params.quantity;
  

  try {        
      let user = await User.findById(id);
      if(!user) {
          return res.status(400).json({ message: 'User not exists..'});
      }

      let product = await Product.findById(productId);
      // console.log(product);

      if(user.cart.length == 0) {
          user.cart.push({ productId: productId, title: product.title,quantity:quantity,Productprice: product.price,price: product.price,description: product.description,imageUrl: product.imageUrl });
      }
      else {
          const cart = user.cart.filter((items) => { return items.productId.toString() !== productId.toString() });
          if(cart.length >= 0) {
            cart.push({ productId: productId, title: product.title,quantity:quantity,Productprice: product.price,price: product.price,description: product.description,imageUrl: product.imageUrl });
              user.cart = cart;
          }
      }

      await user.save();

      res.status(200).json({ message: 'Success!!' });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
  }
};






exports.getCart =  (req,res,next) =>{
  let userId=req.query.userId

  User.findById(userId)
  .then(result => {
    res.status(200).json(result )
  })
  .catch(err => console.log(err));
}




exports.delete = async (req, res, next) => {
  const id = req.params.id;
  const productId = req.params.productId;

  try {        
      let user = await User.findById(id);
      if(!user) {
          return res.status(400).json({ message: 'User not exists..'});
      }

      const cart = user.cart.filter((items) => {

         return items.productId.toString() !== productId.toString() 
        
        });

      user.cart = cart;

      await user.save();

      res.status(200).json({ message: 'Success!!' });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
  }
};

exports.postQtyItems = async (req, res, next) => {

  const id = req.params.id;

  const productId = req.params.productId;

  const quantity = req.params.quantity;
  try {        

    let user = await User.findById(id).populate('cart.productId');

    if(!user) {

        return res.status(400).json({ message: 'User not exists..'});

}

    const cart = user.cart;

    const updatedCart = cart.map((item) => {

        if(item.productId._id.toString() === productId.toString()) {

            if(item.quantity == 0) {

                item.quantity += quantity;

                item.Productprice = item.quantity * item.productId.Productprice;

            } else {

                item.quantity = 0;

                item.quantity += quantity;

                item.Productprice = item.quantity * item.productId.Productprice;
              }

            return item; }

        return item; });

    let totalPrice = 0;   
    for(let product of updatedCart) {

      totalPrice += product.productId.price * quantity; }

  user.cart = updatedCart;

  await user.save();

  res.status(200).json({ message: 'Success!!',totalPrice : totalPrice} );

} catch (error) {

  console.log(error);

  res.status(500).json({ error: error.message });

}};




