// ================= AUTH =================

function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

// ================= SIGN UP =================

function signup(e) {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username.value]) {
    alert("Username already exists");
    return;
  }

  users[username.value] = {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
    images: []
  };

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", username.value);

  window.location.href = "profile.html";
}

// ================= LOGIN =================

function login(e) {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users")) || {};

  for (let user in users) {
    if (
      (loginUser.value === user || loginUser.value === users[user].email) &&
      loginPass.value === users[user].password
    ) {
      localStorage.setItem("loggedInUser", user);
      window.location.href = "profile.html";
      return;
    }
  }

  alert("Invalid credentials");
}

// ================= IMAGE UPLOAD =================

function uploadImage() {
  const file = document.getElementById("imageInput").files[0];
  if (!file) return;

  const users = JSON.parse(localStorage.getItem("users"));
  const user = localStorage.getItem("loggedInUser");

  if (!users || !user) return;

  const reader = new FileReader();
  reader.onload = function () {
    users[user].images.push(reader.result);
    localStorage.setItem("users", JSON.stringify(users));
    loadMyImages();
  };

  reader.readAsDataURL(file);
}

// ================= PRIVATE GALLERY =================

function loadMyImages() {
  const gallery = document.getElementById("myGallery");
  if (!gallery) return;

  const users = JSON.parse(localStorage.getItem("users"));
  const user = localStorage.getItem("loggedInUser");

  if (!users || !users[user]) return;

  gallery.innerHTML = "";

  users[user].images.forEach(img => {
    gallery.innerHTML += `<img src="${img}">`;
  });
}

// ================= PUBLIC PROFILE =================

function loadPublicProfile() {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("user");

  const title = document.getElementById("userTitle");
  const gallery = document.getElementById("publicGallery");

  if (!username || !gallery) return;

  const users = JSON.parse(localStorage.getItem("users"));
  if (!users || !users[username]) {
    title.innerText = "User not found";
    return;
  }

  title.innerText = `${username}'s Gallery`;
  gallery.innerHTML = "";

  users[username].images.forEach(img => {
    gallery.innerHTML += `<img src="${img}">`;
  });
}

// ================= LANDING PAGE =================

function loadLandingImages() {
  const gallery = document.getElementById("landingGallery");
  if (!gallery) return;

  const users = JSON.parse(localStorage.getItem("users")) || {};
  let allImages = [];

  for (let user in users) {
    allImages = allImages.concat(users[user].images);
  }

  gallery.innerHTML = "";

  allImages
    .sort(() => 0.5 - Math.random())
    .slice(0, 9)
    .forEach(img => {
      gallery.innerHTML += `<img src="${img}">`;
    });
}
