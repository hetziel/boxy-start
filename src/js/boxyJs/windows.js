export default (e) => {
    let bWindows = e.target.closest(".b-windows");

    if (bWindows) {
        let titles = bWindows.querySelectorAll("[bx-head] [bx-title]");

        titles.forEach((title, index) => {
            if (e.target == title) {
                loadContents(bWindows, index, titles.length);
            }
        });
    }
};

export function InitBWindows() {
    document.querySelectorAll(".b-windows").forEach((i) => {
        let count = 0;
        let title = i.querySelectorAll("[bx-head] [bx-title]");

        title.forEach((i2, titleIndex) => {
            if ((count < 1 && i2.hasAttribute("default"))) {
                console.log(i2)
                count++;
                loadContents(i, titleIndex, title.length);
            }else if(count < 1 ){
                loadContents(i, 0, title.length);

            }
        });
    });
}

function loadContents(bWindows, titleIndex, length) {
    let main = bWindows.querySelectorAll("[bx-content]");

    if (length == main.length) {
        main.forEach((e, contentIndex) => {
            if (titleIndex == contentIndex) {
                e.classList.add("opened");
            } else {
                e.classList.remove("opened");
            }
        });
    } else {
        console.error(
            "Error en b-windows: La cantidad de titles no es igual al content"
        );
    }
}
