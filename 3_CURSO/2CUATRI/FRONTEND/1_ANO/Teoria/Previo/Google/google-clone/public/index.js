import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import Input from "./res/components/input";
import InputP from "./res/components/inputP";
function Index() {
    return (
        <body> <div className="App"> </div>  </body>
    );
    }

    /**
     * <html lang="en">

<head>
  <meta charset="utf-8" />
  <title>Google Clone</title>
  <script src="index.js"></script>
  <link rel="stylesheet" href="css/style.css" />

</head>

<body>
  <div class="containerLogo">
    <div class="FirstG">G</div>
    <div class="Firsto">o</div>
    <div class="secondo">o</div>
    <div class="secondG">g</div>
    <div class="Firstl">l</div>
    <div class="Firste">e</div>
  </div>
  <input class="searchbar" placeholder="Buscar en Google o escribir una URL" id="search">
  <input class="searchbutton" type="button">
  </input>
  <div class="InputP"><InputP />
  <script>
    import React from 'react';
    import ReactDOM from 'react-dom';
    import {InputP} from './components/InputP';
    document.addEventListener("DOMContentLoaded", () => {
      const search = document.querySelector(".searchbar");
      const sInputP = document.querySelector(".InputP");
      if (search.value === "do a barrel roll") {
        window.alert("Do a barrel roll!");
        screen = document.getElementById("body");
        screen.style.transform = "rotate(360deg)";
        href = "https://www.google.com";
      } else {
        const searchbutton = document.querySelector(".searchbutton");
        searchbutton.addEventListener("click", () => {
          const url = search.value;
          if (url.includes(".es") || url.includes(".com")) {
            window.alert("Please enter a valid URL");
            window.location.href = url;
          } else {
            window.location.href = "https://www.google.com/search?q=" + url;
          }
        });
        const searchbar = document.querySelector(".searchbar");
        searchbar.addEventListener("keyup", (e) => {
          if (e.keyCode === 13) {
            const url = search.value;
            window.location.href = "https://www.google.com/search?q=" + url;
            const searchP = document.querySelector(".searchP");
          }
        });
      }
    });
  </script>
</body>

</html>
*/
//make this code into jsx