const myLibrary = [];

function Book(name,author,pages,read){
    this.name=name;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function openBookForm(){
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const checkDiv = document.createElement('div');

    // we are creating a form dynamically 
    const form = document.createElement('form');
    form.id="bookForm";

    // book name input
    const bookNameLabel = document.createElement('label');
    bookNameLabel.innerHTML= "Book Name: ";
    const bookNameInput = document.createElement('input');
    bookNameInput.type="text";
    bookNameInput.name="bookName";
    bookNameInput.required=true;

    //author
    const authorLabel = document.createElement('label');
    authorLabel.innerHTML = "<br>Author: ";
    const authorInput = document.createElement('input');
    authorInput.type = "text";
    authorInput.name = "author";
    authorInput.required = true;

    // pages
    const pagesLabel = document.createElement('label');
    pagesLabel.innerHTML="<br>Number of Pages: ";
    const pagesInput=document.createElement('input');
    pagesInput.type="number";
    pagesInput.name="pages";
    pagesInput.required=true;

    // read
    const readLabel = document.createElement('label');
    readLabel.innerHTML="<br>Read: ";
    const readInput = document.createElement('input');
    readInput.type="checkbox";
    readInput.name="read";

    const submitButton = document.createElement('button');
    submitButton.type = "submit";
    submitButton.innerHTML = "Submit";

    // Append the inputs to the form
    form.appendChild(bookNameLabel);
    form.appendChild(bookNameInput);
    form.appendChild(authorLabel);
    form.appendChild(authorInput);
    form.appendChild(pagesLabel);
    form.appendChild(pagesInput);
    checkDiv.appendChild(readLabel);
    checkDiv.appendChild(readInput);
    form.appendChild(checkDiv);
    form.appendChild(submitButton);

    overlay.appendChild(form);
    document.body.appendChild(overlay);

 
    // Add event listener to handle form submission
    form.addEventListener('submit',(event)=>addBookToLibrary(event,overlay));

    // Close form if clicking outside
    overlay.addEventListener('click', function(event) {
        if (!form.contains(event.target)) {
            overlay.remove();  // Close the form by removing the overlay
        }
    });
}

function addBookToLibrary(event,overlay) {
    event.preventDefault();  // Prevent the page from refreshing on form submission

    // Get form data
    const form = event.target;
    const bookName = form.bookName.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const read = form.read.checked;  // Check if the 'Read' checkbox is checked


    const newBook = new Book(bookName, author, pages, read);

    myLibrary.push(newBook);

    displayBooks();

    overlay.remove();  // Remove the overlay (hides the form)

}

function displayBooks(){

    const container = document.getElementById('booksContainer');

    // Clear any previous content
    container.innerHTML = '';

    // Create a card for each book in the array
    myLibrary.forEach((book, index) => {
        // Create a div for the card
        const card = document.createElement('div');
        card.classList.add('book-card');  // Add a class for styling

        // Create and append book details to the card
        const name = document.createElement('h3');
        name.innerText = `Title: ${book.name}`;
        card.appendChild(name);

        const author = document.createElement('p');
        author.innerText = `Author: ${book.author}`;
        card.appendChild(author);

        const pages = document.createElement('p');
        pages.innerText = `Pages: ${book.pages}`;
        card.appendChild(pages);

        const read = document.createElement('p');
        read.innerText = `Read: ${book.read ? 'Yes' : 'No'}`;
        card.appendChild(read);

        // Create and append the remove button
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', () => removeBook(index));
        card.appendChild(removeButton);

        // Create and append the toggle read status button
        const toggleButton = document.createElement('button');
        toggleButton.innerText = 'Toggle Read Status';
        toggleButton.addEventListener('click', () => toggleReadStatus(index));
        card.appendChild(toggleButton);

        // Append the card to the container
        container.appendChild(card);
    });
}

function removeBook(index) {
    // Remove the book from the array
    myLibrary.splice(index, 1);

    // Re-display the books
    displayBooks();
}

function toggleReadStatus(index) {
    // Toggle the read status of the book
    myLibrary[index].read = !myLibrary[index].read;

    // Re-display the books to reflect the change
    displayBooks();
}