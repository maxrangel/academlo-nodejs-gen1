import { Fragment, useRef } from 'react';
import axios from 'axios';

// Components
import NavHeader from '../../components/UI/nav-header/nav-header.component';
import Input from '../../components/UI/input/input.component';
import Button from '../../components/UI/button/button.component';

import classes from './add-product.styles.module.css';

const AddProduct = () => {
	const imageInputRef = useRef();

	const onSubmitHandler = async e => {
		e.preventDefault();

		const productData = {
			file: imageInputRef.current.files[0],
			name: 'Book',
			description: 'An awesome book',
			price: 12.99,
			quantity: 5,
			category: 'Reading',
		};

		try {
			const res = await axios({
				method: 'POST',
				url: 'http://localhost:4000/api/v1/products',
				data: productData,
				headers: {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQzMzMxMjcyLCJleHAiOjE2NDMzNDIwNzJ9.ySbnzN3L_HUSI05d5BB0ikSmJt0ncvVuD8l5PxM_DVI',
				},
			});

			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Fragment>
			<NavHeader />

			<form onSubmit={onSubmitHandler} className={classes['add-product-form']}>
				<h2>Add a new product</h2>
				<Input label="Name" input={{ type: 'text' }} />
				<Input label="Description" input={{ type: 'text' }} />
				<Input label="Price" input={{ type: 'number' }} />
				<Input label="Quantity" input={{ type: 'number' }} />
				<Input
					label="Image"
					input={{ type: 'file', accept: 'image/*', ref: imageInputRef }}
				/>

				<Button label="Add product" />
			</form>
		</Fragment>
	);
};

export default AddProduct;
