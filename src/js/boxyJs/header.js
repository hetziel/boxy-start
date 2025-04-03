let menuVisible = null;
let _switch = false;

export default () => {
    const navMenus = document.querySelectorAll(".b-nav-menu>li>ul");

    function resetStyles() {
        if (menuVisible) {
            menuVisible.style.opacity = "";
            menuVisible.style.pointerEvents = "";
            menuVisible = null;
        }
    }

    navMenus.forEach((navMenu) => {
        navMenu.addEventListener('mouseover', function (e) {
            if (e.target.tagName === "LI" && e.target.children.length > 1) {
                resetStyles();

                const elementsArray = Array.from(e.target.children);
                elementsArray.forEach(element => {
                    if (element.tagName === "UL") {
                        menuVisible = element;
                        menuVisible.style.opacity = "1";
                        menuVisible.style.pointerEvents = "all";
                    }
                });
            } else if (menuVisible && e.target.parentElement === navMenu && e.target.tagName === "LI" && e.target.children.length <= 1) {
                resetStyles();
            }
        });

        navMenu.addEventListener('mouseout', function (e) {
            if (!navMenu.contains(e.relatedTarget)) {
                resetStyles();
            }
        });

    });

}


export function headerFunction() {
    let header = document.querySelectorAll("[scroll-detector]")
    if (header.length > 1) {
        setPosition()

        // Scroll detector
        window.addEventListener("scroll", function () {
            setPosition()
        })
    }

    function setPosition() {
        header.forEach(e => {
            if (getPosition() > 0) {
                e.setAttribute("scroll-detector", "1")
            } else {
                e.setAttribute("scroll-detector", "0")
            }
        });
    }
    function getPosition() {
        return window.scrollY || document.documentElement.scrollTop;
    }
}

export function headerEventClick(e) {
    let bHeadSide = e.target.closest("[open-nav]");
    if (bHeadSide) {
        if (!_switch) {
            if (bHeadSide) {
                bHeadSide.parentNode
                    .querySelector("[bx-content]")
                    .setAttribute("opened", "");
                _switch = true;
            }
        } else {
            let closeHead = !e.target.closest(".b-header [bx-content][opened]");
            if (closeHead) {
                let bContent = bHeadSide.parentNode.querySelector("[bx-content]");
                if (bContent.hasAttribute("opened")) {
                    bContent.removeAttribute("opened");
                    _switch = false;
                }
            }
        }
    }
}