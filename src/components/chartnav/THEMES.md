# Chartnav — theme versions

Three Chartnav theme CSS files live in this folder. They share the same class
names; swap by changing the one import inside `ChartnavShell.tsx`.

| File | Rendered? | Direction |
|---|---|---|
| `chartnav.css` | **yes (default)** | **V3 — Light med-tech**: white/slate base, teal trust color, red pulse-mark accent. Pairs with the new ChartNav pulse logo. |
| `chartnav-theme-v2-dark-grey-red.css` | no (preserved) | **V2 — Dark steel + surgical red**: obsidian base, platinum-grey structural accents, red reserved for CTAs/focus/emphasis. |
| `chartnav-theme-v1-dark-gold.css` | no (preserved, exact original) | **V1 — Dark obsidian + gold**: the original premium-medical crest-style direction that shipped first. |

## How to swap

Edit `src/components/chartnav/ChartnavShell.tsx` and change the CSS import:

```tsx
// Default (V3 — light med-tech)
import "./chartnav.css";

// V2 — dark + grey + red hints
// import "./chartnav-theme-v2-dark-grey-red.css";

// V1 — dark + gold (original)
// import "./chartnav-theme-v1-dark-gold.css";
```

Only one should be imported at a time. Class names and structure are identical
across all three, so no component changes are needed.

## Brand assets

| Asset | Path | Use |
|---|---|---|
| Compact pulse mark | `/public/chartnav/brand/chartnav-mark.svg` | Navbar (current), small-surface use |
| Horizontal logo (light bg) | `/public/chartnav/brand/chartnav-logo-light.svg` | White/light surfaces |
| Horizontal logo (dark bg) | `/public/chartnav/brand/chartnav-logo-dark.svg` | Dark surfaces (e.g. if swapping back to V1/V2) |
| Favicon | `/public/chartnav/brand/chartnav-favicon.svg` | Browser tab icon |
| Social/OG lockup | `/public/chartnav/brand/chartnav-og.svg` | Source for the OG raster (needs 1200×630 JPEG export for prod) |

Legacy crest-style mark used by V1/V2 is still at
`/public/chartnav/logo-mark.svg` and `/public/chartnav/logo-lockup.svg`.
