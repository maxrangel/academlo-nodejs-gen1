// Models
const { Cart } = require('../models/cart.model');
const { Order } = require('../models/order.model');
const { Product } = require('../models/product.model');
const { ProductImg } = require('../models/productImg.model');
const { ProductInOrder } = require('../models/productInOrder.model');
const { ProductInCart } = require('../models/productInCart.model');
const { ProductSold } = require('../models/productSold.model');
const { Sale } = require('../models/sales.model');
const { User } = require('../models/user.model');

const userRelations = () => {
	// 1 User <--> Product M
	User.hasMany(Product);
	Product.belongsTo(User);

	// 1 User <--> Sale M
	User.hasMany(Sale);
	Sale.belongsTo(User);

	// 1 User <--> Cart 1
	User.hasOne(Cart);
	Cart.belongsTo(User);

	// 1 User <--> Order M
	User.hasMany(Order);
	Order.belongsTo(User);
};

const productRelations = () => {
	// 1 Product <--> ProductImg M
	Product.hasMany(ProductImg);
	ProductImg.belongsTo(Product);

	// 1 ProductInOrder <--> Product M
	ProductInOrder.hasMany(Product);
	Product.belongsTo(ProductInOrder);

	// 1 Cart <--> ProductInCart 1
	ProductInCart.hasOne(Product, { foreignKey: 'id', sourceKey: 'productId' });
	Product.belongsTo(ProductInCart, { targetKey: 'productId' });

	// 1 ProductSold <--> Product 1
	ProductSold.hasOne(Product);
	Product.belongsTo(ProductSold);
};

const orderRelations = () => {
	// 1 Order <--> ProductInOrder M
	Order.hasMany(ProductInOrder);
	ProductInOrder.belongsTo(Order);
};

const cartRelations = () => {
	// 1 Cart <--> ProductInCart M
	Cart.hasMany(ProductInCart);
	ProductInCart.belongsTo(Cart);
};

const saleRelations = () => {
	// 1 Sale <--> ProductSold M
	Sale.hasMany(ProductSold);
	ProductSold.belongsTo(Sale);
};

const initModels = () => {
	userRelations();
	productRelations();
	orderRelations();
	cartRelations();
	saleRelations();
};

module.exports = { initModels };
