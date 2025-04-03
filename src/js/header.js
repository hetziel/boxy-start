import header from "./boxyJs/header";
import whAuto from "./boxyJs/wh-auto";
import { headerEventClick } from "./boxyJs/header";
import { headerFunction } from "./boxyJs/header";

//Preset
whAuto();
// Boot
window.addEventListener("load", (event) => {
    initBoxyJS()
});

export var initBoxyJS = () => {
    header();
    headerFunction();
}


window.addEventListener("DOMContentLoaded", () => {
    bEvents();
})


// Eventos de Boxy
function bEvents() {
    document.body.addEventListener("click", function (e) {
        headerEventClick(e);
    });

}
