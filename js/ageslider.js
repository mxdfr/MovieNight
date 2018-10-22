var slider = document.getElementById("ageSlider");
var output = document.getElementById("selectedAge");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}