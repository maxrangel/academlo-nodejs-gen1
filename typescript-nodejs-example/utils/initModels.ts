// Models
import { Cart } from '../models/cart.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { ProductImg } from '../models/productImg.model';
import { ProductInOrder } from '../models/productInOrder.model';
import { ProductInCart } from '../models/productInCart.model';
import { ProductSold } from '../models/productSold.model';
import { Sale } from '../models/sales.model';
import { User } from '../models/user.model';

const userRelations = () => {
	// 1 User <--> Product M
	User.hasMany(Product, { foreignKey: 'userId' });
	Product.belongsTo(User, { targetKey: 'id' });

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

	// 1 Product <--> ProductInOrder M
	Product.hasOne(ProductInOrder);
	ProductInOrder.belongsTo(Product);

	// 1 Product <--> ProductInCart 1
	Product.hasOne(ProductInCart);
	ProductInCart.belongsTo(Product);

	// 1 ProductSold <--> Product 1
	Product.hasOne(ProductSold);
	ProductSold.belongsTo(Product);
};

const orderRelations = () => {
	// 1 Order <--> ProductInOrder M
	Order.hasMany(ProductInOrder, {
		foreignKey: 'orderId',
		sourceKey: 'id',
	});
	ProductInOrder.belongsTo(Order, { targetKey: 'id' });
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

export { initModels };
