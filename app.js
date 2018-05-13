// the book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// class for the UI
class UI {
    // adds a book to the table.
    addBook(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = 
            `<td>${book.title}</td>
             <td>${book.author}</td>
             <td>${book.isbn}</td>
             <td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row)
    }

    showAlert(msg, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        const text = document.createTextNode(msg);
        div.appendChild(text);
    
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');
        
        container.insertBefore(div, form);
    
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearInputs() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    deleteRow(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

class BookStore {
    static getBooks() {
        let books = JSON.parse(localStorage.getItem('books'));
        if(books === null) {
            books = [];
        }

        return books;
    }

    static displayBooks() {
        const books = BookStore.getBooks();
        const ui = new UI();
        books.forEach(element => {
            ui.addBook(element);
        });
    }

    static addBook(book) {
        const books = BookStore.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = BookStore.getBooks();
        
        books.forEach((element, index) => {
            if(isbn === element.isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}

document.addEventListener('DOMContentLoaded', function(){
    BookStore.displayBooks();
});

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const book = new Book(title, author, isbn);
    const ui = new UI();

    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error');
    }
    else {
        ui.addBook(book);
        BookStore.addBook(book);
        ui.showAlert('Book Added!', 'success');
        ui.clearInputs();
    }
});

document.getElementById('book-list').addEventListener('click', function(e){
    e.preventDefault();
    const ui = new UI();
    ui.deleteRow(e.target);
    BookStore.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert("Book Removed!", 'success');
});