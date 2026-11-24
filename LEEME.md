# Operativo diario · v2

Asistente operativo para vender servicios y llegar a la meta de USD 3.000.

## Qué hay acá

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa. Es el único que necesitás para usarla. |
| `sw.js` | Service worker: hace que abra sin conexión y habilita la instalación. |
| `manifest.webmanifest` | Le dice al teléfono el nombre, el color y los íconos de la app. |
| `icon-192.png` / `icon-512.png` | Los íconos. Si no están, la app abre igual pero no se instala bien. |

## Cómo usarla ya mismo (sin publicar)

Abrí `index.html` en el navegador. Funciona entera, guarda todo en el navegador.
Limitación: desde `file://` no se puede instalar como app y el botón Copiar usa el plan B (funciona igual).

## Cómo instalarla en el teléfono y en la compu

Necesita estar publicada por **https**, con los archivos en la misma carpeta.

1. Entrá a https://app.netlify.com/drop
2. Arrastrá **la carpeta entera** (los cuatro archivos juntos).
3. Te da una URL `https://algo.netlify.app`. Abrila en el teléfono.
4. Android/Chrome: menú ⋮ → «Instalar app». iOS/Safari: Compartir → «Agregar a pantalla de inicio». Escritorio: ícono de instalar en la barra de direcciones.

Con eso queda como una app: ícono propio, abre sin conexión, sin barra del navegador.

## Sincronizar entre teléfono y compu

Sin esto cada dispositivo tiene sus propios datos.

1. Creá un proyecto gratis en https://supabase.com
2. Andá a **SQL Editor**, pegá el SQL que muestra la app en Ajustes y ejecutalo.
3. En **Project Settings → API** copiá la URL y la `anon` key.
4. En la app, Ajustes → Sincronización: pegá la URL, la key, y tocá **Generar identificador seguro**.
5. Repetí el paso 4 en el otro dispositivo con **el mismo** identificador.

Advertencia honesta: el identificador funciona como contraseña. Con la política del SQL, quien tenga la anon key y tu identificador puede leer y escribir esos datos. Para uso personal con un identificador largo alcanza; para compartir con terceros hay que pasar a Supabase Auth.

## Hacer un respaldo

Ajustes → Exportar .json. Hacelo una vez por semana. Importar reemplaza todo.

## Cómo probar que esta versión anda

- Abrí por `file://` y mirá Ajustes: debe decir que la instalación no está disponible desde archivo local. Eso es correcto, no un error.
- Publicá por https y recargá Ajustes: debe decir «Service worker activo».
- En Vender, tocá «Copiar: Primer contacto». Debe copiar o abrir un cuadro para copiar a mano.
- Escribí en los dos campos de una fase seguidos: el segundo click tiene que entrar sin perder lo escrito.
- Completá la acción del día: la tarjeta pasa a «Listo por hoy» y no vuelve a pedir lo mismo.

## Qué quedó para la v3

- Editar nombre y monto con formulario propio, no con `prompt`.
- Historial de cambios por contacto.
- Exportar el informe semanal en PDF.
- Supabase Auth para compartir con alguien más.

