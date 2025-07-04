import routes from "../router";

function parseLocation() {
    return window.location.pathname.toLowerCase() || '/';
}

async function router() {
    const app = document.getElementById('app');
    // Vista de carga
    app.innerHTML = `
        <div style="text-align:center; padding:2rem;">
            <span class="loader" style="display:inline-block;width:2rem;height:2rem;border:3px solid #312e81;border-top:3px solid #f0fdfa;border-radius:50%;animation:spin 1s linear infinite;"></span>
            <p style="color:#64748b;">Cargando...</p>
        </div>
        <style>
            @keyframes spin { 100% { transform: rotate(360deg); } }
        </style>
    `;

    const path = parseLocation();
    const route = routes[path] || (() => `<h2>Error 404</h2><p>Página no encontrada.</p>`);
    try {
        const pageModule = await route();
        app.innerHTML = pageModule;
    } catch (e) {
        app.innerHTML = `<h2>Error</h2><p>No se pudo cargar la página.</p>`;
    }
}

// Interceptar clicks en enlaces internos para navegación SPA
document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && target.getAttribute('href') && target.origin === location.origin) {
        const href = target.getAttribute('href');
        if (href.startsWith('/')) {
            e.preventDefault();
            window.history.pushState({}, '', href);
            router();
        }
    }
});

// Escuchar cambios de historial
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);