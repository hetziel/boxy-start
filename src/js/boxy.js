import modals, { modalExit } from "./boxyJs/modals";
import windows, { InitBWindows } from "./boxyJs/windows";
import header from "./boxyJs/header";

export default () => {

let on = true;

if (on) {
  


  const boxy = "0.5.15";

  // Boot
  window.addEventListener("load", (event) => {
    initBoxyJS()
  });

  window.addEventListener("DOMContentLoaded", () => {
    console.log("Boxy " + boxy + " is mounted");
    bEvents();

  })

 var initBoxyJS = () => {
    boxyVersion(false);
    bgImg();
    InitBWindows();
    header();
  }

  let hash2 = "";
  let _switch = false;

  // Observador de cambios
  const targetNode = document.body;
  const config = { attributes: true, childList: true, subtree: true };

  const callback = (mutationList, observer) => {
    setColor();
    bgImg();
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  // Fin Observador de cambios

  //Funciones

  // Muestra la versión de Boxy
  function boxyVersion(show = false) {
    if (show) {
      document.body.setAttribute("version", boxy);
    } else {
      document.body.removeAttribute("version");
    }
  }

  //[bg-img]
  function bgImg() {
    document.querySelectorAll("[bg-img]").forEach(function (i) {
      let attrValue = i.getAttribute("bg-img");
      if (attrValue) {
        i.style.backgroundImage = "url(" + attrValue + ")";
        i.setAttribute("bg-img", "");
      }
    });
  }
  // set Color
  function setColor(variable, color) {
    if (variable && color) {
      changeColor("color", variable, color, true);
      changeColor("bg", variable, color, true);
      changeColor("tx", variable, color, true);
    } else {
      let color = [];
      color["primary"] = "blue";
      color["secondary"] = "gray";
      color["success"] = "green";
      color["warning"] = "yellow";
      color["danger"] = "red";
      color["info"] = "light-blue";
      color["light"] = "white";
      color["dark"] = "dark-gray";

      for (let i in color) {
        changeColor("color", i, color[i]);
        changeColor("bg", i, color[i]);
        changeColor("tx", i, color[i]);
      }
    }
  }

  function changeColor(attr, variable, color, origin) {
    document.querySelectorAll("[" + attr + "]").forEach(function (i) {
      if (origin) {
        if (i.attributes[attr]) {
          if (i.attributes[attr].value == variable) {
            i.removeAttribute(attr);
            i.setAttribute(attr, color);
          }
        }
      } else {
        if (i.attributes[attr].value == variable) {
          i.setAttribute("rs", i.attributes[attr].value);
          i.setAttribute(attr, color);
        }
      }
    });
  }

  const getHash = () => {
    return location.hash.slice(1).toLocaleLowerCase().split("/")[1] || "/";
  };

  // Eventos de Boxy
  function bEvents() {
    document.body.addEventListener("click", function (e) {
      // side
      let side = e.target.closest("[mobile-side]");
      let other = document.querySelector(".b-side[opened]");
      if (side) {
        if (side.parentNode.hasAttribute("opened")) {
          side.parentNode.removeAttribute("opened");
        } else {
          if (other) {
            other.removeAttribute("opened");
          }
          side.parentNode.setAttribute("opened", "");
        }
      }
      //close side
      let clean = !e.target.closest(".b-side[opened]");
      if (clean) {
        if (other) {
          other.removeAttribute("opened");
        }
      }
      // head

      let bHeadSide = e.target.closest("[open-nav]");
      if (bHeadSide) {
        if (hash2 != getHash()) {
          _switch = false;
        }
      }
      if (!_switch) {
        if (bHeadSide) {
          bHeadSide.parentNode
            .querySelector("[bx-content]")
            .setAttribute("opened", "");
          _switch = true;
          hash2 = getHash();
        }
      } else {
        let closeHead = !e.target.closest(".b-header [bx-content][opened]");
        if (closeHead) {
          let opened = document.querySelector(".b-header [bx-content][opened]");
          if (opened) {
            opened.removeAttribute("opened");
            _switch = false;
          }
        }
      }

      // b-menu
      let title = e.target.closest(".b-menu [bx-title]");
      if (title) {
        let autoclose = title.parentNode.hasAttribute("autoclose");
        let titles = title.parentNode.querySelectorAll("[bx-title]");
        let brothers = title.parentNode.querySelectorAll("[bx-content]");
        let next = title.nextElementSibling;

        if (autoclose && titles && brothers) {
          titles.forEach((i) => {
            if (i != title) {
              i.removeAttribute("active");
            }
          });
          brothers.forEach((i) => {
            if (i != next) {
              i.style.maxHeight = null;
            }
          });
        }

        title.setAttribute("active", "");
        if (next.hasAttribute("bx-content")) {
          if (next.style.maxHeight) {
            next.style.maxHeight = null;
            title.removeAttribute("active");
          } else {
            next.style.maxHeight = next.scrollHeight + "px";
          }
        }
      }

      modals(e);
      windows(e);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modalExit();
      }
    });

    document.addEventListener("mousedown", function (e) {
      //Button Ripple
      let btnRipple = e.target.closest('[class^="b-btn"][ripple]');

      if (btnRipple) {
        const circle = document.createElement("span");
        const diameter = Math.max(btnRipple.clientWidth, btnRipple.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - btnRipple.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - btnRipple.offsetTop - radius}px`;
        circle.classList.add("ripple");
        btnRipple.appendChild(circle);
        setTimeout(() => btnRipple.removeChild(circle), 500);
      }
    });
  }
}

};