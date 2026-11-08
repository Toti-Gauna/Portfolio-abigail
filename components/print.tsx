// Print marks shared by every section: registration target, crop marks, CMYK colour bar.

export function RegMark({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      <path d="M12 0v24M0 12h24" />
    </svg>
  );
}

export function CropMarks() {
  return (
    <span className="crop" aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}

const BAR = ['#00a0df', '#e4007c', '#ffe100', '#0d0c0e', 'rgb(0 160 223 / .5)', 'rgb(228 0 124 / .5)', 'rgb(255 225 0 / .5)', 'rgb(13 12 14 / .5)', 'rgb(13 12 14 / .25)', 'rgb(13 12 14 / .1)'];

const BAR_DARK = ['#00a0df', '#e4007c', '#ffe100', '#efebe4', 'rgb(0 160 223 / .5)', 'rgb(228 0 124 / .5)', 'rgb(255 225 0 / .5)', 'rgb(239 235 228 / .5)', 'rgb(239 235 228 / .25)', 'rgb(239 235 228 / .1)'];

export function ColorBar({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <span className={`colorbar ${className ?? ''}`} aria-hidden="true">
      {(dark ? BAR_DARK : BAR).map((c, i) => <span key={i} style={{ background: c }} />)}
    </span>
  );
}

// "02 — Historia" with the registration target
export function SectionLabel({ n, text }: { n: string; text: string }) {
  return (
    <p className="label">
      <RegMark />
      <span className="n">{n}</span>
      <span>{text}</span>
    </p>
  );
}

// Big titles that rise line by line (split on \n)
export function Lines({ text, as: Tag = 'h2', className }: { text: string; as?: 'h1' | 'h2' | 'p'; className?: string }) {
  return (
    <Tag className={`lines ${className ?? ''}`} data-lines>
      {text.split('\n').map((l, i) => (
        <span className="ln" key={i} style={{ ['--i' as string]: i }}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
