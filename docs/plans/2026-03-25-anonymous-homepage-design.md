# CANVAS Anonymous Homepage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the CANVAS anonymous project homepage so it presents the prepared paper figures and comparison videos in a polished, publication-ready layout.

**Architecture:** Keep the site as a static HTML/CSS/JS project, but replace the template-driven carousel layout with a custom editorial-style landing page. Use local figure previews and a generated media manifest so the page can present both featured videos and a larger cross/self comparison library without exposing non-anonymous metadata.

**Tech Stack:** Static HTML, vanilla JavaScript, custom CSS, local PDF/PNG/MP4 assets, Python `unittest`.

---

### Task 1: Lock the new homepage contract with tests

**Files:**
- Modify: `tests/test_homepage_content.py`

**Step 1: Write the failing test**

Add assertions for:
- anonymous author and submission copy
- new homepage sections for method overview, figure gallery, featured comparisons, full library, and BibTeX
- local CANVAS assets under `images/` and a media manifest entrypoint under `static/js/`

**Step 2: Run test to verify it fails**

Run: `python -m unittest tests.test_homepage_content`

Expected: FAIL because the current template does not contain the new structure or media manifest.

### Task 2: Build the media asset layer

**Files:**
- Create: `static/js/media-manifest.js`
- Create: `images/CANVAS_METHOD-preview.png`
- Create: `images/cross-preview.png`
- Create: `images/self-preview.png`

**Step 1: Generate preview images**

Use `pdftoppm` to convert the first page of each PDF figure into a PNG preview sized for web display.

**Step 2: Generate the media manifest**

Create a small manifest that exposes:
- featured cross/self videos
- full cross library
- full self library
- clean labels derived from case ids

### Task 3: Rebuild the homepage

**Files:**
- Modify: `index.html`
- Modify: `static/css/index.css`
- Modify: `static/js/index.js`

**Step 1: Replace the template structure**

Build:
- a bold anonymous hero
- a teaser spotlight using an existing comparison video
- method and result figure cards
- featured comparison video section
- full cross/self library section
- anonymous BibTeX and footer

**Step 2: Style the page**

Implement a cohesive editorial aesthetic with:
- distinctive typography
- custom color variables
- layered surfaces and strong layout rhythm
- responsive video cards and figure panels

**Step 3: Wire the interactions**

Implement:
- sticky section navigation
- cross/self library tab switching
- featured video rendering from the manifest
- BibTeX copy button

### Task 4: Verify the result

**Files:**
- No code changes required unless verification fails

**Step 1: Run tests**

Run: `python -m unittest tests.test_homepage_content`

Expected: PASS

**Step 2: Static sanity check**

Run a local server and confirm the page loads without missing assets.

Suggested commands:
- `python -m http.server 8000`
- open `http://127.0.0.1:8000`

**Step 3: Final review**

Check:
- no author identities leaked
- figures open correctly
- featured videos and full library render correctly
- layout works on desktop and mobile widths
