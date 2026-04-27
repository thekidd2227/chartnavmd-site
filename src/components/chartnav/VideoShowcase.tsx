// VideoShowcase — homepage proof slideshow.
//
// Reads /chartnav/videos/manifest.json at runtime so the on-page
// captions stay in lock-step with what the video pipeline shipped.
// Cycles 5s per clip with a crossfade + subtle zoom; preloads the
// next clip; muted autoplay so it works on every modern browser
// without user gesture; mobile-stacks copy above the frame.
//
// The video frame masks the top ~6% with a gradient cover so the
// dev-only IdentityBadge that appears at the top of some captures
// never reads as production UI.
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "./primitives";

interface ShowcaseEntry {
  file: string;
  title: string;
  description: string;
  tag: string;
  /** Short overlay caption rendered on top of the video frame, e.g.
   *  "Patient intake → instantly structured". Optional — clips
   *  without an `overlay` simply don't render one. */
  overlay?: string;
  priority: number;
  seconds?: number;
  featured?: boolean;
}

const MANIFEST_URL = "/chartnav/videos/manifest.json";
const VIDEO_BASE = "/chartnav/videos/";
const DEFAULT_SLIDE_MS = 8000;
const slideMs = (e: ShowcaseEntry) =>
  Math.max(4000, Math.round((e.seconds || DEFAULT_SLIDE_MS / 1000) * 1000));

export function VideoShowcase() {
  const [entries, setEntries] = useState<ShowcaseEntry[] | null>(null);
  const [active, setActive] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const timerRef = useRef<number | null>(null);

  // Load manifest once.
  useEffect(() => {
    let cancelled = false;
    fetch(MANIFEST_URL, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`manifest ${r.status}`);
        return r.json() as Promise<ShowcaseEntry[]>;
      })
      .then((data) => {
        if (cancelled) return;
        // Sort by priority so the homepage order is deterministic.
        const sorted = [...data].sort((a, b) => a.priority - b.priority);
        setEntries(sorted);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setLoadError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Drive the slide cadence on a per-clip timer so each entry can
  // dwell for its own `seconds` value (lead features get a longer
  // window so the demo is actually readable). Pause when the
  // document is hidden so the loop doesn't drain battery in a
  // backgrounded tab.
  useEffect(() => {
    if (!entries || entries.length === 0) return;
    const armNext = () => {
      const dwell = slideMs(entries[active]);
      timerRef.current = window.setTimeout(() => {
        setActive((i) => (i + 1) % entries.length);
      }, dwell);
    };
    armNext();
    const onVis = () => {
      if (document.visibilityState === "hidden" && timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      } else if (
        document.visibilityState === "visible" && timerRef.current === null
      ) {
        armNext();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [entries, active]);

  // Autoplay the active clip, restart from 0; pause neighbors.
  useEffect(() => {
    if (!entries) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        try {
          v.currentTime = 0;
          const p = v.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch {
          // play() can throw on some browsers if not interactive yet.
        }
      } else {
        try { v.pause(); } catch {}
      }
    });
  }, [active, entries]);

  if (loadError) {
    // Silent fallback: render nothing rather than a broken frame.
    return null;
  }
  if (!entries) {
    return (
      <section
        id="chartnav-video-showcase"
        className="cn-section"
        aria-busy="true"
      >
        <div className="cn-container">
          <div className="cn-vshow__skeleton" aria-hidden="true" />
        </div>
      </section>
    );
  }

  const current = entries[active];
  const nextIdx = (active + 1) % entries.length;

  return (
    <section
      id="chartnav-video-showcase"
      className="cn-section cn-vshow"
      aria-label="ChartNav product walkthroughs"
    >
      <style>{CSS}</style>
      <div className="cn-container">
        <div className="cn-vshow__grid">
          <div className="cn-vshow__copy" data-reveal>
            <div className="cn-vshow__step" aria-label={`Clinic journey, step ${active + 1} of ${entries.length}`}>
              <span className="cn-vshow__step-label">Clinic journey</span>
              <span className="cn-vshow__step-sep" aria-hidden="true">·</span>
              <span className="cn-vshow__step-num">Step {active + 1} of {entries.length}</span>
            </div>
            <div className="cn-vshow__eyebrow-row">
              <Eyebrow>{current.tag}</Eyebrow>
              {current.featured && (
                <span className="cn-vshow__featured" aria-label="Featured capability">
                  Lead capability
                </span>
              )}
            </div>
            <h2 className="cn-vshow__title">{current.title}</h2>
            <p className="cn-vshow__desc">{current.description}</p>
            <div className="cn-vshow__dots" role="tablist" aria-label="Walkthroughs">
              {entries.map((e, i) => (
                <button
                  key={e.file}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show ${e.title}`}
                  className={
                    "cn-vshow__dot" +
                    (i === active ? " is-active" : "") +
                    (e.featured ? " is-featured" : "")
                  }
                  style={i === active ? { ["--dwell" as string]: `${slideMs(e)}ms` } : undefined}
                  onClick={() => setActive(i)}
                >
                  <span className="cn-vshow__dot-fill" />
                </button>
              ))}
            </div>
          </div>
          <div className="cn-vshow__frame" data-reveal>
            <div className="cn-vshow__viewport">
              {entries.map((e, i) => {
                const shouldPreload = i === active || i === nextIdx;
                return (
                  <video
                    key={e.file}
                    ref={(el) => { videoRefs.current[i] = el; }}
                    className={
                      "cn-vshow__video" + (i === active ? " is-active" : "")
                    }
                    src={VIDEO_BASE + e.file}
                    muted
                    playsInline
                    loop
                    autoPlay={i === active}
                    preload={shouldPreload ? "auto" : "none"}
                    aria-label={e.title}
                  />
                );
              })}
              {/* Top-strip mask: hides any dev IdentityBadge that may
                  show in the top ~6% of the capture. */}
              <span className="cn-vshow__mask cn-vshow__mask--top" aria-hidden="true" />
              {/* Subtle bottom gradient for chrome. */}
              <span className="cn-vshow__mask cn-vshow__mask--bottom" aria-hidden="true" />
              <span
                className="cn-vshow__tag"
                aria-hidden="true"
              >{current.tag}</span>
              {/* Step overlay caption — keyed on the active index so the
                  fade re-runs every transition. Stays subtle (small,
                  bottom-left, semi-transparent) so it never blocks the
                  underlying UI. */}
              {current.overlay && (
                <span
                  key={`overlay-${active}`}
                  className="cn-vshow__overlay"
                  aria-hidden="true"
                >
                  {current.overlay}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.cn-vshow { position: relative; }

.cn-vshow__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
  gap: 40px;
  align-items: center;
}
@media (max-width: 900px) {
  .cn-vshow__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.cn-vshow__copy { max-width: 460px; }
.cn-vshow__step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted, #94A3B8);
  background: rgba(11, 110, 121, 0.06);
  border: 1px solid rgba(11, 110, 121, 0.12);
  border-radius: 999px;
  padding: 5px 12px;
  margin-bottom: 10px;
}
.cn-vshow__step-label { color: var(--color-primary, #0B6E79); }
.cn-vshow__step-sep   { color: var(--color-text-muted, #94A3B8); }
.cn-vshow__step-num   { color: var(--color-text, #0F172A); }
.cn-vshow__eyebrow-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.cn-vshow__featured {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #065f46;
  background: linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%);
  border: 1px solid #34d399;
  border-radius: 999px;
  padding: 4px 10px;
}
.cn-vshow__title {
  font-size: 28px;
  line-height: 1.18;
  margin: 8px 0 12px 0;
  color: var(--color-text);
  font-weight: 700;
}
.cn-vshow__desc {
  font-size: 16px;
  line-height: 1.55;
  color: var(--color-text-secondary);
  margin: 0 0 18px 0;
}

.cn-vshow__dots {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding-top: 10px;
}
/* Connecting line beneath the dots so the rail reads as a single
   patient-journey progression, not loose unrelated pills. */
.cn-vshow__dots::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-border, #DCE5EA) 12%,
    var(--color-border, #DCE5EA) 88%,
    transparent 100%
  );
  pointer-events: none;
}
.cn-vshow__dot {
  --h: 4px;
  --dwell: 8000ms;
  position: relative;
  width: 36px;
  height: var(--h);
  border-radius: 999px;
  background: var(--color-border, #DCE5EA);
  border: 0;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  transition: background 200ms var(--cn-ease);
}
.cn-vshow__dot:hover { background: var(--color-border-strong, #C4D2D9); }
.cn-vshow__dot.is-active {
  background: var(--color-primary-tint, #D6F0F3);
}
.cn-vshow__dot.is-featured {
  width: 52px; /* slightly wider for the lead capability */
}
.cn-vshow__dot-fill {
  position: absolute;
  inset: 0;
  width: 0;
  background: var(--color-primary, #0B6E79);
  transition: width 0ms linear;
}
.cn-vshow__dot.is-active .cn-vshow__dot-fill {
  width: 100%;
  transition: width var(--dwell) linear;
}
.cn-vshow__dot.is-featured.is-active .cn-vshow__dot-fill {
  background: linear-gradient(90deg, var(--color-primary, #0B6E79) 0%, #14B8A6 100%);
}

/* Frame — premium, dark clinical surface. */
.cn-vshow__frame {
  position: relative;
  border-radius: 18px;
  padding: 10px;
  background:
    radial-gradient(120% 80% at 50% 0%, rgba(20, 184, 166, 0.18) 0%, transparent 60%),
    linear-gradient(180deg, #0B1220 0%, #0E1B26 100%);
  box-shadow:
    0 18px 48px rgba(7, 36, 47, 0.18),
    0 2px 0 rgba(255, 255, 255, 0.04) inset;
  border: 1px solid rgba(20, 184, 166, 0.22);
}

.cn-vshow__viewport {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #0A0F16;
  /* 1440 x 900 source ⇒ 1.6 ratio; reserve to avoid layout shift. */
  aspect-ratio: 1440 / 900;
}

.cn-vshow__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  opacity: 0;
  transform: scale(1.02);
  transition:
    opacity 700ms var(--cn-ease),
    transform 6000ms ease-out;
  will-change: opacity, transform;
}
.cn-vshow__video.is-active {
  opacity: 1;
  transform: scale(1.0);
}

/* Top mask — kills any dev IdentityBadge bleed in the top 5–7% of
   the capture. Gradient feathers into the video for a clean edge. */
.cn-vshow__mask--top {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 7%;
  background: linear-gradient(180deg, rgba(10, 15, 22, 0.96) 60%, rgba(10, 15, 22, 0) 100%);
  pointer-events: none;
}
.cn-vshow__mask--bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 12%;
  background: linear-gradient(0deg, rgba(10, 15, 22, 0.55) 0%, rgba(10, 15, 22, 0) 100%);
  pointer-events: none;
}

.cn-vshow__tag {
  position: absolute;
  top: 14px;
  left: 14px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(214, 240, 243, 0.95);
  background: rgba(11, 110, 121, 0.45);
  padding: 5px 10px;
  border-radius: 999px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(20, 184, 166, 0.35);
  z-index: 4;
}

/* Step overlay — short caption pinned to the bottom-left of the
   video frame. Subtle by design: pill chrome, semi-transparent
   surface, no hard shadow. Fades + slides in on each step change
   (re-keyed in the JSX). */
.cn-vshow__overlay {
  position: absolute;
  left: 14px;
  bottom: 14px;
  max-width: calc(100% - 100px);
  z-index: 5;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: rgba(248, 251, 252, 0.96);
  background: rgba(11, 18, 32, 0.55);
  border: 1px solid rgba(214, 240, 243, 0.18);
  padding: 7px 12px;
  border-radius: 999px;
  backdrop-filter: blur(8px) saturate(115%);
  -webkit-backdrop-filter: blur(8px) saturate(115%);
  pointer-events: none;
  animation: cn-vshow-overlay-in 700ms var(--cn-ease) both;
}
@keyframes cn-vshow-overlay-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (max-width: 640px) {
  .cn-vshow__overlay {
    font-size: 12px;
    padding: 6px 10px;
    left: 10px;
    bottom: 10px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .cn-vshow__overlay { animation: none; }
}

.cn-vshow__skeleton {
  height: 320px;
  border-radius: 18px;
  background: linear-gradient(90deg, #EEF8FA 0%, #F8FBFC 50%, #EEF8FA 100%);
  background-size: 200% 100%;
  animation: cn-vshow-shimmer 1.6s linear infinite;
  border: 1px solid var(--color-border, #DCE5EA);
}
@keyframes cn-vshow-shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .cn-vshow__video,
  .cn-vshow__dot-fill { transition: none !important; }
}
`;
