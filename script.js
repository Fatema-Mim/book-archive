// Search api
const searchButton = ()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    searchField.value = '';
    const searchUrl = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(searchUrl)
    .then(response => response.json())
    .then(data => displayBook(data.docs))
}

// load search value
const displayBook = (books) =>{ 
    const totalBook = document.getElementById('total');
    totalBook.innerText = `Total: ${books.length}`;

    const mainDiv = document.getElementById('all-books');
    mainDiv.textContent = '';

    // checked search value empty or not
    if(books.length === 0){
        const errorMassage = document.getElementById('no-books');
        errorMassage.textContent = '';
        errorMassage.style.display = 'block';
        const p = document.createElement('p');
        p.innerHTML = `
        <p class="text-center text-danger fs-2 fw-bold">No Result</p>
        `;
        errorMassage.appendChild(p);
    }
    else{
        books.forEach(book => {
            document.getElementById('no-books').style.display ="none";

            const newDiv = document.createElement('div');
            newDiv.classList.add('col');
            newDiv.innerHTML = `
            <div class="card h-100">      
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top h-50" alt="...">
                <div class="card-body text-center my-auto">
                    <h5 class="card-title">${book.title ? book.title : 'No available'}</h5>
                    <p>Author name : ${book.author_name ? book.author_name : 'No available' }</p>
                    <p>First Publish : ${book.first_publish_year ? book.first_publish_year : 'No available'}</p>
                    <p>publisher : ${book.publisher ? book.publisher : 'No available'}</p>
                </div>
            </div>
            `;
            mainDiv.appendChild(newDiv);
        });
    }
}