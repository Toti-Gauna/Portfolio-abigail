'use client';
import { useId, type CSSProperties } from 'react';
import './demos.css';

// One small animated drawing per tool, showing what the tool does (no brand logos).
// Animations run only while `run` is true (on screen and selected); otherwise the drawing rests on its final frame.
export type DemoId = 'collage' | 'ps' | 'ai' | 'id' | 'ae' | 'pr' | 'lr' | 'ac' | 'ff' | 's3' | 'cc';

type Copy = { layer: string; prompt: string; checks: string[] };

const d = (i: number): CSSProperties => ({ ['--k' as string]: i });

export function ToolDemo({ id, run, copy, label }: { id: DemoId; run: boolean; copy: Copy; label?: string }) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, ''); // gradient ids per instance: a hidden copy would paint nothing
  return (
    <svg className={`demo demo-${id}`} data-run={run ? '1' : undefined} viewBox="0 0 520 360" role="img" aria-label={label} fill="none">
      {DEMOS[id](copy, u)}
    </svg>
  );
}

const ink = 'currentColor';

const DEMOS: Record<DemoId, (c: Copy, u: string) => React.ReactNode> = {
  // kitchen-table collage: cut-outs land one on top of another
  collage: () => (
    <g>
      <g className="cl" style={d(0)}><rect x="96" y="70" width="190" height="230" fill="#d9cdb8" transform="rotate(-7 191 185)" /><path d="M110 250 L180 170 L230 220 L270 180" stroke="#8a7a66" strokeWidth="3" transform="rotate(-7 191 185)" /></g>
      <g className="cl" style={d(1)}><rect x="236" y="56" width="170" height="150" fill="#00a0df" transform="rotate(6 321 131)" /><circle cx="330" cy="120" r="34" fill="#ffe100" transform="rotate(6 321 131)" /></g>
      <g className="cl" style={d(2)}><rect x="210" y="170" width="200" height="120" fill="#e4007c" transform="rotate(-3 310 230)" /><text x="226" y="248" fill="#fff" fontSize="40" style={{ fontFamily: 'var(--font-d)', fontStyle: 'italic' }} transform="rotate(-3 310 230)">recorte</text></g>
      <g className="cl" style={d(3)}><rect x="140" y="214" width="96" height="96" fill="#efebe4" transform="rotate(10 188 262)" /><path d="M152 290 h70 M152 270 h56 M152 250 h70" stroke="#0d0c0e" strokeWidth="3" transform="rotate(10 188 262)" /></g>
      <path className="cl-scissor" d="M60 320 l40 -26 M60 296 l40 26" stroke={ink} strokeWidth="2" />
    </g>
  ),
  // layers: a composite that pulls apart into its layers and back
  ps: (c) => (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} className="ly" style={d(i)}>
          <rect x="140" y="80" width="230" height="160" rx="4" fill={['#1f2a44', 'rgb(0 160 223 / .32)', 'rgb(239 235 228 / .04)'][i]} stroke={ink} strokeOpacity=".4" />
          {i === 0 && <path d="M140 210 L212 145 L260 188 L302 152 L370 210 V240 H140Z" fill="#0d0c0e" />}
          {i === 1 && <path d="M140 150 q57 -30 115 0 t115 0" stroke="#efebe4" strokeOpacity=".5" strokeWidth="2" />}
          {i === 2 && <circle cx="312" cy="126" r="24" fill="#ffe100" />}
        </g>
      ))}
      {[2, 1, 0].map((i, r) => (
        <g key={i} transform={`translate(440 ${118 + r * 34})`}>
          <rect width="16" height="16" fill={['#1f2a44', '#00a0df', '#ffe100'][i]} stroke={ink} strokeOpacity=".4" />
          <text x="26" y="13" fill={ink} fontSize="14" style={{ fontFamily: 'var(--font-m)' }}>{c.layer} {i + 1}</text>
        </g>
      ))}
    </g>
  ),
  // pen tool: a Bézier drawn anchor by anchor, with handles
  ai: () => (
    <g>
      <path className="pen" d="M70 260 C 130 90, 230 90, 260 190 S 400 300, 450 110" stroke="#e4007c" strokeWidth="4" pathLength={1} />
      <g className="pen-h" stroke={ink} strokeWidth="1.2">
        <path d="M70 260 L130 90" /><path d="M230 90 L290 290" /><path d="M400 300 L450 110" />
        {[[130, 90], [290, 290], [400, 300]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill="currentColor" />)}
      </g>
      {[[70, 260], [260, 190], [450, 110]].map(([x, y], i) => (
        <rect key={i} className="pen-a" style={d(i)} x={x - 7} y={y - 7} width="14" height="14" fill="#0d0c0e" stroke={ink} strokeWidth="2" />
      ))}
    </g>
  ),
  // grid: a page, its columns, and the text that sets itself on them
  id: () => (
    <g>
      <rect x="120" y="30" width="280" height="300" fill="#efebe4" stroke={ink} strokeOpacity=".3" />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} className="gd-col" style={d(i)} x={140 + i * 41.6} y="50" width="34" height="260" fill="#e4007c" opacity=".12" />)}
      <rect className="gd-txt" style={d(0)} x="140" y="60" width="200" height="22" fill="#0d0c0e" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} className="gd-txt" style={d(i + 1)} x="140" y={110 + i * 16} width={i % 3 === 2 ? 76 : 117} height="6" fill="#0d0c0e" opacity=".75" />)}
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} className="gd-txt" style={d(i + 3)} x="265" y={110 + i * 16} width="117" height="6" fill="#0d0c0e" opacity=".75" />)}
      <rect className="gd-txt" style={d(8)} x="265" y="200" width="117" height="96" fill="#00a0df" />
    </g>
  ),
  // keyframes: a value curve with its easing, and a dot riding it
  ae: () => (
    <g>
      <path d="M60 300 H470 M60 300 V40" stroke={ink} strokeOpacity=".35" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d={`M${60 + i * 58} 300 v8`} stroke={ink} strokeOpacity=".35" />)}
      <path className="kf-curve" d="M80 270 C 250 270, 260 70, 440 70" stroke="#e4007c" strokeWidth="3.5" pathLength={1} />
      <path d="M80 270 H180 M440 70 H340" stroke={ink} strokeWidth="1.2" strokeDasharray="4 4" />
      <rect x="73" y="263" width="14" height="14" transform="rotate(45 80 270)" fill="#ffe100" />
      <rect x="433" y="63" width="14" height="14" transform="rotate(45 440 70)" fill="#ffe100" />
      <circle className="kf-dot" cx="80" cy="330" r="9" fill="#00a0df" />
    </g>
  ),
  // razor: clips on a timeline, a playhead, a cut
  pr: () => (
    <g>
      {[0, 1, 2].map((r) => <rect key={r} x="40" y={90 + r * 64} width="440" height="48" fill={ink} opacity=".05" />)}
      <rect x="60" y="94" width="150" height="40" rx="3" fill="#00a0df" />
      <g className="rz-a"><rect x="214" y="94" width="120" height="40" rx="3" fill="#e4007c" /></g>
      <g className="rz-b"><rect x="334" y="94" width="120" height="40" rx="3" fill="#e4007c" /></g>
      <rect x="110" y="158" width="260" height="40" rx="3" fill="#ffe100" opacity=".9" />
      <rect x="60" y="222" width="340" height="40" rx="3" fill="#7a7480" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => <path key={i} d={`M${40 + i * 44} 64 v10`} stroke={ink} strokeOpacity=".4" />)}
      <g className="rz-head"><path d="M60 60 V290" stroke="#ff5aa8" strokeWidth="2" /><path d="M52 52 h16 l-8 10z" fill="#ff5aa8" /></g>
      <path className="rz-cut" d="M334 84 V146" stroke={ink} strokeWidth="2.5" />
    </g>
  ),
  // crop: a photo, the crop frame closing in on thirds, and its histogram
  lr: (_c, u) => (
    <g>
      <defs>
        <linearGradient id={`${u}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f29e38" /><stop offset=".6" stopColor="#e4007c" /><stop offset="1" stopColor="#2b1a3a" /></linearGradient>
      </defs>
      <rect x="40" y="40" width="330" height="240" fill={`url(#${u}-sky)`} />
      <circle cx="250" cy="170" r="30" fill="#ffe100" />
      <path d="M40 240 L130 190 L210 230 L300 180 L370 220 V280 H40Z" fill="#16141a" />
      <g className="lr-crop">
        <rect x="70" y="60" width="270" height="200" stroke="#fff" strokeWidth="2" />
        <path d="M160 60 V260 M250 60 V260 M70 126.6 H340 M70 193.3 H340" stroke="#fff" strokeOpacity=".6" />
      </g>
      {[30, 52, 70, 64, 48, 60, 86, 100, 74, 40, 28, 36].map((h, i) => <rect key={i} x={392 + i * 9} y={280 - h} width="7" height={h} fill={ink} opacity=".5" className="lr-h" style={d(i)} />)}
    </g>
  ),
  // preflight: the checks before the file goes to the printer
  ac: (c) => (
    <g>
      <rect x="70" y="30" width="380" height="300" fill={ink} opacity=".05" />
      {c.checks.map((txt, i) => (
        <g key={txt} className="pf" style={d(i)}>
          <circle cx="110" cy={80 + i * 52} r="15" fill="#e4007c" />
          <path d={`M102 ${80 + i * 52} l6 6 l11 -12`} stroke="#fff" strokeWidth="3" />
          <text x="142" y={87 + i * 52} fill={ink} fontSize="20" style={{ fontFamily: 'var(--font-m)' }}>{txt}</text>
        </g>
      ))}
    </g>
  ),
  // generative: a prompt, four variations
  ff: (c) => (
    <g>
      <rect x="60" y="28" width="400" height="44" rx="22" stroke={ink} strokeOpacity=".4" />
      <text x="84" y="57" fill={ink} fontSize="17" style={{ fontFamily: 'var(--font-m)' }} className="ff-p">{c.prompt}</text>
      {[0, 1, 2, 3].map((i) => {
        const x = 60 + (i % 2) * 205, y = 92 + Math.floor(i / 2) * 132;
        const fills = [['#101626', '#f2c14e'], ['#e4007c', '#ffe100'], ['#00a0df', '#efebe4'], ['#2b1a3a', '#f29e38']][i];
        return (
          <g key={i} className="ff-v" style={d(i)}>
            <rect x={x} y={y} width="195" height="122" fill={fills[0]} />
            <circle cx={x + 140} cy={y + 46} r="20" fill={fills[1]} />
            <path d={`M${x} ${y + 92} q 48 -26 98 0 t 97 0 V${y + 122} H${x}Z`} fill={fills[1]} opacity=".55" />
          </g>
        );
      })}
    </g>
  ),
  // materials: one sphere, a light that walks around it
  s3: (_c, u) => (
    <g>
      <defs>
        <radialGradient id={`${u}-ball`} cx=".35" cy=".3" r=".75"><stop offset="0" stopColor="#ffd3ea" /><stop offset=".35" stopColor="#e4007c" /><stop offset="1" stopColor="#3a0020" /></radialGradient>
      </defs>
      <ellipse cx="260" cy="310" rx="120" ry="16" fill={ink} opacity=".18" />
      <circle cx="260" cy="180" r="120" fill={`url(#${u}-ball)`} />
      <ellipse className="s3-spec" cx="214" cy="128" rx="30" ry="18" fill="#fff" opacity=".75" />
      <path d="M140 180 a120 40 0 0 0 240 0" stroke="#fff" strokeOpacity=".25" />
      <path d="M260 60 a40 120 0 0 0 0 240" stroke="#fff" strokeOpacity=".25" />
    </g>
  ),
  // everything together: the three plates meet on a registration mark
  cc: () => (
    <g>
      <g style={{ mixBlendMode: 'multiply' }}>
        <circle className="cc-p cc-c" cx="260" cy="180" r="96" fill="#00a0df" />
        <circle className="cc-p cc-m" cx="260" cy="180" r="96" fill="#e4007c" />
        <circle className="cc-p cc-y" cx="260" cy="180" r="96" fill="#ffe100" />
      </g>
      <g stroke={ink} strokeWidth="1.5">
        <circle cx="260" cy="180" r="130" />
        <path d="M260 20 V340 M100 180 H420" />
      </g>
    </g>
  ),
};
