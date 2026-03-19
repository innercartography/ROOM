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
  &nbsp;
  <a href="https://innercartography.github.io/roomhyperblog/"><img src="https://img.shields.io/badge/📝_Hyperblog-v3-FF6B6B?style=for-the-badge" alt="Hyperblog v3" /></a>
</p>

<p align="center">
  <a href="https://omb.wiki/en/hackathon/tracks/places"><img src="https://img.shields.io/badge/🏆_Track-PLACES-4A9EFF?style=flat-square" alt="PLACES Track" /></a>
  <a href="https://omb.wiki/en/hackathon"><img src="https://img.shields.io/badge/🏛️_Open_Metaverse_Hackathon-March_7--8,_2026-FFC44A?style=flat-square" alt="Hackathon" /></a>
  <img src="https://img.shields.io/badge/📍_Frontier_Tower-San_Francisco-B44AFF?style=flat-square" alt="Location" />
  <img src="https://img.shields.io/badge/Zero_Build_Step-HTML%2FJS%2FJSON-69DB7C?style=flat-square" alt="Zero Build" />
</p>

---

## What Is ROOM?

Photorealistic Gaussian splats create stunning 3D environments — but they are **ghost worlds**. No memory, no events, no searchability. Beautiful places you can see but can't understand.

**ROOM adds the missing layer.** A semantic memory graph that gives spatial coordinates *meaning* — not collision meshes, not physics, but knowledge.

> *Gaussian splats give you the Visual. ROOM gives you the Meaning.*

---

## The Spatial Information Stack

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

ROOM operates at the **foundational Semantic layer** — below everything else. It adds what Gaussian splats are missing: **what a place means**, not just what it looks like.

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

## Live Demo

**→ [room-openmetaverse.vercel.app](https://room-openmetaverse.vercel.app)**

Four pages, zero build step:

| Page | What it does |
|------|-------------|
| **Landing** (`/`) | Spatial stack explainer, Ghost World problem/solution, four primitives, demo flow |
| **Tower** (`/tower`) | 3D Three.js model of Frontier Tower with interactive floor labels — click a floor to explore its knowledge graph |
| **Viewer** (`/viewer`) | 3D scene with semantic node overlays, WASD navigation, guided 14-stop tour, ontology filtering, perspective switching |
| **Editor** (`/editor`) | D3.js force-directed knowledge graph editor with full CRUD, drag persistence, JSON export, and Claudesidian PKG bridge |

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
├── tower.html          Three.js 3D tower with interactive floor navigation
├── viewer.html         Three.js 3D viewer + CSS2DRenderer + guided tour + WASD
├── editor.html         D3.js force-directed graph editor + entity sidebar
├── room.js             Shared data layer — CRUD, queries, validation, events
├── styles.css          Design system — dark space theme, glassmorphism, animations
├── sample-world.json   18-node demo graph (Frontier Tower · knowledge capsules)
├── world.json          User's active world file
├── rp1-scene.json      RP1 spatial fabric scene config
├── frontier-tower.jpg  Hero image of the building
├── favicon.svg         ROOM logo
└── vercel.json         Deployment config (clean URLs, CORS for JSON)
```

### `room.js` — The Data Layer

A zero-dependency shared module exposing the full ROOM API:

```javascript
ROOM.loadWorldFromURL('sample-world.json');   // Load a world
ROOM.getPlaces();                              // → all Place nodes
ROOM.getEventsAtPlace('place-lobby');          // → Events anchored here
ROOM.getPerspectivesForEvent('event-hackathon'); // → Multiple viewpoints
ROOM.getPlaceContext('place-16th-floor');      // → Full context tree
ROOM.obsidianToPerspective(markdown);          // → Claudesidian bridge
ROOM.exportWorld();                            // → Portable JSON
ROOM.validate();                               // → Schema validation
```

---

## Data Format: `world.json` v0.1

Flat JSON graph — portable, human-readable, no build step required.

```json
{
  "version": "room/v0.1",
  "meta": { "title": "...", "created": "..." },
  "nodes": [
    { "id": "place-lobby", "type": "place", "label": "Frontier Tower", "position": [0,0,0] },
    { "id": "event-kickoff", "type": "event", "label": "Hackathon Kickoff", "time": "..." },
    { "id": "capsule-thesis", "type": "perspective", "ontology": "experiential", "content": "...", "capsule": true }
  ],
  "edges": [
    { "source": "event-kickoff", "target": "place-lobby", "type": "anchored_at" }
  ],
  "tour": { "title": "...", "waypoints": [{ "node": "...", "narration": "..." }] }
}
```

**Edge types:** `anchored_at` · `observes` · `produced_by` · `leads_to`

**Ontologies:** `architectural` · `social` · `experiential` · `mythological` · `technical` · `personal` · `bioregional`

---

## Knowledge Capsules

The demo graph includes **knowledge capsules** — spatialized perspective nodes drawn from the [ROOM Hyperblog](https://innercartography.github.io/roomhyperblog/), [omb.wiki](https://omb.wiki), and [Resonance Lab](https://innercartography.github.io/resonance-labs/) field notes:

| Capsule | Ontology | Location |
|---------|----------|----------|
| 🧠 The Collective Hippocampus | Technical | 16th Floor |
| 🌐 The Spatial Fabric | Technical | 16th Floor |
| 🏛️ Places Can Remember | Experiential | 16th Floor |
| 📜 Open Standards | Technical | 16th Floor |
| 📐 The Missing Semantic Layer | Technical | 16th Floor |
| 🔒 Knowledge Sovereignty | Personal | 16th Floor |
| 🔬 Resonance Lab — Field Notes | Social | 16th Floor |
| 🏘️ Digital Villages | Social | Alien Lounge |
| 🔮 Shards of Memory | Experiential | Alien Lounge |
| 👽 Alien — Proving Humanity | Technical | Alien Lounge |
| 🪙 Tokens in the Spatial Fabric | Social | Alien Lounge |

---

## Frontier Tower — The Demo Site

Three spatial captures from the 1st Annual Open Metaverse Hackathon:

| # | Location | Description |
|:---:|----------|------------|
| 1 | 🚪 **Lobby & Entrance** | Street-level threshold at 995 Market St |
| 2 | 🛸 **The Alien Lounge** | Silver mylar, the Arecibo message, and alien.org — proving humanity in the age of AI |
| 3 | ⚡ **16th Floor Hackathon Space** | Where builders gather and ROOM came alive |

---

## Integrations

| Partner | Role |
|---------|------|
| [**RP1**](https://enter.rp1.com) | Open metaverse browser · spatial fabric · the map of the metaverse |
| [**arrival.space**](https://arrival.space) | Gaussian splat hosting + streaming |
| [**Claudesidian**](https://github.com/heyitsnoah/claudesidian) | Obsidian markdown → ROOM Perspective nodes (personal knowledge graphs) |
| [**Polycam**](https://poly.cam) | Spatial capture → `.ply` export for Place nodes |
| [**alien.org**](https://alien.org) | Decentralized human verification · token interoperability for spatial villages |
| **Metaverse Standards Forum** | Open metaverse interoperability standards |

---

## Hyperblog

ROOM is documented through a living hyperblog — a spatial essay that evolves with the project:

**→ [ROOM Hyperblog v3](https://innercartography.github.io/roomhyperblog/)**

---

## Hackathon Context

**Open Metaverse Hackathon** · March 7–8, 2026 · Frontier Tower, San Francisco

ROOM is a **PLACES track** entry — building a semantic digital twin of Frontier Tower. Three spatial captures, eleven knowledge capsules, multiple ontological perspectives, one shared memory graph.

---

## License

MIT — You own what you create.

Built by [Inner Cartography](https://innercartography.github.io) for the 1st Annual Open Metaverse Hackathon.
