$(document).ready(() => {

    $('#searchForm').on('submit', (e) => {

        let searchText = ($('#searchText').val())
        getMovies(searchText);
        e.preventDefault();
        $(".middle").css("display", "block");
        $(".bottom").css("display", "block");

    });

});

function getMovies(searchText) {
    axios.get("http://www.omdbapi.com?s=" + searchText + "&apikey=145f5152")
        .then((response) => {
            console.log(response)
            let movies = response.data.Search;
            let output = "";
            $.each(movies, (index, movie) => {
                
                output += `
            
                    <div class="column is-one-third-desktop is-half-tablet is-full-mobile  is-centered">
                    
                        <div class="box  is-centered">
                            <img class="lg-preview" src="${movie.Poster}">
                            <h5 class="movie-title">${movie.Title} (${movie.Year})</h5>
                            <button onclick="movieSelected('${movie.imdbID}')" class="button" id="#show-modal" href="#">Movie Info</button>
                        </div>
            
                    </div>
                    
                        `;
                                            })

                    $("#movies").html(output);

                        })

                .catch((err) => {
            
                        console.log(err)
        })
}


function movieSelected(id) {

    axios.get("http://www.omdbapi.com?i=" + id + "&plot=full" + "&apikey=145f5152")
        .then((response) => {
            console.log(response)

            let movie = response.data;
            let output = "";

            output += `

        <div class="modal">
            <div class="modal-background"></div>
                <div class="modal-card">
                    
                <header class="modal-card-head">
                    <p class="modal-card-title">${movie.Title} (${movie.Year})</p>
                    <button class="delete close-modal" onclick="closeModal()" aria-label="close"></button>
                </header>
                                 
                <section class="modal-card-body">
                                
                    <img class="sm-preview" src="${movie.Poster}">                            
                    <img src="img/imdb.png" id="imdb">
                    <span class="imdb-rating">Rating: ${movie.imdbRating}</span>

                    <br>
                    <br>
                                
                    <p>${movie.Plot}</p>

                </section>
                                     
                <footer class="modal-card-foot">
                                                         
                    <p><span class="metadata">Country: </span>${movie.Country}</p>
                    <p><span class="metadata">Genre: </span>${movie.Genre}</p>
                    <p><span class="metadata">Metascore: </span>${movie.Metascore}</p>
                    <p><span class="metadata">Rated: </span>${movie.Rated}</p>
                    <p><span class="metadata">Runtime: </span>${movie.Runtime}</p>
                    <p><span class="metadata">Released: </span>${movie.Released}</p>
                                                 
                </footer>
            </div>
      </div>


            `;

                    $(output).appendTo(".container-fluid")

        })


        .catch((err) => {
            console.log(err)

        })
}


function closeModal() {

    $(".modal").css("display", "none")

}


