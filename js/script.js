let myLibrary = [
    {
    'title': 'The Hobbit',
    'author': 'J.R.R. Tolkien',
    'genre': 'Fantasy',
    'pages': 295,
    'read': true,
    'readable': false,
    'isFavorite': false,
    },
];
load();
let turningPage = new Audio('audio/turn_page_book.mp3');
turningPage.volume = 0.2;

let btnAddBook = document.querySelector('.add_book');
let backgroundDialog = document.querySelector('.bg_background');
let dialog = document.querySelector('.dialog');
let btnClose = document.querySelector('.btn_cancel');


function Book (title, author, genre, pages, read, readable, isFavorite) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
    this.readable = readable;
    this.isFavorite = isFavorite;
}


function addBookToLibrary() {
    let title = document.querySelector('.input_title').value;
    let author = document.querySelector('.input_author').value;
    let genre = document.querySelector('.input_genre').value;
    let pages = document.querySelector('.input_pages').value;
    let read = isCheckboxChecked('read');
    let readable = isCheckboxChecked('readable');
    let newBook = new Book(title, author, genre, pages, read, readable, false);
    myLibrary.push(newBook);
    save();
    renderBooks();
    closeDialog();
}


function clearDataBookValues() {
    document.querySelector('.input_title').value = '';
    document.querySelector('.input_author').value = '';
    document.querySelector('.input_genre').value = '';
    document.querySelector('.input_pages').value = '';
}


function renderBooks() {
    let mainContainer = document.querySelector('.main_container');
    mainContainer.innerHTML = '';
    myLibrary.forEach((book, index) => {
        let imgPathRead = (showRightCheckBox(book.read));
        let imgPathReadable = (showRightCheckBox(book.readable));
        let imgPathHeart = (loadRightHeart(book.isFavorite, index));
        mainContainer.innerHTML += generateBooksInnerHTML(book, index, imgPathRead, imgPathReadable, imgPathHeart);
        showRightHeart(book.isFavorite, index);
    });
}


function showRightCheckBox(status) {
    if(!status) {
        return 'img/check_button.svg';
    } else {
        return 'img/checked_button.svg';
    }
}


function loadRightHeart(status, index) {
    let heartIcon = document.querySelector(`.heart_icon${index}`);
    if (heartIcon) {
        if (status) {
            heartIcon.classList.remove('img_edit_content');
        } else {
            heartIcon.classList.add('img_edit_content');
        }
    }
    return status ? 'img/redHeart_icon.svg' : 'img/heart_icon.svg';
}


function showRightHeart(status, index) {
    let heartIcon = document.querySelector(`.heart_icon${index}`);
    if (status) {
        heartIcon.classList.remove('img_edit_content');
    } else {
        heartIcon.classList.add('img_edit_content');
    }
}


function toggleCheckBox(index, classCheck) {
    let checkBox = document.querySelector(`.check${classCheck}_icon${index}`);
    if (checkBox.src.match("checked_button")) {
        checkBox.src = "img/check_button.svg";
        myLibrary[index][`${classCheck}`] = false;
    } else {
        checkBox.src = "img/checked_button.svg";
        myLibrary[index][`${classCheck}`] = true;
    }
    save();
}


function addStatusCheckbox(classCheck) {
    let checkBox = document.querySelector(`.checkmark_${classCheck}`);
    if(checkBox.src.match("checked_button")) {
        checkBox.src = "img/check_button.svg";
    } else {
        checkBox.src = "img/checked_button.svg";
    }
}


function isCheckboxChecked(classCheck) {
    let checkBox = document.querySelector(`.checkmark_${classCheck}`);
    return checkBox.src.match("checked_button");
}


function toggleHeartIcon(index) {
    let heart = document.querySelector(`.heart_icon${index}`);
    if (heart.src.match("heart_icon")) {
        heart.src = "img/redHeart_icon.svg";
        myLibrary[index].isFavorite = true;
        heart.classList.remove('img_edit_content');
    } else {
        heart.src = "img/heart_icon.svg";
        myLibrary[index].isFavorite = false;
        heart.classList.add('img_edit_content');
    }
    save();
}


function toggleDialog() {
    document.querySelector('.bg_background').classList.toggle('d_none');
    setTimeout(function() {
        document.querySelector('.dialog').classList.toggle('show_Dialog');
    }, 50);
    let dialogBG = document.querySelector('.bg_background');
    dialogBG.innerHTML = generateDialogInnerHTML();
    setDialogEventListeners();
    turningPage.play();
}


function closeDialog() {
    document.querySelector('.dialog').classList.toggle('show_Dialog');
    setTimeout(function() {
        document.querySelector('.bg_background').classList.add('d_none');
    }, 250);
    clearDataBookValues();
}


function setDialogEventListeners() {
    let dialog = document.querySelector('.dialog');
    if (dialog) {
        dialog.addEventListener('click', doNotClose);
    }
    let btnClose = document.querySelector('.btn_cancel');
    if (btnClose) {
        btnClose.addEventListener('click', closeDialog);
    }
}


btnAddBook.addEventListener('click', toggleDialog);
backgroundDialog.addEventListener('click', closeDialog);

function doNotClose(event) {
    event.stopPropagation();
}


function deleteBook(index) {
    myLibrary.splice(index, 1);
    renderBooks();
    save();
}


function save() {
    let myLibraryAsText = JSON.stringify(myLibrary);
    localStorage.setItem('myLibrary', myLibraryAsText);
}


function load() {
    let myLibraryAsText = localStorage.getItem('myLibrary');
    if (myLibraryAsText) {
        myLibrary = JSON.parse(myLibraryAsText);
    }
}
