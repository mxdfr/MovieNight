function lucas() {
$.get("http://www.omdbapi.com/?t=Spinning_Boris&apikey=db177536", function(data, status){
		document.getElementById("Lucas").innerHTML += "Title: " +data.Title
		document.getElementById("Lucas").innerHTML += "<br>Genres: " + data.Genre
		document.getElementById("Lucas").innerHTML += "<br>Actors: " + data.Actors
		document.getElementById("Lucas").innerHTML += "<br>Director: " + data.Director
		document.getElementById("Lucas").innerHTML += "<br>Writer: " + data.Writer
		document.getElementById("Lucas").innerHTML += "<br>Runtime: " + data.Runtime
		document.getElementById("Lucas").innerHTML += "<br>Awards: " + data.Awards
		document.getElementById("Lucas").innerHTML += "<br>Release data: " + data.Released
		document.getElementById("Lucas").innerHTML += "<br>Website: " + data.Website
		document.getElementById("Lucas").innerHTML += "<br>Plot: " + data.Plot

		var image = document.createElement("img");
		image.src=data.Poster
		document.getElementById("Lucas").append(image)



		console.log(data)
        });
}