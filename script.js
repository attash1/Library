const dialogButton = document.querySelector(".toggleDialog");
const bookDialog = document.getElementById("bookFormDialog");
const form = document.getElementById("bookForm");

const bookGrid = document.querySelector(".bookGrid");
let deleteButtons = document.querySelectorAll(".remove");


//when form is submitted, creates new book and adds it to myLibrary array
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const bookName = document.getElementById("book_title");
    const authorName = document.getElementById("author");
    const pageTotal = document.getElementById("length");
    const readCheckbox = document.getElementById("readStatus");

    let newbook = new Book(bookName.value, authorName.value, parseInt(pageTotal.value), readStatus.checked); 
    addBookToLibrary(newbook);
    displayNewBook(newbook);

    deleteButtons = document.querySelectorAll(".remove"); //recounts every delete button
    deleteButtons[deleteButtons.length-1].addEventListener("click", function(e) {
        let bookNumInt = parseInt(e.target.parentNode.getAttribute('data-bookNum'));
        myLibrary.splice(bookNumInt, 1);

        const bookCards = bookGrid.children;
        const removedBookObj = bookCards.item(bookNumInt);
        bookGrid.removeChild(removedBookObj);
    }); 
    
    form.reset();
    bookDialog.close();
})

dialogButton.addEventListener("click", () => {
    bookDialog.showModal();
});


const myLibrary = [];

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;

    this.info = function() {
        if (read)
            return(`${title} by ${author}, ${numPages} pages, read`);
        else 
            return(`${title} by ${author}, ${numPages} pages, not read yet`);
    }
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayNewBook(newBook) {
    const newBookCard = document.createElement('div');
    newBookCard.classList.add('bookCard');
    newBookCard.innerHTML=`<div>${newBook.title}</div> 
                           <div>by ${newBook.author}</div> 
                           <div>Pages: ${newBook.numPages}</div>`;
    
    if (newBook.read)
        newBookCard.insertAdjacentHTML("beforeend", `<div>Complete</div>`)
    else
        newBookCard.insertAdjacentHTML("beforeend", `<div>Incomplete</div>`)

    newBookCard.insertAdjacentHTML("beforeend", `<button class="remove">Remove</button>`);

    newBookCard.setAttribute('data-bookNum', `${myLibrary.length-1}`)
    bookGrid.appendChild(newBookCard);
}



