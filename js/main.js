window.addEventListener("load", () => {
  images("mountain");
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
    notification("Oops... please complete the forms", "error");
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
