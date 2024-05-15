// deno-lint-ignore-file no-inner-declarations no-var
var num_users = 0;
var Globname = "";
var screenHeight = parseInt(window.innerHeight);

function expandChat(name) {
  var chats = document.getElementsByClassName("left-bar")[0].children;
  chats = Array.from(chats);
  Globname = name;
  if (document.getElementById(name + " chat") == null) {
    const $chat = document.createElement("chat");
    $chat.id = name + " chat";
    var bodyId = name + " body";
    $chat.innerHTML =
      "<div class='chat'><div class='chat-header'><img alt='test' src='res/" +
      num_users +
      ".png' style='position:relative; top :20%;left:0%;height:60px; width:60px;border-radius: 50%;'>Chat with  " +
      name +
      "</div><div class='chat-body' id = '" +
      bodyId +
      "'><div class='chat-footer'><input type='text' class='chat-input' id='text" +
      name +
      "' placeholder='Escribe un mensaje...'><div class='chat-button' onclick='sendMessage(\"" +
      name +
      "\")'></div></div></div></div>";
    $chat.style.position = "absolute";
    $chat.style.left = "20%";
    $chat.style.top = "0%";
    $chat.style.height = "100%";
    $chat.style.width = "80%";
    var anim = $chat.animate([{ left: "0%" }, { left: "20%" }], {
      duration: 100,
    });
    document.body.appendChild($chat);
  } else {
    const $chat = document.getElementById(name + " chat");
    $chat.style.position = "absolute";
    $chat.style.left = "20%";
    $chat.style.top = "0%";
    $chat.style.display = "flex";
    $chat.style.height = "100%";
    $chat.style.width = "80%";
    var anim = $chat.animate([{ left: "0%" }, { left: "20%" }], {
      duration: 100,
    });
    chats.forEach((element) => {
      var extract = element.id.split(" ");
      if (document.getElementById(extract[0] + " chat") != null)
        document.getElementById(extract[0] + " chat").style.display = "none";
    });
    $chat.style.display = "flex";
  }
}
function sendMessage(name) {
  var rndm = Math.floor(Math.random() * 10);
  var text = document.getElementById("text" + name + "").value;

  if (text != "") {
    if (rndm % 2) {
      const $message = document.createElement("message");
      $message.id = "message1";
      $message.innerHTML = "<div class='message'>" + text + "</div>";
      document.getElementById(name + " body").append($message);
    } else {
      const $message = document.createElement("message-other");
      $message.id = "message-other1";
      $message.innerHTML = "<div class='message-other'>" + text + "</div>";
      document.getElementById(name + " body").append($message);
    }
    document.getElementById("text" + name + "").value = "";
    const $chat = document.getElementById(name + " contact");
    $chat.style.position = "absolute";
    $chat.style.left = "0%";
    $chat.style.top = "0%";
    $chat.style.height = "10%";
    $chat.style.width = "100%";
    var chats = document.getElementsByClassName("left-bar")[0].children;
    chats = Array.from(chats);
    chats.forEach((element) => {
      if (element.id != name + " contact") {
        var newHeight = parseInt(element.style.top) + 10 + "%";
        element.style.position = "absolute";
        element.style.height = "10%";
        element.style.width = "100%";
        element.style.left = "0%";
        element.style.top = newHeight;
      }
    });

    var lastChild = document.getElementById(name + " body").lastChild;
    if (lastChild.getBoundingClientRect().top > window.innerHeight - 400) {
      document
        .getElementById(name + " body")
        .scrollTo(
          0,
          document.getElementById(name + " body").scrollHeight - 400
        );
    }
  }
}
function createContact() {
  if (num_users <= 10) num_users++;
  else num_users = 1;
  name = prompt("Please enter your name", "Username");
  if (name == null || name == "") name = "Default";
  if (document.getElementById(name + " contact") != null) {
    alert("User already exists");
    return;
  }
  const $contact = document.createElement("user");
  $contact.id = name + " contact";
  var contactHeight = 10 * (num_users - 1) + "%";
  $contact.style.position = "absolute";
  $contact.style.left = "0%";
  $contact.style.height = "10%";
  $contact.style.width = "100%";
  $contact.style.top = contactHeight;
  $contact.innerHTML =
    "<div class='user'onclick='expandChat(\"" +
    name +
    "\")'><img alt='Img'src='res/" +
    num_users +
    ".png' style='position:absolute;left:10%;top:100%;height:60px; width:60px;border-radius: 50%;'>" +
    name +
    "</div>";
  document.getElementsByClassName("left-bar")[0].append($contact);
}
function deleteContact() {
  num_users--;
  var name = prompt("Please enter username to delete", "Username");
  var chats = document.getElementById(name + " contact");
  chats.style.position = "absolute";
  chats.style.left = "0%";
  chats.style.top = "0%";
  chats.style.height = "100%";
  chats.style.width = "100%";
  chats.animate([{ top: "0%" }, { top: "100%" }], { duration: 400 });
  setTimeout(function () {
    if (document.getElementById(name + " chat") != null)
      document.getElementById(name + " chat").remove();
    document.getElementById(name + " contact").remove();
  }, 400);
}
function enterKey(e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    sendMessage(Globname);
  }
}
window.addEventListener("keydown", enterKey);
