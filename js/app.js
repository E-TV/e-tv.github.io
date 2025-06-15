document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('#tool-list a');
    const container = document.getElementById('tool-container');

    // Hilfsfunktion: Tool-HTML laden und anzeigen
    async function loadTool(name) {
        try {
            const res = await fetch(`tools/${name}.html`);
            if (!res.ok) throw new Error('Tool nicht gefunden');
            const html = await res.text();
            container.innerHTML = html;
        } catch (e) {
            container.innerHTML = `<p style="color: red;">Fehler beim Laden des Tools: ${e.message}</p>`;
        }
    }

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            // Aktiven Link markieren
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Tool laden
            const toolName = link.getAttribute('data-tool');
            loadTool(toolName);
        });
    });
});
