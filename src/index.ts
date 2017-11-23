/*export default class Main {
    constructor() {
        console.log('Typescript Webpack starter launched');
    }
}

let start = new Main();*/

import { Category } from './enums';
import { Book, Logger, Author, Librarian, Magazine } from './interfaces';
import { UniversityLibrarian, ReferenceItem } from './classes';
import { calculateLateFees as CalcFee, maxBookAllowed, Purge } from './../lib/utilityFunctions';
import refBook from './encyclopedia';
import Shelf from './shelf';

let fee = CalcFee(5);
let max = maxBookAllowed(12);
let ref = new refBook("Fact book", 2010, 2);
ref.printCitation();


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

/*function checkOutBooks(customer: string, ...bookIds: number[]): string[] {
	console.log(`Checking out books for ${customer}`);

	let checkedOutBooks = bookIds.map(id => {
		let book = getBookById(id);
		if(book.available) {
			return book.title;
		}
	});

	return checkOutBooks;
}*/

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

// generic types example
let inventory: Array<Book> = [
		{id: 11, title: "Objective C", author: "a @ b", available: true, category: Category.Software},
		{id: 12, title: "Learn C++", author: "b @ c", available: true, category: Category.Software},
		{id: 13, title: "Typescript", author: "c @ d", available: true, category: Category.Software},
		{id: 14, title: "JAVA", author: "d @ e", available: true, category: Category.Software},
	];

let bookShelf: Shelf<Book> = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));
let firstBook: Book = <Book>bookShelf.getFirst();
// console.log(firstBook);

let softwareBook = bookShelf.find("JAVA");
console.log(`${softwareBook.title} (${softwareBook.author.toUpperCase()})`);

/*let purgedBooks: Array<Book> = Purge<Book>(inventory);
purgedBooks.forEach(book => console.log(book.title));
let purgednums: Array<number> = Purge<number>([1,2,3,4]);
console.log(purgednums);*/

let magazines: Array<Magazine> = [
	{ title: "Readers Digest", publisher: "Times group" },
	{ title: "AutoCAD", publisher: "M.K.Dixhit" },
	{ title: "Five Points", publisher: "GSU" }
];

let magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();
magazines.forEach(mag => magazineShelf.add(mag));
let firstMagazine: Magazine = <Magazine>magazineShelf.getFirst();
// console.log(firstMagazine);

magazineShelf.printTitles();



// class expression
/*let Newspaper = class extends ReferenceItem {
	printCitation(): void {
		console.log(`${this.title} --> ${this.year}`);
	}
}

let mypaper = new Newspaper('Lokmat', 1985);
mypaper.printCitation();

class Novel extends class { title: string } {
	mainCharecter: string;
}

let favouriteNovel = new Novel();
favouriteNovel.title = "aaa"; // from base class expression property
favouriteNovel.mainCharecter = "xxx"; // from subclass property*/