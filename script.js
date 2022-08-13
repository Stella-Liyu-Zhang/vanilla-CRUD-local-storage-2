let movieheader = document.getElementById("movie-header");
let totalmovies = document.getElementById("movies");
let addMovieBtn= document.getElementById("add-movie-button");
let editBtn= document.getElementById("edit-button");
let deleteBtn= document.getElementById("delete-button");

let movieTitleInput = document.getElementById("movie_name");
let movieCommentInput= document.getElementById("text");
let directorInput = document.getElementById("director_name");

let addBtn= document.getElementById("add-button");
let cancelBtn= document.getElementById("cancel-button");
let modal = document.getElementById("add-movie-modal");
let movieList = document.getElementById("movie-list");

totalmovies.innerHTML = localStorage.length;

let movieobject = {};

addMovieBtn.addEventListener("click", () => {
    // modal.style.display = "block";
    // movieheader.style.display = "none";
    // movieList.style.display = "none";
    modal.classList.remove('hidden');
    movieheader.classList.add('hidden');
    movieList.classList.add('hidden');
})

cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
    movieheader.style.display = "flex";
    movieList.style.display = "block";
    
})

addBtn.addEventListener("click", () =>{
    console.log(movieTitleInput.value, directorInput.value, movieCommentInput.value);
    movieobject.movie_name = movieTitleInput.value;
    movieobject.director_name = directorInput.value;
    movieobject.text = movieCommentInput.value;

    //add an id on each movie
    let id = Math.floor(Math.random() * 100);
    movieobject.id = id;

    movieTitleInput.value = "";
    directorInput.value = "";
    movieCommentInput.value = "";

    modal.style.display = "none";
    movieheader.style.display = "flex";
    movieList.style.display = "block";

    localStorage.setItem(id, JSON.stringify(movieobject));

    window.location.reload();
})
showMovies();
function showMovies(){
    let movieobjects = localStorage;
    
    for (let i = 0; i < movieobjects.length; i++){
        //getting the movie object from local storage
        let movieobject = JSON.parse(localStorage.getItem(movieobjects.key(i)));

        movieList.innerHTML += `
            <div class="movie__item item-animation">
                <div class="movie_details">
                    <h2 class="movie_name" id="movie-name">
                        ${movieobject.movie_name }
                    </h1>
                    <h3 class="director_name" id="director_name">
                        ${ movieobject.director_name}
                    </h3>
                    <p class="movie-comment" id="movie-comment">
                        ${movieobject.text}
                    </p>
                </div>

                <div class="movie__buttons">
                    <button class="movie__button" id="edit-button" onclick="editMovie(${movieobject.id})">
                        Edit
                    </button>
                    <button class="movie__button" id="delete-button" onclick="deleteMovie(${movieobject.id})">
                        Delete
                    </button>
                </div>
            </div>`
    }

}
//localstorage.remove(99);
function deleteMovie(id){
    localStorage.removeItem(id);
    window.location.reload();
}

function editMovie(id){
    let movieObject = JSON.parse(localStorage.getItem(id));

    modal.style.display = "block";
    movieheader.style.display = "none";
    movieList.style.display = "none";

    movieTitleInput.value = movieObject.movie_name;
    directorInput.value = movieObject.director_name;
    movieCommentInput.value = movieObject.text;

    addBtn.addEventListener("click", () => {
        movieObject.id = id;
        movieObject.movie_name = movieTitleInput.value;
        movieobject.director_name = directorInput.value;
        movieobject.text = movieCommentInput.value;

        localStorage.setItem(id, JSON.stringify(movieObject));


         // making the modal disappear
         modal.style.display = "none";
         movieheader.style.display = "flex";
         movieList.style.display = "block";
 
         deleteMovie(id);
         window.location.reload();
    })
}