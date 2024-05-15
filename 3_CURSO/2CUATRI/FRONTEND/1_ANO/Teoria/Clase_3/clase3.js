var page = 1;
function fetchCharacters(input) {
  fetch("https://rickandmortyapi.com/api/character/?page=" + input)
    .then((data) => data.json())
    .then((chars) => {
      var container = document.getElementById("characters");
      container.innerHTML = "";
      chars.results.forEach((char) => {
        var charDiv = document.createElement("div");
        charDiv.className = "character";
        charDiv.innerHTML = `
                <img src="${char.image}" />
                <div class="name">${char.name}</div>
            `;
        container.appendChild(charDiv);
      });
    });
}

function nextpage() {
  page++;
  fetchCharacters(page);
}

function previouspage() {
  if (page > 1) page--;
  else page = 1;
}

function searchByName() {
  var container = document.getElementById("characters");
  var input = document.getElementById("search").value;
  container.innerHTML = "";
  fetch("https://rickandmortyapi.com/api/character/?name=" + input)
    .then((data) => data.json())
    .then((chars) => {
      var container = document.getElementById("characters");
      container.innerHTML = "";
      chars.results.forEach((char) => {
        var charDiv = document.createElement("div");
        charDiv.className = "character";
        charDiv.innerHTML = `
              <img src="${char.image}" />
              <div class="name">${char.name}</div>
          `;
        container.appendChild(charDiv);
      });
    });
}

function returnHome() {
  page = 1;
  fetchCharacters(page);
}
