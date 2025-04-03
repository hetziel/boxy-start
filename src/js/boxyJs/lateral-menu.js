export default (data = null) => {
  // Show Menu Lateral

  document.addEventListener("click", (e) => {
    let open = e.target.closest("[bx-open-lateral-menu]");

    if (open) {
      let id_lateral_menu = open.getAttribute("bx-open-lateral-menu");
      if (id_lateral_menu) {
        let menu_lateral = document.querySelector(
          ".b-lateral-menu#" + id_lateral_menu
        );
        if (!menu_lateral.classList.contains("show")) {
          console.log(!menu_lateral.classList.contains("show"));
          menu_lateral.classList.add("show");
        }
      }
    }
  });

  // Menu Lateral System
  let lateral_menus = document.querySelectorAll(".b-lateral-menu");

  if (lateral_menus && lateral_menus.length > 0) {
    lateral_menus.forEach((element) => {
      element.addEventListener("click", (e) => {
        let button = e.target.closest("[bx-close]");
        if (button) {
          element.classList.remove("show");
        }
      });
    });
  }
  // Container
  let menu_container = document.querySelector("body");

  menu_container.addEventListener("click", (e) => {
    if (!e.target.closest(".b-lateral-menu")) {
      if (lateral_menus.length > 0) {
        lateral_menus.forEach((element) => {
          if (element.classList.contains("show")) {
            element.classList.remove("show");
          }
        });
      }
    }
  });
};

export function lateralMenuTest(id, data) {
  let found = document.querySelector("#" + id);
  if (found) {
    if (!found.hasAttribute("no-animation")) {
      found.setAttribute("no-animation", "");
      found.setAttribute("data-b-position", data.position);
      setTimeout(() => {
        if (found.hasAttribute("no-animation")) {
          found.removeAttribute("no-animation");
        }
      }, 1000);
    }
  }
}
