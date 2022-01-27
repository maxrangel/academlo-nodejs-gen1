import { Fragment, useRef } from 'react';
import axios from 'axios';

// Components
import NavHeader from '../../components/UI/nav-header/nav-header.component';
import Input from '../../components/UI/input/input.component';
import Button from '../../components/UI/button/button.component';

import classes from './add-product.styles.module.css';

const AddProduct = () => {
	const imageInputRef = useRef();

	const onSubmitHandler = e => {
		e.preventDefault();

    console.log(imageInputRef.current);
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
				<Input label="Image" input={{ type: 'file', ref: imageInputRef }} />

				<Button label="Add product" />
			</form>
		</Fragment>
	);
};

export default AddProduct;
