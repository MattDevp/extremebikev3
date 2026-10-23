# ExtremeBike: qué revisar antes de publicar

Todo el contenido se edita en `index.html`.

## Estado
1. ✅ Dirección: Calle Segunda 599, Placilla.
2. ✅ Precios: todos son reales.
3. ✅ Reseñas: 3 reseñas reales de Google, 5 estrellas.
4. ✅ Preguntas frecuentes: 48–72 h, tarjeta/efectivo/transferencia, retiro $6.000 en Placilla y Curauma. Si cambias una respuesta, cámbiala también en el bloque `FAQPage` del `<head>`.

5. ✅ Tiempos estimados de todos los servicios confirmados.

## Extras incluidos
- `assets/og-image.jpg`: imagen que aparece al compartir el enlace por WhatsApp o Facebook (1200×630).
- `apple-touch-icon.png`: ícono cuando alguien guarda el sitio en la pantalla de inicio del celular.
- `404.html`: página propia para direcciones que no existen (activada en `.htaccess`).
- Fotos optimizadas. Las originales en tamaño completo están en la carpeta `fotos-originales`, al lado de esta carpeta (no se suben).

## Después de publicar
- Prueba la vista previa del enlace en https://developers.facebook.com/tools/debug/ (pega `https://extremebike.cl` y presiona "Depurar"). WhatsApp usa la misma información.

## Recomendado
- Crea o verifica la ficha de **Google Business Profile** de la tienda y pide reseñas a clientes.
- Después de publicar, envía `https://extremebike.cl/sitemap.xml` en Google Search Console.
- Si cambias `styles.css` o `main.js`, cambia el número `?v=...` que aparece junto a ese archivo en `index.html`, para que los visitantes vean la versión nueva.

## Publicar
Sube **todo el contenido** de esta carpeta (incluido `.htaccess`, que es un archivo oculto) a `public_html` en tu hosting.
El `.htaccess` redirige las direcciones antiguas (/services, /products, /about) a su sección nueva, para no perder posicionamiento en Google.
