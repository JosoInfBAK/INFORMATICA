
import "./App.css";
import search from "./search.js";
import React from "react";
import ReactDOM from "react-dom/client";
import logo from "./components/logo.js";

function App() {
  return (
    <div className="App">
      <head>
        <meta charset="utf-8" />
        <title>Google Clone</title>
        <script src="index.js"></script>
        <link rel="stylesheet" href="css/style.css" />
      </head>
      <body>
      <div class="containerLogo">
        <logo />
      </div>
        <input
          class="searchbar"
          placeholder="Buscar en Google o escribir una URL"
          id="search"
        />
        <script src="search.js"></script>
        import search from "./search.js";
        <script src="search.js">
          search();
        </script>
        <input class="searchbutton" type="button"></input>
        <div class="buttons">
          <input class="button" type="button" value="Google Search"></input>
          <input class="button" type="button" value="I'm Feeling Lucky"></input>
        </div>
        <div class="languages">
          <a href="https://www.google.com/setprefs?sig=0_7y4J4YJ3ZJjN4H1rjvQ3V5X8Zgk%3D&amp;hl=es&amp;source=homepage&amp;sa=X&amp;ved=0ahUKEwjY2J6A3J3wAhXJx4UKHdJ1BZMQ2ZgBCAU">
            Google offered in: Español (Latinoamérica)
          </a>
        </div>
        <div class="footer">
          <div class="footer2">
            <a href="https://policies.google.com/privacy?hl=es-419&amp;fg=1">
              Privacy  
            </a>
            <a href="https://policies.google.com/terms?hl=es-419&amp;fg=1">
              Terms
            </a>
            <a href="https://www.google.com/preferences?hl=es-419&amp;fg=1">
              Settings
            </a>
          </div>
        </div>
      </body>
    </div>
  );
  
}

export default App;
