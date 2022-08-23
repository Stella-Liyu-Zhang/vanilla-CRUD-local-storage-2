    const ELEMS = {};
    const movies = [];
    const movieElems = [];

    function queryElements(){
        ELEMS.movieheader = document.getElementById("movie-header");
        ELEMS.totalmovies = document.getElementById("movies");
        ELEMS.addMovieBtn= document.getElementById("add-movie-button");

        ELEMS.movieTitleInput = document.getElementById("movie_name");
        ELEMS.movieCommentInput= document.getElementById("text");
        ELEMS.directorInput = document.getElementById("director_name");
        
        //ELEMS.dialog = document.querySelector('dialog');
        
        ELEMS.addBtn= document.getElementById("add-button");
        ELEMS.cancelBtn= document.getElementById("cancel-button");
        ELEMS.modal = document.getElementById("add-movie-modal");
        ELEMS.movieList = document.getElementById("movie-list");
        ELEMS.totalmovies.innerHTML = localStorage.length;

        ELEMS.template = document.querySelector('template');


        // we report error if we have trouble finding the element.
        Object.keys(ELEMS).forEach((elem) => {
            if (!ELEMS[elem]) {
                console.error(`Trouble querying ${elem} element`);
            }
        });
    }


    function readfromStorage(){
        Object.keys(localStorage).forEach(key => {
            movies.push(JSON.parse(localStorage.getItem(key)));
        });
        console.log(movies);
    }

    function addMovie(){
        ELEMS.addMovieBtn.addEventListener("click", () => {
    
            ELEMS.modal.classList.remove('hidden');
            ELEMS.movieheader.classList.add('hidden');
            ELEMS.movieList.classList.add('hidden');
        })
    }

    function cancelMovie(){
        ELEMS.cancelBtn.addEventListener("click", () => {
            ELEMS.modal.classList.add('hidden');
            ELEMS.movieheader.classList.remove('hidden');
            ELEMS.movieList.classList.remove('hidden');
            
        })
    }

    function addintoList(){
        ELEMS.addBtn.addEventListener("click", () =>{
            movieobject.movie_name = ELEMS.movieTitleInput.value;
            movieobject.director_name = ELEMS.directorInput.value;
            movieobject.text = ELEMS.movieCommentInput.value;
    
            //add an id on each movie
            let id = Math.floor(Math.random() * 100);
            movieobject.id = id;
    
            ELEMS.movieTitleInput.value = "";
            ELEMS.directorInput.value = "";
            ELEMS.movieCommentInput.value = "";
    
            ELEMS.modal.classList.add('hidden');
            ELEMS.movieheader.classList.remove('hidden');
            ELEMS.movieList.classList.remove('hidden');
    
            localStorage.setItem(id, JSON.stringify(movieobject));
    
            window.location.reload();
        })
    }



    function createMovieElems(){
        movies.forEach(movie => {
            let newMovieElem = document.createElement('div');
            newMovieElem.classList.add('movie__item');
            newMovieElem.classList.add('item-animation');
            newMovieElem.append(ELEMS.template.content.cloneNode(true));

            newMovieElem.querySelector('p.movie_name').innerHTML = movie['movie_name'];
            newMovieElem.querySelector('p.director_name').innerHTML = movie['director_name'];
            newMovieElem.querySelector('p.text').innerHTML = movie['text'];

            newMovieElem.setAttribute('data-id', movie['id']);

            ELEMS.movieList.append(newMovieElem);
        });
    }

    function attachEvents() {
        Array.from(ELEMS.movieList.children).forEach(movie => {
            let editBtn = movie.querySelector('button.edit');
            let deleteBtn = movie.querySelector('button.delete');

            editBtn.addEventListener('click', () => {
                editMovie(movie.getAttribute('data-id'));
            });
            deleteBtn.addEventListener('click', () => {
                deleteMovie(movie.getAttribute('data-id'));
            });
        });
    }
  
    //localstorage.remove(99);
    function deleteMovie(id){
        localStorage.removeItem(id);
        window.location.reload();
    }

    function editMovie(id){
        let currMovieElem = document.querySelector(`[data-id="${id}"]`);
        console.log(currMovieElem);

        let movieObject = JSON.parse(localStorage.getItem(id));     

        ELEMS.modal.classList.remove('hidden');
        ELEMS.movieheader.classList.add('hidden');
        ELEMS.movieList.classList.add('hidden');

        ELEMS.movieTitleInput.value = movieObject.movie_name;
        ELEMS.directorInput.value = movieObject.director_name;
        ELEMS.movieCommentInput.value = movieObject.text;

        ELEMS.addBtn.addEventListener("click", () => {
            movieObject.id = id;
            movieObject.movie_name = ELEMS.movieTitleInput.value;
            movieobject.director_name = ELEMS.directorInput.value;
            movieobject.text = ELEMS.movieCommentInput.value;

            localStorage.setItem(id, JSON.stringify(movieObject));

            // making the modal disappear
            ELEMS.modal.classList.add('hidden');
            ELEMS.movieheader.classList.remove('hidden');
            ELEMS.movieList.classList.remove('hidden');
        
            deleteMovie(id);
            window.location.reload();
        });
    }


        

function init() {
    //Read from local storage
    readfromStorage();
    queryElements();
    createMovieElems();
    attachEvents();
    addMovie();
    cancelMovie();
    addintoList();
}

document.addEventListener('DOMContentLoaded', init)