exports.formatUserCart = ({ id, totalPrice, productsInCarts }) => {
	const formattedProducts = productsInCarts.map(
		({ product, id, price, quantity, productId }) => {
			const { name, description, category } = product;

			return { id, price, quantity, productId, name, description, category };
		}
	);

	return { id, totalPrice, products: formattedProducts };
};
