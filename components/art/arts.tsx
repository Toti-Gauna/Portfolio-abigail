// The six concept projects, drawn as vector artwork (800 × 1000, 4:5). Fictional brands only.
import { useId, type CSSProperties, type ReactNode } from 'react';

// gradients get a per-instance id: the same art can be on the page twice, and a url(#id) that points into a hidden copy paints nothing
const useUid = () => useId().replace(/[^a-zA-Z0-9]/g, '');

const D: CSSProperties = { fontFamily: 'var(--font-d)' };
const DI: CSSProperties = { fontFamily: 'var(--font-d)', fontStyle: 'italic' };
const S: CSSProperties = { fontFamily: 'var(--font-s)' };
const M: CSSProperties = { fontFamily: 'var(--font-m)' };

function Frame({ id, label, bg, children }: { id: string; label: string; bg: string; children: ReactNode }) {
  return (
    <svg className={`art art-${id}`} viewBox="0 0 800 1000" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="1000" fill={bg} />
      {children}
    </svg>
  );
}

// a Didone N: hairline stems, a heavy diagonal, bracketed hairline serifs — as if engraved
function NacarN({ color = '#151317' }: { color?: string }) {
  return (
    <g fill={color}>
      <rect x="320" y="270" width="7" height="230" />
      <rect x="474" y="262" width="7" height="246" />
      <polygon points="318,262 356,262 486,508 448,508" />
      <path d="M296 500 h56 v4 h-56z M296 262 h28 v4 h-28z M452 262 h52 v4 h-52z" />
    </g>
  );
}

export function NacarArt({ label }: { label: string }) {
  const u = useUid();
  return (
    <Frame id="nacar" label={label} bg="#EDE6DD">
      <defs>
        <linearGradient id={`${u}-nacar-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#efdcea" />
          <stop offset=".32" stopColor="#c9b8d6" />
          <stop offset=".55" stopColor="#b9d6d3" />
          <stop offset=".78" stopColor="#f1ddcf" />
          <stop offset="1" stopColor="#d6cbe6" />
        </linearGradient>
      </defs>
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M-40 ${760 + i * 30} C 200 ${700 + i * 30}, 600 ${820 + i * 30}, 840 ${760 + i * 30}`} stroke="#151317" strokeOpacity=".12" fill="none" />
      ))}
      <circle className="nacar-disc" cx="400" cy="380" r="200" fill={`url(#${u}-nacar-sheen)`} />
      <circle cx="400" cy="380" r="224" stroke="#151317" strokeWidth="1.5" fill="none" />
      <NacarN />
      <text x="400" y="700" textAnchor="middle" fill="#151317" fontSize="68" letterSpacing="26" style={D}>NÁCAR</text>
      <text x="400" y="746" textAnchor="middle" fill="#151317" fillOpacity=".7" fontSize="17" letterSpacing="7" style={M}>JOYERÍA DE AUTOR</text>
      <g transform="translate(548 828) rotate(-8)">
        <rect width="196" height="118" fill="#151317" />
        <g transform="translate(20 28) scale(0.27) translate(-300 -262)"><NacarN color="#EDE6DD" /></g>
        <text x="96" y="66" fill="#EDE6DD" fontSize="15" letterSpacing="5" style={D}>NÁCAR</text>
      </g>
    </Frame>
  );
}

export function UmbralArt({ label }: { label: string }) {
  const col = 680 / 12;
  return (
    <Frame id="umbral" label={label} bg="#D9D6CF">
      {Array.from({ length: 13 }, (_, i) => <path key={i} d={`M${60 + i * col} 40 V960`} stroke="#2B2B2E" strokeOpacity=".13" />)}
      <text x="56" y="198" fill="#2B2B2E" fontSize="186" fontWeight="800" letterSpacing="-8" textLength="688" lengthAdjust="spacingAndGlyphs" style={S}>UMBRAL</text>
      <text x="60" y="240" fill="#2B2B2E" fontSize="18" letterSpacing="3" style={M}>Nº 07 — OTOÑO</text>
      <text x="740" y="240" textAnchor="end" fill="#2B2B2E" fontSize="18" letterSpacing="3" style={M}>ARQUITECTURA · CIUDAD · LUZ</text>
      <rect x="60" y="272" width="680" height="590" fill="#2B2B2E" />
      <polygon points="60,272 300,272 300,760 60,862" fill="#36363a" />
      <polygon points="500,272 740,272 740,862 500,760" fill="#232326" />
      <rect x="300" y="272" width="200" height="488" fill="#2f2f33" />
      <rect className="umbral-door" x="350" y="460" width="100" height="300" fill="#ECE8E0" />
      <polygon points="350,760 450,760 600,862 200,862" fill="#ECE8E0" opacity=".88" />
      <rect x="60" y="890" width="132" height="8" fill="#E4572E" />
      <text x="60" y="944" fill="#2B2B2E" fontSize="32" style={S} fontWeight="600">La casa como umbral</text>
      <text x="740" y="944" textAnchor="end" fill="#2B2B2E" fontSize="18" style={M}>p. 34</text>
    </Frame>
  );
}

function wave(base: number, amp: number, phase: number, freq: number) {
  let d = '';
  for (let x = -20; x <= 820; x += 10) {
    const y = base + amp * Math.sin((x / 800) * Math.PI * 2 * freq + phase);
    d += `${x === -20 ? 'M' : 'L'}${x} ${y.toFixed(1)}`;
  }
  return d;
}

export function OlaLentaArt({ label }: { label: string }) {
  const u = useUid();
  return (
    <Frame id="olalenta" label={label} bg="#101626">
      <defs>
        <radialGradient id={`${u}-ola-glow`}><stop offset="0" stopColor="#F2C14E" stopOpacity=".35" /><stop offset="1" stopColor="#F2C14E" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="590" cy="300" r="190" fill={`url(#${u}-ola-glow)`} />
      <circle cx="590" cy="300" r="46" fill="#F2C14E" />
      <g className="ola-waves">
        {Array.from({ length: 24 }, (_, i) => (
          <path key={i} d={wave(440 + i * 21, 30 * (1 - i / 26) + 3, i * 0.32, 1.4)} stroke="#8FA3BF" strokeOpacity={0.25 + (i / 24) * 0.6} strokeWidth="1.6" fill="none" />
        ))}
      </g>
      <text x="60" y="120" fill="#DCE3EE" fontSize="17" letterSpacing="6" style={M}>FESTIVAL DE CINE LENTO</text>
      <text x="60" y="150" fill="#8FA3BF" fontSize="17" letterSpacing="6" style={M}>TRES NOCHES · AL AIRE LIBRE</text>
      <text x="52" y="300" fill="#DCE3EE" fontSize="150" letterSpacing="-4" style={DI}>Ola</text>
      <text x="52" y="420" fill="#DCE3EE" fontSize="150" letterSpacing="-4" style={DI}>Lenta</text>
      <text x="740" y="968" textAnchor="end" fill="#8FA3BF" fontSize="17" letterSpacing="4" style={M}>AFICHE 1 / 3</text>
    </Frame>
  );
}

function Packet({ x, y, r, color, name, kind, months }: { x: number; y: number; r: number; color: string; name: string; kind: 'tomato' | 'basil' | 'carrot'; months: number[] }) {
  const paper = '#F1EAD8';
  return (
    <g transform={`translate(${x} ${y}) rotate(${r} 115 165)`}>
      <rect width="230" height="330" rx="5" fill={color} />
      <path d={`M0 22 ${Array.from({ length: 23 }, (_, i) => `L${i * 10 + 5} ${i % 2 ? 22 : 14}`).join(' ')} L230 22 V0 H0Z`} fill={paper} fillOpacity=".25" />
      {kind === 'tomato' && (
        <g>
          <circle cx="115" cy="112" r="56" fill={paper} />
          <path d="M115 62 l10 18 l20 -6 l-14 15 l14 14 l-20 -5 l-10 18 l-10 -18 l-20 5 l14 -14 l-14 -15 l20 6z" fill={color} />
        </g>
      )}
      {kind === 'basil' && (
        <g fill={paper}>
          <ellipse cx="88" cy="110" rx="32" ry="56" transform="rotate(-28 88 110)" />
          <ellipse cx="146" cy="104" rx="32" ry="56" transform="rotate(26 146 104)" />
          <path d="M115 170 V120 M88 110 l-14 -40 M146 104 l14 -40" stroke={color} strokeWidth="3" />
        </g>
      )}
      {kind === 'carrot' && (
        <g>
          <path d="M85 92 L145 92 L115 182Z" fill={paper} />
          <path d="M115 92 q-26 -40 -10 -52 q14 22 10 52 q4 -34 26 -46 q4 26 -26 46" fill={paper} fillOpacity=".7" />
        </g>
      )}
      <rect x="16" y="196" width="198" height="118" fill={paper} />
      <text x="30" y="232" fill={color} fontSize="30" style={DI}>Almácigo</text>
      <text x="30" y="258" fill="#3b2a1e" fontSize="15" fontWeight="600" style={S}>{name}</text>
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={30 + i * 14.4} y="280" width="11" height="16" fill={months.includes(i) ? color : '#3b2a1e'} fillOpacity={months.includes(i) ? 1 : 0.15} />
      ))}
    </g>
  );
}

export function AlmacigoArt({ label }: { label: string }) {
  return (
    <Frame id="almacigo" label={label} bg="#F1EAD8">
      <circle cx="400" cy="470" r="330" fill="#7FA650" fillOpacity=".13" />
      <Packet x={70} y={300} r={-9} color="#D9472B" name="Tomate perita" kind="tomato" months={[7, 8, 9]} />
      <Packet x={500} y={330} r={8} color="#6B4F3A" name="Zanahoria" kind="carrot" months={[1, 2, 7, 8]} />
      <Packet x={285} y={250} r={1} color="#7FA650" name="Albahaca" kind="basil" months={[8, 9, 10]} />
      <text x="60" y="120" fill="#3b2a1e" fontSize="64" style={DI}>Almácigo</text>
      <text x="62" y="160" fill="#3b2a1e" fillOpacity=".75" fontSize="17" letterSpacing="5" style={M}>SEMILLAS PARA HUERTA</text>
      <text x="740" y="950" textAnchor="end" fill="#3b2a1e" fillOpacity=".75" fontSize="17" letterSpacing="4" style={M}>SERIE DE 6 SOBRES</text>
    </Frame>
  );
}

export function VertigoArt({ label }: { label: string }) {
  return (
    <Frame id="vertigo" label={label} bg="#0B0B0D">
      <g className="vertigo-spin" style={{ transformOrigin: '400px 470px' }}>
        {Array.from({ length: 20 }, (_, i) => {
          const s = 640 * Math.pow(0.86, i);
          return <rect key={i} x={400 - s / 2} y={470 - s / 2} width={s} height={s} stroke="#E8E2D6" strokeOpacity={0.15 + (i / 20) * 0.75} strokeWidth="1.3" fill="none" transform={`rotate(${i * 7} 400 470)`} />;
        })}
      </g>
      <rect x="170" y="428" width="460" height="84" fill="#0B0B0D" />
      <text x="400" y="492" textAnchor="middle" fill="#E8E2D6" fontSize="72" letterSpacing="10" style={D}>VÉRTIGO</text>
      <rect x="370" y="528" width="60" height="4" fill="#C1121F" />
      <text x="60" y="950" fill="#E8E2D6" fillOpacity=".7" fontSize="17" letterSpacing="3" style={M}>00:00:24:12</text>
      <text x="740" y="950" textAnchor="end" fill="#E8E2D6" fillOpacity=".7" fontSize="17" letterSpacing="3" style={M}>TÍTULO PRINCIPAL</text>
      <circle cx="60" cy="70" r="7" fill="#C1121F" />
      <text x="78" y="76" fill="#E8E2D6" fillOpacity=".7" fontSize="17" letterSpacing="3" style={M}>REC</text>
    </Frame>
  );
}

export function LumbreArt({ label }: { label: string }) {
  const u = useUid();
  return (
    <Frame id="lumbre" label={label} bg="#1A1412">
      <defs>
        <radialGradient id={`${u}-lumbre-glow`} cx=".5" cy=".43" r=".5"><stop offset="0" stopColor="#F29E38" stopOpacity=".42" /><stop offset=".55" stopColor="#F29E38" stopOpacity=".08" /><stop offset="1" stopColor="#F29E38" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${u}-lumbre-flame`} cx=".5" cy=".7" r=".6"><stop offset="0" stopColor="#FFF4DA" /><stop offset=".45" stopColor="#F9C15F" /><stop offset="1" stopColor="#E0601C" /></radialGradient>
        <linearGradient id={`${u}-lumbre-wax`} x1="0" x2="1"><stop offset="0" stopColor="#c7ad8f" /><stop offset=".45" stopColor="#EADBC8" /><stop offset="1" stopColor="#bba183" /></linearGradient>
      </defs>
      <rect width="800" height="1000" fill={`url(#${u}-lumbre-glow)`} />
      <rect x="290" y="560" width="220" height="330" fill={`url(#${u}-lumbre-wax)`} />
      <ellipse cx="400" cy="560" rx="110" ry="20" fill="#f3e6d4" />
      <ellipse cx="400" cy="562" rx="78" ry="12" fill="#e2cdb1" />
      <path d="M400 548 V512" stroke="#1A1412" strokeWidth="4" />
      <g className="lumbre-flame" style={{ transformOrigin: '400px 516px' }}>
        <ellipse cx="400" cy="460" rx="46" ry="90" fill="#F29E38" fillOpacity=".18" />
        <path d="M400 372 C432 432 446 470 400 516 C354 470 368 432 400 372Z" fill={`url(#${u}-lumbre-flame)`} />
      </g>
      <text x="400" y="190" textAnchor="middle" fill="#EADBC8" fontSize="118" style={DI}>lumbre</text>
      <text x="400" y="238" textAnchor="middle" fill="#EADBC8" fillOpacity=".65" fontSize="17" letterSpacing="6" style={M}>VELAS AROMÁTICAS</text>
      <text x="400" y="950" textAnchor="middle" fill="#EADBC8" fillOpacity=".55" fontSize="16" letterSpacing="5" style={M}>CAMPAÑA · IMAGEN PRINCIPAL</text>
    </Frame>
  );
}

export const ARTS = { nacar: NacarArt, umbral: UmbralArt, olalenta: OlaLentaArt, almacigo: AlmacigoArt, vertigo: VertigoArt, lumbre: LumbreArt } as const;
export type ArtId = keyof typeof ARTS;

// per-project data that doesn't change with the language
export const PROJECT_META: Record<ArtId, { bg: string; fg: string; tools: string[]; type: string[] }> = {
  nacar: { bg: '#EDE6DD', fg: '#151317', tools: ['Illustrator', 'Photoshop', 'InDesign'], type: ['Bodoni Moda', 'DM Mono'] },
  umbral: { bg: '#D9D6CF', fg: '#2B2B2E', tools: ['InDesign', 'Photoshop', 'Lightroom', 'Acrobat Pro'], type: ['Hanken Grotesk', 'DM Mono'] },
  olalenta: { bg: '#101626', fg: '#DCE3EE', tools: ['Illustrator', 'After Effects', 'Photoshop'], type: ['Bodoni Moda Italic', 'DM Mono'] },
  almacigo: { bg: '#F1EAD8', fg: '#3b2a1e', tools: ['Illustrator', 'Photoshop', 'Substance 3D'], type: ['Bodoni Moda Italic', 'Hanken Grotesk', 'DM Mono'] },
  vertigo: { bg: '#0B0B0D', fg: '#E8E2D6', tools: ['After Effects', 'Premiere Pro', 'Illustrator'], type: ['Bodoni Moda', 'DM Mono'] },
  lumbre: { bg: '#1A1412', fg: '#EADBC8', tools: ['Photoshop', 'Lightroom', 'Firefly'], type: ['Bodoni Moda Italic', 'DM Mono'] },
};
