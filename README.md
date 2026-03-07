# 🌐 ROOM

**A semantic memory layer for the spatial internet.**

> Places hold memory. Multiple knowledge graphs coexist without collapsing.

[![PLACES Track](https://img.shields.io/badge/Track-PLACES-4A9EFF?style=flat-square)](https://omb.wiki/en/hackathon/tracks/places)
[![Open Metaverse Hackathon](https://img.shields.io/badge/Hackathon-March%207--8%2C%202026-FFC44A?style=flat-square)](https://omb.wiki/en/hackathon)
[![Frontier Tower](https://img.shields.io/badge/Location-Frontier%20Tower%2C%20SF-B44AFF?style=flat-square)](#)

---

## What is ROOM?

ROOM is a **metaontological layer** for spatial environments. It sits at the **Semantic level** of the spatial information stack — below the Visual (splats, textures), Geometric (meshes, volumes), and Physical (collision, dynamics) layers.

Gaussian splats give you photorealistic 3D. **ROOM gives those places meaning.**

### The Problem: Ghost Worlds

Beautiful Gaussian splats have no collision, no surface topology, no memory. You can see a place but it can't remember anything. ROOM solves this differently — not with collision meshes, but with a **semantic knowledge graph** that gives coordinates memory.

### Four Ontological Primitives

| Primitive | Symbol | Role |
|-----------|--------|------|
| **Place** | 📍 | Spatial coordinate or region. The irreducible ground. |
| **Event** | ⚡ | A happening anchored to a Place with a timestamp. |
| **Perspective** | 👁️ | A viewpoint on an Event, carrying ontological metadata. |
| **Artifact** | 📄 | A crystallized output — document, media, insight. |

Multiple Perspectives on the same Event coexist without collapsing. An architect sees structure. A sociologist sees gathering patterns. A mythologist sees stories. All are true simultaneously.

---

## Demo

**Live:** [room.vercel.app](https://room.vercel.app) *(deploy pending)*

### Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing — primitives, demo flow, Frontier Tower locations |
| `viewer.html` | 3D viewer — Three.js scene with semantic overlays + guided tour |
| `editor.html` | Graph editor — D3.js force-directed graph + Claudesidian PKG bridge |

### Quick Start

```bash
# Clone
git clone https://github.com/innercartography/ROOM.git
cd ROOM

# Serve (no build step!)
npx serve . -l 3000
# → http://localhost:3000
```

---

## Architecture

```
world.json          ← Flat JSON graph (nodes + edges + tour)
├── Place nodes     ← Spatial anchors (Frontier Tower locations)
├── Event nodes     ← Timestamped happenings
├── Perspective nodes ← Multi-ontology viewpoints
├── Artifact nodes  ← Produced outputs
└── Edges           ← anchored_at, observes, produced_by, leads_to

room.js             ← Shared data layer (CRUD, queries, validation)
styles.css          ← Design system (dark space theme, glassmorphism)
viewer.html         ← Three.js + CSS2DRenderer
editor.html         ← D3.js force-directed graph
index.html          ← Landing page
```

## Data Format: `world.json` v0.1

```json
{
  "version": "0.1",
  "meta": { "title": "...", "created": "..." },
  "nodes": [
    { "id": "place-exterior", "type": "place", "label": "Frontier Tower", "position": [0,0,0] },
    { "id": "event-kickoff", "type": "event", "label": "Hackathon Kickoff", "time": "..." },
    { "id": "perspective-arch", "type": "perspective", "ontology": "architectural", "content": "..." }
  ],
  "edges": [
    { "source": "event-kickoff", "target": "place-exterior", "type": "anchored_at" }
  ],
  "tour": { "name": "...", "waypoints": [...] }
}
```

---

## Integrations

- **[arrival.space](https://arrival.space)** — Gaussian splat hosting + streaming
- **[Claudesidian](https://github.com/heyitsnoah/claudesidian)** — Obsidian markdown → ROOM Perspective nodes (personal knowledge graphs)
- **[Polycam](https://poly.cam)** — Spatial capture → .ply export
- **RP1 / Metaverse Standards Forum** — Open metaverse interoperability

---

## Hackathon Context

**Open Metaverse Hackathon** · March 7–8, 2026 · Frontier Tower, San Francisco

ROOM is a **PLACES track** entry. We're building a digital twin of Frontier Tower at the semantic level — capturing 4 locations with Polycam, anchoring events as they unfold, and letting multiple perspectives annotate the same space through different ontological lenses.

### Frontier Tower Locations

| # | Location | Status |
|---|----------|--------|
| 1 | 🏛️ Building Exterior | Scan at hackathon |
| 2 | 🚪 Main Lobby | Scan at hackathon |
| 3 | ⚡ 2nd Floor Hackathon Space | Scan at hackathon |
| 4 | 🛸 Secret UFO Room | Find it first 👽 |

---

## License

MIT — You own what you create.

Built by [Inner Cartography](https://innercartography.github.io) for the 1st Annual Open Metaverse Hackathon.
