// Book Constructor
// Handles creates the actual book object
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {}

// add a book to the list
UI.prototype.addBook = function(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
}

// clears the inputs
UI.prototype.clearInputs = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// delete book
UI.prototype.deleteRow = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// displays an alert, error or success, in the UI
UI.prototype.showAlert = function(msg, className) {
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
        ui.showAlert('Book Added!', 'success');
        ui.clearInputs();
    }
});

document.getElementById('book-list').addEventListener('click', function(e){
    e.preventDefault();
    const ui = new UI();
    ui.deleteRow(e.target);
    ui.showAlert("Book Removed!", 'success');
    
});