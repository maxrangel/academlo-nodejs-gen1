import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

// Routers
import { userRouter } from './routes/users.routes';
import { productsRouter } from './routes/products.routes';
import { ordersRouter } from './routes/orders.routes';

// Controllers
import { globalErrorHandler } from './controllers/error.controller';

// Utils
import { AppError } from './utils/appError';

// Init app
const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Global Middlewares
// Implement CORS
app.use(cors()); //Access-Control-Allow-Origin *
app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

// Limit requests from same API
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000, // 1 hour
	message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from the body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());

// Compress responses
app.use(compression());

// Endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/orders', ordersRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export { app };
