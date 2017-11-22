/*export default class Main {
    constructor() {
        console.log('Typescript Webpack starter launched');
    }
}

let start = new Main();*/

import { Category } from './enums';
import { Book, DamageLogger, Author, Librarian } from './interfaces';
import { UniversityLibrarian, ReferenceItem } from './classes';


function getAllBooks(): Book[] {

	let books = [
		{id: 1, title: "A", author: "a", available: true, category: Category.Fiction},
		{id: 2, title: "B", author: "b", available: false, category: Category.Fiction},
		{id: 3, title: "C", author: "c", available: true, category: Category.Poetry},
		{id: 4, title: "D", author: "d", available: false, category: Category.Fiction},
	];

	return books;
}

function logFirstAvailable(books: any): void {
	let numOfBooks: number = books.length;
	let firstAvailable: string;

	for(let cb of books) {
		if(cb.available) {
			firstAvailable = cb.title;
			break;
		}
	}

	console.log(`Total Books : ${numOfBooks}`);
	console.log(`First Available : ${firstAvailable}`);
}

function getBookTitlesByCategory(categoryFilter: Category): Array<string> {

	console.log(`Getting books in category: ${Category[categoryFilter]}`);

	const allBooks = getAllBooks();

	let filteredTitles = allBooks.filter(book => book.category == categoryFilter);

	return filteredTitles.map(t => t.title);

}

function logBookTitles(titles: string[]): void {
	titles.forEach(title => console.log(title));
}

function getBookById(id: number): Book {
	const allBooks = getAllBooks();
	return allBooks.filter(book => book.id == id)[0];
}

function createCustomerId(name: string, id: number): string {
	return name + id;
}

function createCustomer(name: string, age?: number, city?: string): void {
	console.log(`Creating customer: ${name}`);

	if(age) {
		console.log(`Age: ${age}`);
	}

	if(city) {
		console.log(`City: ${city}`);
	}
}

function checkOutBooks(customer: string, ...bookIds: number[]): string[] {
	console.log(`Checking out books for ${customer}`);

	let checkedOutBooks = bookIds.map(id => {
		let book = getBookById(id);
		if(book.available) {
			return book.title;
		}
	});

	return checkOutBooks;
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(bookProperty: any): string[] {
	const allBooks = getAllBooks();
	let foundTitles: string[] = [];

	if(typeof bookProperty == 'string') {
		foundTitles = allBooks.map(book => {
			if(book.author == bookProperty) {
				return book.title;
			}
		});
	} else if(typeof bookProperty == 'boolean') {
		foundTitles = allBooks.map(book => {
			if(book.available) {
				return book.title;
			}
		});
	}

	return foundTitles;
}

function printBook(book: Book): void {
	console.log(`${book.title} by ${book.author}`);
}

let ref = new ReferenceItem("Mao Zeodang", 2016);
ref.printItem();
ref.publisher = "bitcoin crypto";
console.log(ref.publisher);