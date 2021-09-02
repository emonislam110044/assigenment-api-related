// search bitton and input field 
const searchData = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;

    const url = `https://openlibrary.org/search.json?q=${inputText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data))
    inputField.value = '';
}

const displayResult = (data) => {
    // result found detail 
    if (data.numFound === 0) {
        const totalResultContainer = document.getElementById('total-result');
        totalResultContainer.innerText = `NO RESULT FOUND`
    }
    else {
        // total book found 
        const totalBookFound = data.numFound;
        const totalResultContainer = document.getElementById('total-result');
        totalResultContainer.innerText = `Total result found ${totalBookFound}`
    }

    // all book detail 
    const allBooks = data.docs;
    const cardConatainer = document.getElementById('card-container');
    cardConatainer.textContent = '';


    // display all books 
    allBooks.forEach(book => {
        // books cover id 
        const coverId = book.cover_i
        const url = ` https://covers.openlibrary.org/b/id/${coverId}-M.jpg`

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <div id="image" ><img src="${url}" class="card-img-top" alt="..."></div>
         <div class="card-body">
            <h5 class="card-title">Title: ${book.title}</h5>
            <p class="card-text"> written by <span class="bold">${book.author_name[0]}</span> </p>
            <p class="card-text"> first published in <span class="bold"> ${book.publish_year[0] ? book.publish_year : 'not available'}</span> , </p>
             <p class="card-text"> published by <span class="bold">${book.publisher[0]}</span> </p>
         </div>
        </div>
     `;
        cardConatainer.appendChild(div)
    });
}
