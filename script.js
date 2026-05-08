let loginBtn = document.getElementById("loginBtn");
let postBtn = document.getElementById("postBtn");

let username = document.getElementById("username");
let imgUrl = document.getElementById("imgUrl");
let caption = document.getElementById("caption");

let feed = document.getElementById("feed");

let currentUser = "";
let posts = [];

/* LOGIN */
loginBtn.onclick = function(){
  if(username.value === "") return;

  currentUser = username.value;
  alert("مرحباً " + currentUser);
};

/* POST */
postBtn.onclick = function(){
  if(!currentUser){
    alert("سجل الدخول أولاً");
    return;
  }

  if(imgUrl.value === "") return;

  posts.push({
    user: currentUser,
    img: imgUrl.value,
    caption: caption.value,
    likes: 0
  });

  render();
};

/* RENDER */
function render(){
  feed.innerHTML = "";

  posts.slice().reverse().forEach(function(p){

    let div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <img src="${p.img}">
      <div class="post-content">
        <b>${p.user}</b>
        <p>${p.caption}</p>
      </div>
    `;

    let actions = document.createElement("div");
    actions.className = "actions";

    let likeBtn = document.createElement("button");
    likeBtn.className = "like";
    likeBtn.innerText = "❤️ " + p.likes;

    likeBtn.onclick = function(){
      p.likes++;
      render();
    };

    actions.appendChild(likeBtn);
    div.appendChild(actions);

    feed.appendChild(div);
  });
}
