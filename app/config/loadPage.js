const pageCache = {};

export default async function loadPage(view) {
    const route = '../pages/' + view;

    // Si ya está en caché, retorna el HTML guardado
    if (pageCache[route]) {
        return pageCache[route];
    }

    try {
        const res = await fetch(route);
        if (!res.ok) throw new Error('No encontrado');
        const html = await res.text();
        pageCache[route] = html; // Guarda en caché
        return html;
    } catch (e) {
        return `<h2>Error 404</h2><p>Página no encontrada.</p>`;
    }
}