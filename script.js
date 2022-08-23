
    export const ELEMS = {};
    const movies = [];
    const movieElems = [];

    function queryElements(){
        ELEMS.movieheader = document.getElementById("movie-header");
        ELEMS.totalmovies = document.getElementById("movies");
        ELEMS.addMovieBtn= document.getElementById("add-movie-button");

        ELEMS.movieTitleInput = document.getElementById("movie_name");
        ELEMS.movieCommentInput= document.getElementById("text");
        ELEMS.directorInput = document.getElementById("director_name");
                
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
            ELEMS.movieList.movie_name = ELEMS.movieTitleInput.value;
            ELEMS.movieList.director_name = ELEMS.directorInput.value;
            ELEMS.movieList.text = ELEMS.movieCommentInput.value;
    
            //add an id on each movie
            let id = Math.floor(Math.random() * 100);
            //let sequentialid = localStorage.length+1;
            ELEMS.movieList.dataid = id;
    
            ELEMS.movieTitleInput.value = "";
            ELEMS.directorInput.value = "";
            ELEMS.movieCommentInput.value = "";
    
            ELEMS.modal.classList.add('hidden');
            ELEMS.movieheader.classList.remove('hidden');
            ELEMS.movieList.classList.remove('hidden');
    
            localStorage.setItem(ELEMS.movieList.dataid, JSON.stringify(ELEMS.movieList));
    
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

            newMovieElem.setAttribute('dataid', movie['dataid']);

            ELEMS.movieList.append(newMovieElem);
        });
    }

    function attachEvents() {
        Array.from(ELEMS.movieList.children).forEach(movie => {
            let editBtn = movie.querySelector('button.edit');
            let deleteBtn = movie.querySelector('button.delete');

            editBtn.addEventListener('click', () => {
                editMovie(movie.getAttribute('dataid'));
            });
            deleteBtn.addev
            deleteBtn.addEventListener('click', () => {
                deleteMovie(movie.getAttribute('dataid'));
            });
        });
    }
  
    //localstorage.remove(99);
    function deleteMovie(id){
        deleteConfirmation();
        localStorage.removeItem(id);
        window.location.reload();
    }

    
    function deleteConfirmation(){
        return confirm('Are you sure you want to Delete?');
    }

    function editMovie(id){
        let currMovieElem = document.querySelector(`[data-id="${id}"]`);
        console.log(currMovieElem);
        let movieObject = JSON.parse(localStorage.getItem(id));     
        //make the window pops up
        ELEMS.modal.classList.remove('hidden');
        ELEMS.movieheader.classList.add('hidden');
        ELEMS.movieList.classList.add('hidden');

        // Display the previously stored value in the field
        ELEMS.movieTitleInput.value = movieObject.movie_name;
        ELEMS.directorInput.value = movieObject.director_name;
        ELEMS.movieCommentInput.value = movieObject.text;

        console.log( ELEMS.movieTitleInput.value, ELEMS.directorInput.value ,  ELEMS.movieCommentInput.value);
        ELEMS.addBtn.innerHTML = "Save Edits";

        ELEMS.addBtn.addEventListener("click", () => {
            // currMovieElem.querySelector('p.movie_name').innerHTML = ELEMS.movieTitleInput.value;
            // currMovieElem.querySelector('p.director_name').innerHTML = ELEMS.directorInput.value;
            // currMovieElem.querySelector('p.text').innerHTML = ELEMS.movieCommentInput.value;

            // movieObject.movie_name = ELEMS.movieTitleInput.value;
            // movieobject.director_name = ELEMS.directorInput.value;
            // movieobject.text = ELEMS.movieCommentInput.value;

            // make changes to the elements
            // let addmovie = document.getElementById(button.movie__button);
            // ELEMS.addBtn.innerHTML = "Save";

            localStorage.setItem(id, JSON.stringify(movieObject));

            ELEMS.modal.classList.add('hidden');
            ELEMS.movieheader.classList.remove('hidden');
            ELEMS.movieList.classList.remove('hidden');
        
            localStorage.removeItem(id);            
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
