function lucas(title) {
$.get("http://www.omdbapi.com/?t=" + title + "&apikey=db177536", function(data, status){
		document.getElementById("omdb").innerHTML += "Title: " +data.Title
		document.getElementById("omdb").innerHTML += "<br>Genres: " + data.Genre
		document.getElementById("omdb").innerHTML += "<br>Actors: " + data.Actors
		document.getElementById("omdb").innerHTML += "<br>Director: " + data.Director
		document.getElementById("omdb").innerHTML += "<br>Writer: " + data.Writer
		document.getElementById("omdb").innerHTML += "<br>Runtime: " + data.Runtime
		document.getElementById("omdb").innerHTML += "<br>Awards: " + data.Awards
		document.getElementById("omdb").innerHTML += "<br>Release data: " + data.Released
		document.getElementById("omdb").innerHTML += "<br>Website: " + data.Website
		document.getElementById("omdb").innerHTML += "<br>Plot: " + data.Plot

		var image = document.createElement("img");
		image.src=data.Poster
		document.getElementById("Lucas").append(image)



		console.log(data)
        });
}