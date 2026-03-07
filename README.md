<p align="center">
  <img src="favicon.svg" width="64" height="64" alt="ROOM logo" />
</p>

<h1 align="center">ROOM</h1>

<p align="center">
  <strong>A semantic memory layer for the spatial internet.</strong><br/>
  <em>Places hold memory. Multiple knowledge graphs coexist without collapsing.</em>
</p>

<p align="center">
  <a href="https://room-openmetaverse.vercel.app"><img src="https://img.shields.io/badge/▶_Live_Demo-room--openmetaverse.vercel.app-7C6AFF?style=for-the-badge&logoColor=white" alt="Live Demo" /></a>
</p>

<p align="center">
  <a href="https://omb.wiki/en/hackathon/tracks/places"><img src="https://img.shields.io/badge/🏆_Track-PLACES-4A9EFF?style=flat-square" alt="PLACES Track" /></a>
  <a href="https://omb.wiki/en/hackathon"><img src="https://img.shields.io/badge/🏛️_Open_Metaverse_Hackathon-March_7--8,_2026-FFC44A?style=flat-square" alt="Hackathon" /></a>
  <img src="https://img.shields.io/badge/📍_Frontier_Tower-San_Francisco-B44AFF?style=flat-square" alt="Location" />
  <img src="https://img.shields.io/badge/Zero_Build_Step-Just_HTML%2FJS%2FJSON-69DB7C?style=flat-square" alt="Zero Build" />
</p>

---

## The Problem: Ghost Worlds 👻

Photorealistic Gaussian splats create stunning 3D environments — but they have **no memory**. No collision, no surface topology, no events, no searchability. Beautiful ghost worlds you can see but can't understand.

**ROOM solves this differently.** Instead of fighting the ghost world with collision meshes, give it a semantic memory layer — a knowledge graph that gives coordinates meaning.

> *Gaussian splats give you the Visual. ROOM gives you the Meaning.*

---

## Four Ontological Primitives

ROOM reduces spatial memory to four atomic types — mirroring how the hippocampus encodes it.

| Primitive | Symbol | Role |
|:---:|:---:|:---|
| **Place** | 📍 | A spatial coordinate or region. The irreducible ground. |
| **Event** | ⚡ | A happening anchored to a Place with a timestamp. |
| **Perspective** | 👁️ | A viewpoint on an Event — carrying ontological metadata. |
| **Artifact** | 📄 | A crystallized output — document, media, or insight. |

Multiple Perspectives on the same Event coexist without collapsing. An architect sees structure. A sociologist sees gathering patterns. A mythologist sees story. **All are true simultaneously.**

---

## Where ROOM Lives — The Spatial Stack

```
┌──────────────────────────────────────────────────┐
│  🎨  Visual        Pixels, textures, rendering   │  ← Gaussian Splats
├──────────────────────────────────────────────────┤
│  📐  Geometric     3D shape, volume, topology    │  ← Meshes
├──────────────────────────────────────────────────┤
│  ⚙️  Physical      Collision, dynamics, forces   │  ← Physics engines
├──────────────────────────────────────────────────┤
│  🧠  SEMANTIC      Meaning, memory, knowledge    │  ← ROOM ✦
└──────────────────────────────────────────────────┘
```

ROOM operates at the **foundational Semantic layer** — below everything else. It adds the layer that Gaussian splats are missing: **what a place means**, not just what it looks like.

---

## Live Demo

**→ [room-openmetaverse.vercel.app](https://room-openmetaverse.vercel.app)**

Three pages, zero build step:

| Page | What it does |
|------|-------------|
| **Landing** (`/`) | Spatial stack, Ghost World problem/solution, four primitives, demo flow, Frontier Tower locations |
| **Viewer** (`/viewer`) | 3D Three.js scene with semantic node overlays, guided 11-stop tour, perspective switching |
| **Editor** (`/editor`) | D3.js force-directed knowledge graph editor with full CRUD, JSON export, and Claudesidian PKG bridge |

---

## Quick Start

```bash
git clone https://github.com/innercartography/ROOM.git
cd ROOM

# No install. No build. Just serve.
npx serve . -l 3000
```

Open [localhost:3000](http://localhost:3000) and explore.

---

## Architecture

```
room-openmetaverse/
├── index.html          Landing page — hero, spatial stack, primitives, demo flow
├── viewer.html         Three.js 3D viewer + CSS2DRenderer + guided tour
├── editor.html         D3.js force-directed graph editor + entity sidebar
├── room.js             Shared data layer — CRUD, queries, validation, events
├── styles.css          Design system — dark space theme, glassmorphism, animations
├── sample-world.json   24-node demo graph (Frontier Tower hackathon data)
├── world.json          User's active world file
├── favicon.svg         ROOM logo
└── vercel.json         Deployment config (clean URLs, CORS for JSON)
```

### `room.js` — The Data Layer

A zero-dependency shared module exposing the full ROOM API:

```javascript
ROOM.loadWorldFromURL('sample-world.json');  // Load a world
ROOM.getPlaces();                             // → all Place nodes
ROOM.getEventsAtPlace('place-lobby');         // → Events anchored here
ROOM.getPerspectivesForEvent('event-opening');// → Multiple viewpoints
ROOM.getPlaceContext('place-2nd-floor');      // → Full context tree
ROOM.obsidianToPerspective(markdown);         // → Claudesidian bridge
ROOM.exportWorld();                           // → Portable JSON
```

---

## Data Format: `world.json` v0.1

Flat JSON graph — portable, human-readable, no build step required.

```json
{
  "version": "room/v0.1",
  "meta": { "title": "...", "created": "..." },
  "nodes": [
    { "id": "place-exterior", "type": "place", "label": "Frontier Tower", "position": [0,0,0] },
    { "id": "event-kickoff", "type": "event", "label": "Hackathon Kickoff", "time": "..." },
    { "id": "perspective-arch", "type": "perspective", "ontology": "architectural", "content": "..." }
  ],
  "edges": [
    { "source": "event-kickoff", "target": "place-exterior", "type": "anchored_at" }
  ],
  "tour": { "title": "...", "waypoints": [{ "node": "...", "narration": "..." }] }
}
```

**Edge types:** `anchored_at` · `observes` · `produced_by` · `leads_to`

**Ontologies:** `architectural` · `social` · `experiential` · `mythological` · `technical` · `personal`

---

## Integrations

| Partner | Role |
|---------|------|
| [**arrival.space**](https://arrival.space) | Gaussian splat hosting + streaming |
| [**Claudesidian**](https://github.com/heyitsnoah/claudesidian) | Obsidian markdown → ROOM Perspective nodes (personal knowledge graphs) |
| [**Polycam**](https://poly.cam) | Spatial capture → `.ply` export for Place nodes |
| **RP1 / Metaverse Standards Forum** | Open metaverse interoperability standards |

---

## Hackathon Context

**Open Metaverse Hackathon** · March 7–8, 2026 · Frontier Tower, San Francisco

ROOM is a **PLACES track** entry — building a semantic digital twin of Frontier Tower. Four spatial captures, multiple ontological perspectives, one shared memory graph.

| # | Location | Description |
|:---:|----------|------------|
| 1 | 🏛️ **Building Exterior** | Street-level approach to Frontier Tower |
| 2 | 🚪 **Main Lobby** | Threshold between the street and the spatial internet |
| 3 | ⚡ **2nd Floor Hackathon Space** | Where builders gather |
| 4 | 🛸 **The UFO Room** | The secret bonus level 👽 |

---

## License

MIT — You own what you create.

Built by [Inner Cartography](https://innercartography.github.io) for the 1st Annual Open Metaverse Hackathon.
