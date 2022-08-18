const ELEMS = {};

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

    // we report error if we have trouble finding the element.
	Object.keys(ELEMS).forEach((elem) => {
		if (!ELEMS[elem]) {
			console.error(`Trouble querying ${elem} element`);
		}
	});
}


function bindEvents() {

    ELEMS.totalmovies.innerHTML = localStorage.length;

    let movieobject = {};

    ELEMS.addMovieBtn.addEventListener("click", () => {
    
        ELEMS.modal.classList.remove('hidden');
        ELEMS.movieheader.classList.add('hidden');
        ELEMS.movieList.classList.add('hidden');
    })

    ELEMS.cancelBtn.addEventListener("click", () => {
        ELEMS.modal.classList.add('hidden');
        ELEMS.movieheader.classList.remove('hidden');
        ELEMS.movieList.classList.remove('hidden');
        
    })

    ELEMS.addBtn.addEventListener("click", () =>{
        console.log(ELEMS.movieTitleInput.value, ELEMS.directorInput.value, ELEMS.movieCommentInput.value);
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


    //localstorage.remove(99);
    function deleteMovie(id){
        localStorage.removeItem(id);
        window.location.reload();
    }

    function editMovie(id){
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
        })
    }

    ELEMS.editBtn.addEventListener('click', e => {
        let id = e.target.getAttribute('data-id');
        editMovie(id);
    });

    ELEMS.deleteBtn.addEventListener('click', e =>{
        let id = e.target.getAttribute('data-id');
        deleteMovie(id);
    })

}

function showMovies(){
    let movieobjects = localStorage;
   // movieobject.id = "";
    for (let i = 0; i < movieobjects.length; i++){
        //getting the movie object from local storage
        let movieobject = JSON.parse(localStorage.getItem(movieobjects.key(i)));
        ELEMS.movieList.innerHTML += `
            <div class="movie__item item-animation">
                <div class="movie_details">
                    <ul>  
                        <li>
                            <h1 class="movie_name" id="movie-name">
                                ${movieobject.movie_name }
                            </h1>
                        </li>
                        <li>
                            <h3 class="director_name" id="director_name">
                                ${ movieobject.director_name}
                            </h3>
                        </li>
                        <li>
                            <p class="movie-comment" id="movie-comment">
                                ${movieobject.text}
                            </p>
                        </li>
                    </ul>
                </div>

                <div class="movie__buttons">
                    <button class="movie__button" id="edit-button" data-id="${movieobject.id}">
                        Edit
                    </button>

                    <button class="movie__button" id="delete-button" data-id="${movieobject.id}">
                        Delete
                    </button>                    
                </div>
            </div>`
             
    ELEMS.editBtn= document.getElementById("edit-button");
    ELEMS.deleteBtn= document.getElementById("delete-button");
    }
     
    ELEMS.editBtn= document.getElementById("edit-button");
    ELEMS.deleteBtn= document.getElementById("delete-button");
}

function init() {
	queryElements();
    showMovies();
    bindEvents();
}

document.addEventListener('DOMContentLoaded', init)