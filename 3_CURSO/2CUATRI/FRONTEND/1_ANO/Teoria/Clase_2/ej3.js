// deno-lint-ignore-file no-var

function keyPress(event) {
  var pelotita = document.getElementById("pelotita");
  var position = pelotita.getBoundingClientRect();
  var leftPelotita = position.left;
  var topPelotita = position.top;
  if (event.keyCode === 37) {
    leftPelotita++;
  }
  if (event.keyCode === 38) {
    leftPelotita--;
  }
  if (event.keyCode === 39) {
    topPelotita++;
  }
  if (event.keyCode === 40) {
    topPelotita--;
  }
  pelotita.style.transform = `translate(${leftPelotita}px, ${topPelotita}px)`;
}
window.addEventListener("keydown", keyPress);
