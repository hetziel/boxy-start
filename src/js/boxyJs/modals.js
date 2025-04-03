let modalAttribute;
let openModal = "open-modal";
let closeModal = "close-modal";
let modalName = "modal";

export default (e) => {
    let bModal = e.target.closest("[" + openModal + "]");

    if (bModal) {
        modalAttribute = bModal.getAttribute(openModal)
        if (modalAttribute != null && modalAttribute != "") {
            let modals = document.querySelectorAll('[' + modalName + '="' + modalAttribute + '"].b-modal')

            if (modals.length == 1) {
                modals[0].classList.add("opened");
            } else if (modals.length > 1) {
                console.error("Se ha encontrado " + modals.length + " modales con el mismo valor ");
            }
            else {
                console.error("No se ha encontrado una modal definida así: " + 'modal="' + modalAttribute + '"');
            }
        }
    }

    let bModalWrapper = false
    let bModalWrapper2 = false
    let bModalClose = false
    let bModalMax = false

    if (modalAttribute) {
        bModalWrapper = e.target.closest('[' + modalName + '="' + modalAttribute + '"].b-modal');
        bModalWrapper2 = !e.target.closest('[' + modalName + '="' + modalAttribute + '"].b-modal [bx-content]');
        bModalClose = e.target.closest('[' + modalName + '].b-modal [bx-content] [' + closeModal + ']');
        bModalMax = e.target.closest('[' + modalName + '].b-modal [bx-content] [maximize-modal]');
    }

    if (bModalWrapper && bModalWrapper2 || bModalClose && bModalWrapper) {
        closePopupScreen(bModalWrapper);
    }

    if (bModalWrapper && bModalMax) {
        console.log('hola')
        bModalWrapper.classList.toggle('maximized')
    }
}

export function modalExit() {
    let modalOpened = modalAttribute ? document.querySelector('[modal="' + modalAttribute + '"].b-modal.opened') : false
    if (modalOpened) closePopupScreen(modalOpened);
}

function closePopupScreen(modal) {
    modal.classList.add("closed");
    setTimeout(() => {
        modal.classList.remove("opened");
        modal.classList.remove("closed");
    }, 400);
}