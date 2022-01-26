const greet = (name: string): string => {
	return name.toUpperCase();
};

const myName: string = 'Text';
const myAge: number = 23;
const isSoftware: boolean = true;
const hobbies: string[] = ['gym', 'videogames'];
const myUser: { name: string; age: number } = { name: 'Max', age: 12 };

const myNameUppercase = greet('Max');
