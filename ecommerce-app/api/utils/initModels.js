// Models
const { Cart } = require('../models/cart.model');
const { Order } = require('../models/order.model');
const { Product } = require('../models/product.model');
const { ProductImg } = require('../models/productImg.model');
const { ProductInOrder } = require('../models/productInOrder.model');
const { Sale } = require('../models/sales.model');
const { User } = require('../models/user.model');

const initModels = () => {
	// 1 User <--> Product M
	User.hasMany(Product);
	Product.belongsTo(User);

	// 1 User <--> Sale M
	User.hasMany(Sale);
	Sale.belongsTo(User);

	// 1 Sale <--> Product M
	Sale.hasMany(Product);
	Product.belongsTo(Sale);

	// 1 Product <--> ProductImg M
	Product.hasMany(ProductImg);
	ProductImg.belongsTo(Product);

	// 1 Cart <--> Product M
	Cart.hasMany(Product);
	Product.belongsTo(Cart);

	// 1 User <--> Cart 1
	User.hasOne(Cart);
	Cart.belongsTo(User);

	// 1 User <--> Order M
	User.hasMany(Order);
	Order.belongsTo(User);

	// 1 Order <--> ProductInOrder M
	Order.hasMany(ProductInOrder);
	ProductInOrder.belongsTo(Order);

	// 1 ProductInOrder <--> Product M
	ProductInOrder.hasMany(Product);
	Product.belongsTo(ProductInOrder);
};

module.exports = { initModels };
