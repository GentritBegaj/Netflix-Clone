const nav = document.querySelector("nav");
window.addEventListener("scroll", showNav);
function showNav() {
  if (pageYOffset > 150) {
    if (nav.classList.contains("backdrop-blur")) return;
    nav.style.transform = "translateY(-200px)";
    setTimeout(() => {
      nav.classList.remove("bg-transparent");
      nav.classList.add("backdrop-blur");
      nav.style.transform = "translateY(0)";
    }, 100);
  }

  if (pageYOffset === 0) {
    nav.style.transform = "translateY(-200px)";
    setTimeout(() => {
      nav.style.transform = "translateY(0)";
      nav.classList.add("bg-transparent");
      nav.classList.remove("backdrop-blur");
    }, 100);
  }
}

const url = "https://striveschool-api.herokuapp.com/api/movies";
let categories = [];

window.onload = async () => {
  const response = await fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU0N2I4NGVjNWEzNTAwMTU0MGQ2ZGYiLCJpYXQiOjE2MTYxNDkzODEsImV4cCI6MTYxNzM1ODk4MX0.A6mOfd_ng0V_z_rWBgKlV2ZDFYuNtNeA1Yt47EYvveo",
    },
  });
  const data = await response.json();

  console.log(data);
  data.forEach((category, idx) => {
    let mainDiv = document.getElementById("main-div");
    mainDiv.innerHTML += `<div id="image-slider${idx}" class="splide">
                                  <div class="splide__track">
                                      <ul class="splide__list splideList${idx}">
                                      </ul>
                                  </div>
                              </div>`;

    fetch(`${url}/${category}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU0N2I4NGVjNWEzNTAwMTU0MGQ2ZGYiLCJpYXQiOjE2MTYxNDkzODEsImV4cCI6MTYxNzM1ODk4MX0.A6mOfd_ng0V_z_rWBgKlV2ZDFYuNtNeA1Yt47EYvveo",
      },
    })
      .then((response1) => response1.json())
      .then((data1) => {
        console.log(data1);
        let carouselList = document.querySelector(`.splideList${idx}`);
        data1.forEach((movie) => {
          carouselList.innerHTML += ` <li class="splide__slide"><img src="${movie.imageUrl}"></li>`;
        });
      })
      .catch((err) => console.log(err));
  });
  new Splide(`#image-slider0`, {
    perPage: 6,
    perMove: 1,
    pagination: false,
    breakpoints: {
      800: {
        perPage: 4,
      },
      640: {
        perPage: 2,
      },
      480: {
        perPage: 1,
      },
    },
  }).mount();
  new Splide(`#image-slider1`, {
    perPage: 6,
    perMove: 1,
    pagination: false,
    breakpoints: {
      800: {
        perPage: 4,
      },
      640: {
        perPage: 2,
      },
      480: {
        perPage: 1,
      },
    },
  }).mount();
  new Splide(`#image-slider2`, {
    perPage: 6,
    perMove: 1,
    pagination: false,
    breakpoints: {
      800: {
        perPage: 4,
      },
      640: {
        perPage: 2,
      },
      480: {
        perPage: 1,
      },
    },
  }).mount();
  new Splide(`#image-slider3`, {
    perPage: 6,
    perMove: 1,
    pagination: false,
    breakpoints: {
      800: {
        perPage: 4,
      },
      640: {
        perPage: 2,
      },
      480: {
        perPage: 1,
      },
    },
  }).mount();
};