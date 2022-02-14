const greet = (name: string, age: number) => {
	console.log(`Hello! My name is ${name}. I'm ${age} years old`);
};

greet('Max', 23);

// Arrays and objects
const users: string[] = ['Max', 'John'];
const pets: Array<string | number> = ['Dog', 'Cat', 1];

interface Post {
	title: string;
	content: string;
	status: 'active' | 'deleted';
}

const userPost: Post = {
	title: 'A new post',
	content: 'This is a TypeScript post',
	status: 'active',
};

const userPost2: Post = {
	title: 'Post 2',
	content: 'Another post',
	status: 'active',
};

const posts: Post[] = [
	{
		title: 'A new post',
		content: 'This is a TypeScript post',
		status: 'active',
	},
];
