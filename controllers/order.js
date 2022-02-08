const User = require("../model/user");
const Orders = require("../model/order")

exports.postOrders = async (req, res, next) => {
    const id = req.params.id;

    try {        
        let user = await User.findById(id).populate('cart.productId');
        if(!user) {
            return res.status(400).json({ message: 'User not exists..'});
        }

        const cart = user.cart;
        let orders = cart.map((item) => {
            return {
                title: item.productId.title,
                quantity: item.quantity,
                price: item.price,
                imageUrl: item.productId.imageUrl,
                description: item.productId.description
            };
        });

        let totalPrice = 0;
        for(let order of orders) {
            totalPrice += order.price*order.quantity;
        }

        orders = new Orders({
            user: {
                first_name: user.first_name,
                id: user._id
            },
            products: orders,
            totalPrice: totalPrice
        });

        await orders.save();

        user.cart = [];

        await user.save();

        res.status(200).json({ message: 'Success!!', orders: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};




exports.getOrders = async (req, res, next) => {
    try {        
        let orders = await Orders.find();
        if(!orders) {
            return res.status(400).json({ message: 'No Orders'});
        }

        orders = orders.map((order) => {
            return {
                id: order._id,
                user_id: order.user.id,
                first_name: order.user.first_name,
                products: order.products,
                totalPrice: order.totalPrice,
                created: order.createdAt
            };
        });

        res.status(200).json({ message: 'Success!!', orders: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


exports.getUserOrders = async (req, res, next) => {
    const id = req.params.id;

    try {        
        let orders = await Orders.find();
        if(!orders) {
            return res.status(400).json({ message: 'Orders not exists..'});
        }

        orders = orders.filter((order) => {
            if(order.user.id.toString() === id.toString()) {
                return order;
            }
        });

        orders = orders.map((order) => {
            if(order.user.id.toString() === id.toString()) {
                return {
                    id: order._id,
                    first_name: order.user.first_name,
                    sit: order.user.sit,
                    products: order.products,
                    totalPrice: order.totalPrice,
                    created: order.createdAt
                };
            }
        });

        res.status(200).json({ message: 'Success!!', orders: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


exports.cancelOrders = async (req, res, next) => {
    const id = req.params.id;

    try {        
        let orders = await Orders.findByIdAndDelete(id);
        if(!orders) {
            return res.status(400).json({ message: 'Orders not exists..'});
        }

        res.status(200).json({ message: 'Success!!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};



exports.situation=  async (req, res, next) => {
    const id = req.params.id;
    const sit = req.params.sit
    try {        
         
        let order = await Orders.findById(id);
     
 
              order.user.sit = sit
               order.save()
       
         
        res.status(200).json({ message: 'success!!'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

