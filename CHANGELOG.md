# Changelog

## 1.3.0 (2026-11-18)

Phones now get the scroll sequence too.

### Changed
- The pinned timeline runs on every screen size. Only people with "reduce motion" turned on get the stacked page.
- Phone layouts (980px and narrower) are sized to fit one screen:
  - Project intros show the headline, description, stack, buttons and name tag, without the tilted screen. The same screens appear in the viewfinder straight after.
  - Viewfinder frames are 84% of the screen width, with a shorter ruler.
  - Skills is a 2×2 grid. Log, Archive and the B3spoken card are tighter.
- The timeline uses a measured screen height (`--stage-h`) and ignores height-only resizes, so a phone's address bar sliding in and out doesn't make the page jump. It re-measures when the width changes, for example on rotation.
- Lenis smooth scrolling runs only with a mouse or trackpad on screens 981px and wider. Touch keeps native momentum scrolling.

### Unchanged
- Desktop layouts and timings.


## 1.2.0 (2026-11-18)

The whole page now runs as one pinned stage, like anantagame.com, and the transitions start on the first scroll.

### Changed
- **One timeline for the page.** `.flow` is tall and `.stage` sticks to the viewport. Every section is a layer on the stage that fades and lifts in and out over its own scroll range. Total length is about 40 screens.
- **Hero:** pushes in and dissolves from the first scroll. A small "Scroll" cue bobs until you start.
- **Projects title card:** rises in as the hero leaves. The picker buttons jump straight to a project.
- **Every project** now runs intro, fade to dark, viewfinder frames, then fade to black into the next one. B3spoken keeps its closing card.
- **Skills:** the four tiles slide in one after another. **Log** entries and **Archive** items come in one at a time.
- **Contact** is the last frame and stays up at the end.
- Nav links, the picker and `#links` on page load jump to the right point in the timeline.
- The 1.1.0 B3spoken-only sequence code is replaced by the page-wide engine in `main.js`.

### Added
- Viewfinder frames for every project in `data.js` (`sequence.frames`).
- Real screenshots: Vuln Scanner (menu, Nmap discovery, OpenVAS report, attack detector) and Android Forensics (adb acquisition, SHA-256 hashes, encrypted Session database, ALEAPP).
- Mock screens: `report`, `term`, `scores`, `locate`, `pricelist`, `pin`, `gen`, `dexhero` and `stats`. The numbers in them are sample data.
- Lenis 1.3.27 smooth scrolling (MIT), self-hosted in `vendor/`. It is off on phones and with reduced motion.

### Unchanged
- Below 981px wide, or with reduced motion on, the page is a normal stacked layout with no pinning.
- Content, copy and colours.


## 1.1.0 (2026-11-18)

The B3spoken panel now uses the scroll transitions from the character sections on anantagame.com.

### Added
- Pinned, scroll-driven sequence for B3spoken. The panel sticks while you scroll through about eight screens of height:
  1. Intro: headline and copy fade and lift in, and the name tag slides in.
  2. The intro fades to dark.
  3. Viewfinder: blinking REC dot, running timecode, a label for the current step, and a five-frame strip (Install, Connect, Resume, Scan, Board) that pans sideways as you scroll. Neighbouring frames are dimmed and slightly smaller. A focus-scale ruler slides along the bottom under a blue centre marker.
  4. Fade to black.
  5. Closing card: shared servers vs your computer, with the Download and View code buttons.
- Four new mock screens for the frames: `install`, `ai`, `resume` and `scan`.
- `sequence` option in `data.js`. Any project with a `sequence` block gets the pinned treatment, and removing the block brings back the normal panel.
- Static fallback: below 981px wide, or with reduced motion on, the sequence is a plain vertical stack with no pinning.

### Unchanged
- All other panels, sections and styles.

## 1.0.0 (2026-11-18)

First version of the rebuilt portfolio.

### Added
- Hero with a generated night skyline, light rain and a 0 to 100% loader.
- Project roster with seven panels: Vuln Scanner, Threat Radar, Android Forensics, B3spoken, Under50, Prompt to Pixels and 1inch Clone.
- Skills section in four groups: Offense, Detection, Forensics and Build.
- Log of recent work and past roles.
- Archive strip for Jumbot, the Netflix landing page, Valentine and Doughlas Meet. The Pokemon repo is left out.
- Contact footer with a mailto link.
- `vercel.json` with clean URLs, asset caching and security headers.
- Self-hosted Bebas Neue and Barlow fonts.

### Still to fill in
- LinkedIn URL and resume file in `data.js`.
