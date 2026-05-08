import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== Firebase Config (جاهز للتبديل لاحقاً) =====
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===== Current User =====
let currentUser = "";

// ===== LOGIN =====
window.login = function () {
  let user = document.getElementById("user").value;

  if (!user) {
    alert("اكتب اسم المستخدم");
    return;
  }

  currentUser = user;
  alert("تم تسجيل الدخول: " + currentUser);

  loadPosts();
};

// ===== ADD POST =====
window.addPost = async function () {
  if (!currentUser) {
    alert("سجل الدخول أولاً");
    return;
  }

  let img = document.getElementById("img").value;
  let text = document.getElementById("text").value;

  if (!img || !text) {
    alert("املأ جميع الحقول");
    return;
  }

  await addDoc(collection(db, "posts"), {
    user: currentUser,
    img: img,
    text: text,
    likes: 0,
    time: Date.now()
  });

  loadPosts();
};

// ===== LOAD POSTS =====
window.loadPosts = async function () {
  let feed = document.getElementById("feed");
  feed.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "posts"));

  querySnapshot.forEach((doc) => {
    let p = doc.data();

    let div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <img src="${p.img}">
      <div class="post-body">
        <b>@${p.user}</b>
        <p>${p.text}</p>
        <small>💙 ${p.likes} likes</small>
      </div>
    `;

    feed.appendChild(div);
  });
};

// ===== START =====
loadPosts();
