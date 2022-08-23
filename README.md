# CRUD App built with Vanilla JS, html, CSS and store data in local storage.

## Main UI Page
![00](./imgs/Main%20UI.png)

## Some JS Notes:
### setItem() method
The setItem() method of the Storage interface, when passed a key name and value, will add that key to the given Storage object, or update that key's value if it already exists.
## why local storage?


## CSS Notes:
1) justify-content: space-between is used to make 
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
