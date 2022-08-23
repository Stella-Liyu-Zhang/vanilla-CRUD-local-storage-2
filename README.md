# CRUD App built with Vanilla JS, html, CSS and store data in local storage.

## Main UI Page
![00](./imgs/Main%20UI.png)


## Reflections:
When writing JS, it's not just to implement a specific function and that's it. It's about logic. 
Since JS is run from top to bottom, and to implement multiple functionalities in an app there must be several JS functions written in the same JS file, the logic is so important and very easy to be messed up.

Here are several reflective points that my mentor Camdyn told me about. 

1) Declare all the variables inside one function at the top.
    - Query all the elements inside the function.

2) Call each function one by one at the bottom
```js
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
```
3) When the user clicks "edit", there should be "save" in Edit item pop up window; When the user clicks "add", it shall be "add" in Add item pop up window.

4) Always make an "are you sure to delete?" warning whenever the user is hitting the "delete" button
```js
    //localstorage.remove(99);
    function deleteMovie(id){
        deleteConfirmation();
        localStorage.removeItem(id);
        window.location.reload();
    }

    
    function deleteConfirmation(){
        return confirm('Are you sure you want to Delete?');
    }
```

5) Proceed sequentially:
    - Read from local storage (Database) 
    - Query elements
    - Construct the element from the read data
    - Attach events to the elements
    - Insert into DOM
6) Read from storage:
```js
    function readfromStorage(){
        Object.keys(localStorage).forEach(key => {
            movies.push(JSON.parse(localStorage.getItem(key)));
        });
        console.log(movies);
    }
```

7) Making id attached to each element:
    - use random function to generate a random number, not the best solution and would be repetitive!
```js
    let id = Math.floor(Math.random() * 100);
```
    - Make incrementing numbers 
8) Make a "template" tag in html whenever we want to embed some into the 


## Some JS Notes:
### ```setItem()``` method
The ```setItem()``` method of the Storage interface, when passed a key name and value, will add that key to the given Storage object, or update that key's value if it already exists.

## CSS Notes:
1) ```justify-content```: space-between is used to make 
```html
 <div class="movie__header" id="movie-header">
            <div class="left__header">
                <h3><span class="movies">26</span>Movies</h3>
            </div>
            <div class="right__header">
                <button class="movie_button" id="add-movie-button">
                    + Add New Movie
                </button>
            </div>
 </div>
 ```
 and if in CSS, the 2 divs "left__header" and "right__header" would have space between them.
 ```CSS
    justify-content: space-between;
 ```
