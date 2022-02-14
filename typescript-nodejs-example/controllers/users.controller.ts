import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Models
import { User, UserInstance } from '../models/user.model';

// Utils
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { Email } from '../utils/email';

dotenv.config({ path: './config.env' });

declare global {
	namespace Express {
		interface Request {
			currentUser: UserInstance;
		}
	}
}

export const loginUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		// If user exists with given email
		const user = await User.findOne({ where: { email, status: 'available' } });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return next(new AppError('Credentials are not valid', 404));
		}

		// Generate JWT
		const token = await jwt.sign(
			{ id: user.id },
			process.env.JWT_SECRET as string,
			{
				expiresIn: process.env.JWT_EXPIRES_IN as string,
			}
		);

		const cookieOptions = {
			httpOnly: true,
			expires: new Date(
				Date.now() +
					+(process.env.JWT_COOKIE_EXPIRES_IN as string) * 60 * 60 * 1000
			),
			secure: false,
		};

		if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

		// http -> https
		res.cookie('jwt', token, cookieOptions);

		user.password = undefined as unknown as string;

		res.status(200).json({
			status: 'success',
			data: { user, token },
		});
	}
);

export const getUserById = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		const user = await User.findOne({
			attributes: { exclude: ['password'] },
			where: { id },
		});

		if (!user) {
			return next(new AppError('User not found', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				user,
			},
		});
	}
);

export const createUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, email, password, role } = req.body;

		const newUser: UserInstance = await User.create({
			name,
			email,
			password,
			role: role || 'standard',
		});

		// Remove password from response
		newUser.password = undefined as unknown as string;

		// Send welcome Email to user
		await new Email(newUser.email).sendWelcome(newUser.name, newUser.email);

		res.status(201).json({
			status: 'success',
			data: { user: newUser },
		});
	}
);

export const updateUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, email } = req.body;
		const { currentUser } = req;

		await currentUser.update({ name, email });

		res.status(204).json({ status: 'success' });
	}
);

export const disableUserAccount = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { currentUser } = req;

		await currentUser.update({ status: 'deleted' });

		res.status(204).json({ status: 'success' });
	}
);
