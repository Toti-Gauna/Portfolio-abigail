import { BASE_PATH } from '@/lib/site';

export default function NotFound() {
  return (
    <html lang="es">
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#eeebe5', color: '#0d0c0e', fontFamily: 'Georgia, serif' }}>
        <main style={{ textAlign: 'center', padding: 24 }}>
          <p style={{ fontSize: 96, margin: 0, fontStyle: 'italic' }}>404</p>
          <p style={{ fontSize: 20 }}>Esta página no salió de imprenta.</p>
          <a href={`${BASE_PATH}/`} style={{ color: '#b0005f' }}>Volver al inicio</a>
        </main>
      </body>
    </html>
  );
}
