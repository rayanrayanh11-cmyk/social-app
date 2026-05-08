let userBtn = document.getElementById("loginBtn");
let postBtn = document.getElementById("postBtn");

let user = document.getElementById("user");
let img = document.getElementById("img");
let caption = document.getElementById("caption");

let feed = document.getElementById("feed");
let explore = document.getElementById("explore");
let profile = document.getElementById("profile");

let currentUser = "";
let posts = [];

/* LOGIN */
userBtn.onclick = function(){
  currentUser = user.value;
  alert("مرحباً " + currentUser);
};

/* POST */
postBtn.onclick = function(){
  if(!currentUser) return;

  posts.push({
    user: currentUser,
    img: img.value,
    caption: caption.value,
    likes: 0
  });

  render();
};

/* RENDER FEED */
function render(){
  feed.innerHTML = "";
  explore.innerHTML = "";

  posts.slice().reverse().forEach(p => {

    let card = createCard(p);

    feed.appendChild(card);
    explore.appendChild(card.cloneNode(true));
  });
}

/* CARD */
function createCard(p){
  let div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${p.img}">
    <div class="content">
      <b>@${p.user}</b>
      <p>${p.caption}</p>
    </div>
  `;

  let like = document.createElement("button");
  like.className = "like";
  like.innerText = "❤️ " + p.likes;

  like.onclick = function(){
    p.likes++;
    render();
  };

  div.appendChild(like);

  return div;
}

/* NAV */
function showFeed(){
  feed.style.display = "block";
  explore.style.display = "none";
  profile.style.display = "none";
}

function showExplore(){
  feed.style.display = "none";
  explore.style.display = "block";
  profile.style.display = "none";
}

function showProfile(){
  feed.style.display = "none";
  explore.style.display = "none";
  profile.style.display = "block";

  profile.innerHTML = `
    <h3>👤 ${currentUser}</h3>
    <p>عدد المنشورات: ${posts.length}</p>
  `;
}

/* default */
showFeed();
