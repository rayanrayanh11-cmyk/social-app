let loginBtn = document.getElementById("loginBtn");
let loginName = document.getElementById("loginName");
let btn = document.getElementById("btn");
let img = document.getElementById("img");
let feed = document.getElementById("feed");

let currentUser = "";
let users = {};

loginBtn.onclick = function(){
  currentUser = loginName.value;
  if(!users[currentUser]){
    users[currentUser] = [];
  }
};

btn.onclick = function(){
  if(!currentUser) return;

  users[currentUser].push(img.value);

  render();
};

function render(){
  feed.innerHTML = "";

  for(let u in users){
    users[u].forEach(function(p){
      let div = document.createElement("div");
      div.className = "card";

      let i = document.createElement("img");
      i.src = p;

      div.appendChild(i);
      feed.appendChild(div);
    });
  }
}
