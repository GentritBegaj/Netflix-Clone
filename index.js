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

  let mainDiv = document.getElementById("main-div");
  data.forEach((category, index) => {
    mainDiv.innerHTML += `<div>
                            <div class="w-100 px-5"><h4 class="text-light text-left">${category}</h4></div>
                                                        <div id="image-slider-${index}" class="splide mb-5">
                                <div class="splide__track">
                                    <ul class="splide__list list__${index}">
                                    </ul>
                                </div>
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
        let carouselList = document.querySelector(`.list__${index}`);

        data1.forEach((movie) => {
          carouselList.innerHTML += ` <li class="splide__slide"><img src="${movie.imageUrl}"></li>`;

          new Splide(`#image-slider-${index}`, {
            perPage: 6,
            pagination: false,
            drag: true,
            speed: 800,
            easing: "cubic-bezier(.42,.65,.27,.99)",
            perMove: 1,
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
        });
      })
      .catch((err) => console.log(err));
  });
};
