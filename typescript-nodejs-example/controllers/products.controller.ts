import { Request, Response, NextFunction } from 'express';
import { ref, uploadBytes } from 'firebase/storage';

// Models
import { Product } from '../models/product.model';
import { ProductImg } from '../models/productImg.model';
import { User } from '../models/user.model';

// Utils
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { filterObj } from '../utils/filterObj';
import { firebaseStorage } from '../utils/firebase';

export const getAllProducts = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const products = await Product.findAll({
			where: { status: 'active' },
			include: [{ model: User, attributes: { exclude: ['password'] } }],
		});

		res.status(200).json({
			status: 'success',
			data: { products },
		});
	}
);

export const getProductDetails = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		const product = await Product.findOne({
			where: { id },
			include: [
				{ model: User, attributes: { exclude: ['password'] } },
				{ model: ProductImg },
			],
		});

		if (!product) {
			return next(new AppError('No product found', 404));
		}

		res.status(200).json({
			status: 'success',
			data: { product },
		});
	}
);

export const createProduct = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, description, price, quantity, category } = req.body;
		const { currentUser } = req;

		const newProduct = await Product.create({
			name,
			description,
			price,
			quantity,
			category,
			userId: currentUser.id,
		});

		// Save imgs path
		if (req.files) {
			const imgsPromises = req.files.productImgs.map(async img => {
				const imgName = `/img/products/${newProduct.id}-${currentUser.id}-${img.originalname}`;
				const imgRef = ref(firebaseStorage, imgName);

				const result = await uploadBytes(imgRef, img.buffer);

				await ProductImg.create({
					productId: newProduct.id,
					imgPath: result.metadata.fullPath,
				});
			});
			await Promise.all(imgsPromises);
		}

		res.status(201).json({ status: 'success', data: { newProduct } });
	}
);

export const updateProduct = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { product } = req;

		interface FilterProduct {
			name?: string;
			description?: string;
			price?: string;
			quantity?: number;
			category?: string;
		}

		const filteredObj: FilterProduct = filterObj(
			req.body,
			'name',
			'description',
			'price',
			'quantity',
			'category'
		);

		if (filteredObj.quantity && filteredObj.quantity < 0) {
			return next(new AppError('Invalid product quantity', 400));
		}

		await product.update({
			...filteredObj,
		});

		res.status(204).json({ status: 'success' });
	}
);

export const disableProduct = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { product } = req;

		await product.update({ status: 'deleted' });

		res.status(204).json({ status: 'success' });
	}
);

export const getUserProducts = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// Based on req.currentUser, get the user's products based on its id
		const { currentUser } = req;

		const products = await Product.findAll({
			where: { userId: currentUser.id },
		});

		res.status(200).json({
			status: 'success',
			data: { products },
		});
	}
);
