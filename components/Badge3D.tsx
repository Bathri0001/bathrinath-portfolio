const LAYERS = 12;

/** Extruded 3D label (INTERN / MCA / BSC / HSC / SSLC) that swings in CSS 3D. */
export default function Badge3D({ text, small = false }: { text: string; small?: boolean }) {
  return (
    <div className="badge3d" style={{ perspective: "900px" }} role="img" aria-label={text}>
      <div className={`badge3d-inner ${small ? "text-3xl" : "text-6xl lg:text-7xl"} font-black uppercase tracking-[0.08em]`} style={{ transformStyle: "preserve-3d" }}>
        {Array.from({ length: LAYERS }).map((_, i) => {
          const front = i === LAYERS - 1;
          return (
            <span key={i} aria-hidden="true" className={front ? "relative block" : "absolute left-0 top-0 block"}
              style={{ transform: `translateZ(${(i - LAYERS + 1) * 2.5}px)`, color: front ? undefined : `color-mix(in oklab, var(--accent) ${30 + i * 5}%, black)` }}>
              {front ? <span className="gradient-text">{text}</span> : text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
