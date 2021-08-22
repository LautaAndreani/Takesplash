window.addEventListener("load", () => {
  images("mountain");
  loadContainer.style.visibility = "hidden";
  loadContainer.style.opacity = "0";
});

const container = document.querySelector(".gallery__container");
const error = document.getElementById("error");

async function images(inputUser) {
  const data = await fetch(
    `https://api.unsplash.com/search/photos?client_id=xPo3uq7dbatPsJQnjTEyGcOTMU8oZVjZ-uUXRQtBl3I&query=${inputUser}`
  );
  const json = await data.json();
  if (json.results.length === 0) {
    return (error.style.display = "flex");
  } else {
    error.style.display = "none";
  }
  for (let i = 0; i < 9; i++) {
    createCard(
      json.results[i].urls.regular,
      json.results[i].links.download,
      json.results[i].user.profile_image.small,
      json.results[i].user.first_name
    );
  }
}

const btn = document.querySelector(".input__btn");
btn.addEventListener("click", () => {
  const input = document.getElementById("input__text").value;
  const logText = input.charAt(0).toUpperCase() + input.slice(1);
  if (input === "") {
    notification("Oops... Please complete all fields", "error");
    // alert("Please complete the forms");
    return;
  } else {
    images(logText);
    Search(logText);
    container.innerHTML = "";
  }

  document.querySelector(".input__text").value = "";
});

function Search(input) {
  const textUser = document.querySelector(".searchUser");
  textUser.innerHTML = `${input}`;
}

function createCard(imageApi, download, authorProfile, author) {
  for (let i = 0; i < 1; i++) {
    const containerSearch = document.createElement("div");
    containerSearch.className = "gallery__item";
    containerSearch.innerHTML = `
                <a href="${download}" class="gallery__link" target="_blank" download><button class="gallery__download"><img src="img/download.svg" alt=""></button></a>
                <img src="${imageApi}" loading="lazy" class="gallery__img" alt="">
                <p class="gallery__author"><img src="${authorProfile}" class="gallery__profile" alt="">${author}</p>
        `;
    container.appendChild(containerSearch);
  }
}

function notification(message, status) {
  const noti = document.createElement("div");
  noti.className = "message";
  noti.innerHTML = `
  <img src="img/${status}.svg"/>
  <p>${message}</p>
  `;
  document.body.appendChild(noti);
  setTimeout(function () {
    noti.classList.remove("alert");
  }, 1500);
  noti.classList.add("alert");
}

// Animation load
const loadContainer = document.createElement("div");
loadContainer.className = "load";
loadContainer.innerHTML = `
  <span><svg xmlns="http://www.w3.org/2000/svg" class="maximize" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f7f9fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg></span>
  `;
document.body.appendChild(loadContainer);

// Scroll Reveal
const sr = ScrollReveal({
  distance: "60px",
  duration: 2800,
  //reset: true
});

sr.reveal(`.info__title, .info__descrip, .input, .header`, {
  origin: "top",
  interval: 100,
});
sr.reveal(`.gallery__container`, {
  origin: "bottom",
  interval: 100,
});
