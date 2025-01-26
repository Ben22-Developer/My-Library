//To add an edit functionality, night mode & storage

const main = document.querySelector('main');
const addNewBookBtn = document.getElementById('add_book_btn');
const form = document.querySelector('form');
const bookTitle = form.querySelector('#book_title');
const bookAuthor = form.querySelector('#book_author');
const publishDate = form.querySelector('#date_publish');
const readCheck = form.querySelector('#read_check');
const readCheckLabel = form.querySelector('#read_check_label');
const readCheckText = document.querySelector('#read_check_text');
const closeFormBtn = form.querySelector('#close_form_btn');
const submitBtn = form.querySelector('#submit_button');
const errorMsg = document.querySelectorAll('.error_msg');
const inputsDisplaySection = document.querySelector('#input_display');
const popOutMsg = document.querySelector('#pop_msg');
const popOuth4 = popOutMsg.querySelector('h4');
const deleteTaskButtons = popOutMsg.querySelectorAll('.delete_task_button');
let allCards,aBookIndex;
const library = [];

const giveTheCardIndex = (theCard) => {
    for (let i = 0; i < allCards.length; i++) {
        if (theCard === allCards[i]) {
            return i;
        }
    }
}

const removeCardReadOrNotEvent = () => {
    if (allCards) {
        allCards.forEach(card => {
            card.removeEventListener('mousedown',cardManipulate);
        })
    }
}

const deleteABook = (e) => {
    if (e.target.innerText === 'No') {
        main.classList.remove('blur2');
        popOutMsg.classList.add('hidden'); 
    }
    else if (e.target.innerText === 'Yes') {
        let i;
        for (i = aBookIndex; i < library.length; i++) {
            library[i] = library[i+1];
        }
        library.length --;
        allCards[aBookIndex].remove();
        main.classList.remove('blur2');
        popOutMsg.classList.add('hidden'); 
        allCards = document.querySelectorAll('.a_card');
    }
} 


const removeDeleteActionTargetted = () => {
    deleteTaskButtons.forEach(button => {
        button.removeEventListener('mousedown',deleteABook);
      }) 
}

const deleteActionTargetted = () => {
    deleteTaskButtons.forEach(button => {
      button.addEventListener('mousedown',deleteABook);
    })    
}

const cardManipulate = (e) => {
    let theCard,theCardIndex;
    if (e.target.matches('.remove_task_btn')) {
        theCard = e.target.parentElement.parentElement;
        theCardIndex = giveTheCardIndex(theCard);
        main.classList.add('blur2');
        popOutMsg.classList.remove('hidden');
        popOuth4.innerText = `Are you sure you want to delete book ${library[theCardIndex].objectBookTitle} ?`;
        aBookIndex = theCardIndex;
    } 

    if (e.target.matches('.toggle_container') || e.target.matches('.toggle_container.active')) {
        theCard = e.target.parentElement.parentElement.parentElement.parentElement;
        theCardIndex = giveTheCardIndex(theCard);
        if (library[theCardIndex].objectBookReadOrNot === true) {
            e.target.setAttribute('class','toggle_container');
            e.target.previousElementSibling.innerText = "I've not read the book."; 
            library[theCardIndex].objectBookReadOrNot = false;               
        }
        else {
            e.target.setAttribute('class','toggle_container active');
            e.target.previousElementSibling.innerText = "I've read the book.";
            library[theCardIndex].objectBookReadOrNot = true; 
        }
    }
    else if (e.target.matches('.toggle')) {
        theCard = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        theCardIndex = giveTheCardIndex(theCard);
        if (library[theCardIndex].objectBookReadOrNot === true) {
            e.target.parentElement.setAttribute('class','toggle_container');
            e.target.parentElement.previousElementSibling.innerText = "I've not read the book."; 
            library[theCardIndex].objectBookReadOrNot = false;               
        }
        else {
            e.target.parentElement.setAttribute('class','toggle_container active');
            e.target.parentElement.previousElementSibling.innerText = "I've read the book.";
            library[theCardIndex].objectBookReadOrNot = true; 
        }
    } 
}

const aCardTargetted = () => {
    if (allCards) {
    allCards.forEach((card,index) => {
        card.addEventListener('mousedown',cardManipulate);
        })
    }
}

const makeTheBookCard = bookInformation => {
    const unformattedDate = bookInformation.objectBookPublished.split('-');
    bookInformation.objectBookPublished = `${unformattedDate[2]}/${unformattedDate[1]}/${unformattedDate[0]}`;
    
    //upperPart
    const a_card = document.createElement('div');
    const BookInfo_and_Details = document.createElement('div'); //class = bookInfo_and_details
    const Remove_Task_Button = document.createElement('button'); //class = "remove_task_button"
    const bookDetails = document.createElement('div'); //class = "details"
    const bookSide = document.createElement('div'); //class = "book"
    const bookSideLeft = document.createElement('div'); //class = "book_side left"
    const bookSideRight = document.createElement('div'); //class = "book_side right"
    const para_1 = document.createElement('p');
    const para_2 = document.createElement('p');

    //lowerPart
    const bookInformation_ul = document.createElement('ul');
    const bookInformationList_1 = document.createElement('li');
    const bookInformationList_2 = document.createElement('li');
    const bookInformationList_3 = document.createElement('li');
    const bookInformationList_4 = document.createElement('li');
    const bookInformationh3_1 = document.createElement('h3');
    const bookInformationh3_2 = document.createElement('h3');
    const bookInformationh3_3 = document.createElement('h3');
    const bookInformationh3_1_span = document.createElement('span');
    const bookInformationh3_2_span = document.createElement('span');
    const bookInformationh3_3_span = document.createElement('span');
    haveReadOrNot = document.createElement('p');
    const toggleContainer = document.createElement('div');
    const toggle = document.createElement('div');
    const img = document.createElement('img');

    //upper part
    inputsDisplaySection.append(a_card);
    a_card.append(BookInfo_and_Details);
    BookInfo_and_Details.append(Remove_Task_Button);
    BookInfo_and_Details.append(bookDetails);
    bookDetails.append(bookSide);
    bookSide.append(bookSideLeft);
    bookSide.append(bookSideRight);
    bookSide.append(para_1);
    bookSide.append(para_2);

    //lower Part
    BookInfo_and_Details.append(bookInformation_ul);
    bookInformation_ul.append(bookInformationList_1);
    bookInformation_ul.append(bookInformationList_2);
    bookInformation_ul.append(bookInformationList_3);
    bookInformation_ul.append(bookInformationList_4);
    bookInformationList_1.append(bookInformationh3_1);
    bookInformationList_2.append(bookInformationh3_2);
    bookInformationList_3.append(bookInformationh3_3);
    bookInformationh3_1.append(bookInformationh3_1_span);
    bookInformationh3_2.append(bookInformationh3_2_span);
    bookInformationh3_3.append(bookInformationh3_3_span);
    bookInformationList_4.append(haveReadOrNot);
    bookInformationList_4.append(toggleContainer);
    toggleContainer.append(toggle);

    a_card.append(img);

    //set upperPart Class
    a_card.setAttribute('class','a_card');
    BookInfo_and_Details.setAttribute('class','bookInfo_and_details');
    Remove_Task_Button.setAttribute('class','remove_task_btn');
    bookDetails.setAttribute('class','details');
    bookSide.setAttribute('class','book');
    bookSideLeft.setAttribute('class','book_side left');
    bookSideRight.setAttribute('class','book_side right');
    toggle.setAttribute('class','toggle');

    //set lowerPart Class
    bookInformation_ul.setAttribute('class','book_information');
    
    //upperPart innerText 
    bookSideLeft.innerText = 'L';
    bookSideRight.innerText = `B_${library.length}`;
    para_1.innerText = 'EST';
    para_2.innerText = '2025';
    bookInformationh3_1.innerText = bookInformation.objectBookTitle;
    bookInformationh3_2.innerText = bookInformation.objectBookAuthor;
    Remove_Task_Button.innerText = '❌';

    //lowerPart innerText
    if (!unformattedDate[2]) {
        bookInformationh3_3.innerText ='';
    }
    else {
        bookInformationh3_3.innerText = bookInformation.objectBookPublished;
    }
    if (bookInformation.objectBookReadOrNot === true) {
        haveReadOrNot.innerText = "I've read the book.";
        toggleContainer.setAttribute('class','toggle_container active');
    }
    else {
        haveReadOrNot.innerText = "I've not read the book.";
        toggleContainer.setAttribute('class','toggle_container');
    }
    img.src = `Images/new_book_copy.jpeg`;
    img.alt = 'A book picture';
    allCards = document.querySelectorAll('.a_card');
}

const  insertBookToLibrary = (...userInputs) => {
    class bookInformationClass {
        constructor(objectBookTitle,objectBookAuthor,objectBookPublished,objectBookReadOrNot) {
            this.objectBookTitle = objectBookTitle;
            this.objectBookAuthor = objectBookAuthor;
            this.objectBookPublished = objectBookPublished;
            this.objectBookReadOrNot = objectBookReadOrNot;
        }
    }
    const bookInformation = new bookInformationClass(userInputs[0],userInputs[1],userInputs[2],userInputs[3]);
    library.push(bookInformation);
    makeTheBookCard(library[library.length-1]);
}

const hideForm = (e) => {
    e.preventDefault();
    form.setAttribute('class','hidden');
    main.classList.remove('blur');
    document.removeEventListener('mousemove',clickDocumentToHideForm);
    document.removeEventListener('click',hideForm);
}

const submitForm = (e) => {
    if (bookTitle.value !== '' && bookAuthor.value !== '') {
        e.preventDefault();
        const regex_1 = /^[A-Z]/;
        const regex_2 = /^[\d+]/g;
        const testBookTitle_1 = regex_1.test(bookTitle.value);
        const testBookTitle_2 = regex_2.test(bookTitle.value);
        const testBookAuthor = regex_1.test(bookAuthor.value);

        if ((testBookTitle_1 === true || testBookTitle_2 === true) && testBookAuthor === true) {
            hideForm(e);
            insertBookToLibrary(bookTitle.value,bookAuthor.value,publishDate.value,readCheck.checked);
        }
        else {
            if ((testBookTitle_1 === true || testBookTitle_2 === true) && testBookAuthor === false) {
                errorMsg[0].innerText = '';
            }
            else {
                errorMsg[1].innerText = '';
            }
            if (testBookTitle_1 === false && testBookTitle_2 === false) {
                errorMsg[0].innerText = 'A book title must either start with a capital letter or a number';
            }
            if (testBookAuthor === false) {
                errorMsg[1].innerText = 'A book author must start with a capital letter';
            }
        }
    }
}

const removeChangeReadCheckTextListner = () => {
    readCheck.removeEventListener('mousedown',changeReadCheckText);
}

const changeReadCheckText = () => {
    if (readCheck.checked === false) {
        readCheckText.innerText = "I've read the book";
    }
    else {
        readCheckText.innerText = "I've not read the book";
    }
    readCheckLabel.addEventListener('mouseup',removeChangeReadCheckTextListner);
}

const clickDocumentToHideForm = (e) => {
    const mousePosition = (e.clientX/form.offsetWidth) * 100;
    if (mousePosition > 100) {
        document.addEventListener('click',hideForm);
    }
    else {
        document.removeEventListener('click',hideForm);
    }
}

const documentKeyBoardEventListener = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        submitForm(e);
    }
    if (e.ctrlKey && ((e.key === 'q') || (e.key === 'Q') )) {
        showForm();
    }
}

const showForm = () => {
    errorMsg.forEach(paraMsg => {
        paraMsg.innerText = '';
    })
    bookTitle.value = '';
    bookAuthor.value = '';
    publishDate.value = '';
    document.addEventListener('mousemove',clickDocumentToHideForm);
    closeFormBtn.addEventListener('click',hideForm);
    submitBtn.addEventListener('click',submitForm);
    form.removeAttribute('class','hidden');
    readCheckLabel.addEventListener('mousedown',changeReadCheckText);
    main.classList.add('blur');
}

popOutMsg.addEventListener('mouseover',deleteActionTargetted);
popOutMsg.addEventListener('mouseout',removeDeleteActionTargetted);
inputsDisplaySection.addEventListener('mouseover',aCardTargetted);
inputsDisplaySection.addEventListener('mouseout',removeCardReadOrNotEvent);
addNewBookBtn.addEventListener('click',showForm);
document.addEventListener('keydown',documentKeyBoardEventListener);