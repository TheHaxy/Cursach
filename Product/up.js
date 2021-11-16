let button = document.querySelector(".arrow-button");

window.onscroll = function () {
  if (window.pageYOffset > 500) {
    button.classList.add("scroll");
  } else {
    button.classList.remove("scroll");
  }
};

button.onclick = function () {
  window.scrollTo(0, 0);
};

ReactDOM.render(
    React.createElement(
        Slider.default,
        {
            infinite: true,
            arrows: false,
            autoplay: true,
        },
        React.createElement("img", {
            src:
                "../img/first-element.jpg",
        }),
        React.createElement("img", {
            src:
                "../img/first-element2.jpg",
        }),
        React.createElement("img", {
            src:
                "../img/first-element3.jpg",
        })
    ),
    document.getElementById("app")
);
