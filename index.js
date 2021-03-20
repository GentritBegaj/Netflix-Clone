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
  let count = 0;
  data.forEach((category, idx) => {
    let mainDiv = document.getElementById("main-div");
    mainDiv.innerHTML += `<div class="category-heading"><h4 class="text-light text-left">${category}</h4></div>
        <div
          id="carouselExampleControls${idx}"
          class="carousel slide px-0  text-center"
          data-ride="carousel"
          data-interval="false"
        >

          <div class="carousel-inner">
            <div class="carousel-item active">
              <div id="main-row${idx}" class="row no-gutters d-flex flex-nowrap"></div>
            </div>
            <div  class="carousel-item">
            <div id="second-row${idx}" class="row no-gutters d-flex flex-nowrap"></div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls${idx}"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls${idx}"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>`;
    const response1 = fetch(`${url}/${category}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU0N2I4NGVjNWEzNTAwMTU0MGQ2ZGYiLCJpYXQiOjE2MTYxNDkzODEsImV4cCI6MTYxNzM1ODk4MX0.A6mOfd_ng0V_z_rWBgKlV2ZDFYuNtNeA1Yt47EYvveo",
      },
    })
      .then((response1) => response1.json())
      .then((data1) => {
        console.log(data1);
        let mainRow = document.getElementById(`main-row${idx}`);
        let secondRow = document.getElementById(`second-row${idx}`);
        data1.forEach((movie, idx1) => {
          if (idx1 < 6) {
            mainRow.innerHTML += `<div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
                            <a href="backoffice.html?id=${movie._id}&category=${movie.category}"><img src=${movie.imageUrl} alt="movie-photo" class="img-fluid" /></a>

                                  </div>`;
          } else {
            secondRow.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                                    <<a href="backoffice.html?id=${movie._id}&category=${movie.category}"><img src=${movie.imageUrl} alt="movie-photo" class="img-fluid" /></a>
                                  </div>`;
          }
        });
      })
      .catch((err) => console.log(err));
  });
};
