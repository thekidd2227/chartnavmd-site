import { Fragment } from "react";
import home from "@/content/chartnav/home.en.json";

const { eyebrow, headline, subhead, phases } = home.platformLayers;

export function PlatformLayers({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="platform-layers"
      aria-labelledby="pl-headline"
    >
      <div className="cn-container">
        <header className="platform-layers__header">
          <p className="platform-layers__eyebrow">{eyebrow}</p>
          <h2 id="pl-headline" className="platform-layers__headline">
            {headline}
          </h2>
          <p className="platform-layers__subhead">{subhead}</p>
        </header>

        <div className="platform-layers__grid">
          {phases.map((phase, i) => (
            <Fragment key={phase.phase}>
              {i > 0 && (
                <div
                  className="platform-layers__arrow"
                  aria-hidden="true"
                >
                  &#8594;
                </div>
              )}
              <div
                role="region"
                aria-label={phase.label}
                className="platform-layers__column"
              >
                <p className="platform-layers__phase-number">{phase.phase}</p>
                <h3 className="platform-layers__phase-label">{phase.label}</h3>
                <p className="platform-layers__phase-descriptor">
                  {phase.descriptor}
                </p>
                <ul className="platform-layers__features">
                  {phase.features.map((f) => (
                    <li key={f.title} className="platform-layers__feature-card">
                      <strong className="platform-layers__feature-title">
                        {f.title}
                      </strong>
                      <span className="platform-layers__feature-sub">
                        {f.sub}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
