function generateBooksInnerHTML(book, index, imgPathRead, imgPathReadable, imgPathHeart) {
    return /* HTML */ `<div class="book_card">
    <div class="header_bookCard">
        <h3>${book.title}</h3>
        <p class="author_bookCard">by ${book.author}</p>
    </div>
    <table>
        <tr>
            <td>Genre</td>
            <td>${book.genre}</td>
        </tr>
        <tr>
            <td>Pages</td>
            <td>${book.pages}</td>
        </tr>
        <tr>
            <td>Read</td>
            <td><img onclick="toggleCheckBox(${index}, 'read')" class="imgCheck pointer checkread_icon${index}" src=${imgPathRead} alt="check button"></td>
        </tr>
        <tr>
            <td>Readable several times</td>
            <td><img onclick="toggleCheckBox(${index}, 'readable')" class="imgCheck pointer checkreadable_icon${index}" src=${imgPathReadable} alt="check button"></td>
        </tr>
    </table>
    <div class="edit_content">
        <img onclick="toggleHeartIcon(${index})" class="img_edit_content pointer heart_icon${index}" src=${imgPathHeart} alt="">
        <img onclick="deleteBook(${index})" class="img_edit_content pointer" src="img/delete.svg" alt="">
    </div>
</div>`;
}


function generateDialogInnerHTML(index) {
    return /* HTML */ `
               <div class="dialog">
                <div class="header_dialog">
                    <h2>Add a <span>new</span> Book</h2>
                    <p class="dialog_quote">So many books, so little time</p>
                    <div class="seperator_line_content">
                    </div>
                </div>
                <form onsubmit="addBookToLibrary(); return false;" class="input_addBook">
                    <label for="input_title"></label>
                    <input class="input_title" type="text" placeholder="Title" required>
                    <label for="input_author"></label>
                    <input class="input_author" type="text" placeholder="Author" required>
                    <label for="input_genre"></label>
                    <input class="input_genre" type="text" placeholder="Genre" required>
                    <label for="input_pages"></label>
                    <input class="input_pages" type="text" placeholder="Pages" required>
                    <div class="check_content">
                        <label class="container">Read
                            <img onclick="addStatusCheckbox('read')" class="checkmark_read pointer" src="img/check_button.svg" alt="">
                          </label>
                          <label class="container">Readable several times
                            <img onclick="addStatusCheckbox('readable')" class="checkmark_readable pointer" src="img/check_button.svg" alt="">
                          </label>
                    </div>
                    <div class="container_button">
                        <button class="btn pointer" type="submit">Save</button>
                        <button class="btn btn_cancel dark_btn pointer" type="button">Cancel</button>
                    </div>
                </form>
            </div>`;
}


