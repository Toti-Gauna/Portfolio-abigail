import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';
import { BASE_PATH } from '@/lib/site';
import es from '@/messages/es.json';

export const metadata: Metadata = { title: es.meta.title, description: es.meta.description, robots: { index: false } };

// Static export has no middleware: pick the language on the client (saved choice, then the browser's).
const redirectScript = `(function(){var base=${JSON.stringify(BASE_PATH)},ok=${JSON.stringify(locales)},pick=null;
try{var s=localStorage.getItem('ac:locale');if(ok.indexOf(s)>-1)pick=s;}catch(e){}
if(!pick){var l=(navigator.languages&&navigator.languages[0]||navigator.language||'es').slice(0,2).toLowerCase();pick=ok.indexOf(l)>-1?l:'es';}
location.replace(base+'/'+pick+'/'+location.hash);})();`;

export default function RootRedirect() {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      </head>
      <body style={{ background: '#0d0c0e', color: '#efebe4', fontFamily: 'Georgia, serif', padding: 24 }}>
        <noscript>
          <p>
            <a href={`${BASE_PATH}/es/`} style={{ color: '#ff5aa8' }}>Español</a> · <a href={`${BASE_PATH}/en/`} style={{ color: '#ff5aa8' }}>English</a>
          </p>
        </noscript>
      </body>
    </html>
  );
}
