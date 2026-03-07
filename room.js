/**
 * ROOM — Shared Data Layer
 * Semantic memory primitives for the spatial internet.
 * Version: room/v0.1
 */

const ROOM = (() => {
    /* ── Constants ── */
    const VERSION = 'room/v0.1';

    const NODE_TYPES = {
        PLACE: 'place',
        EVENT: 'event',
        PERSPECTIVE: 'perspective',
        ARTIFACT: 'artifact'
    };

    const EDGE_TYPES = {
        ANCHORED_AT: 'anchored_at',
        OBSERVES: 'observes',
        PRODUCED_BY: 'produced_by',
        LEADS_TO: 'leads_to'
    };

    const NODE_COLORS = {
        place: '#4a9eff',       // Blue
        event: '#ffc44a',       // Gold
        perspective: '#b44aff', // Purple
        artifact: '#4aff8b'     // Green
    };

    const NODE_ICONS = {
        place: '📍',
        event: '⚡',
        perspective: '👁️',
        artifact: '📄'
    };

    const ONTOLOGY_COLORS = {
        architectural: '#ff6b6b',
        social: '#ffd93d',
        experiential: '#6bcb77',
        mythological: '#9b59b6',
        personal: '#3498db',
        bioregional: '#27ae60',
        indigenous: '#e67e22',
        narrative: '#e74c3c'
    };

    /* ── State ── */
    let _world = null;
    let _listeners = [];

    /**
     * Create an empty world graph
     */
    function createWorld(title = '', description = '') {
        return {
            version: VERSION,
            meta: {
                title,
                description,
                created: new Date().toISOString(),
                schema: 'https://github.com/innercartography/ROOM'
            },
            nodes: [],
            edges: [],
            tour: { title: '', description: '', waypoints: [] }
        };
    }

    /**
     * Load world from JSON object or string
     */
    function loadWorld(data) {
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        _world = data;
        _notify('load', _world);
        return _world;
    }

    /**
     * Load world from a URL (fetch)
     */
    async function loadWorldFromURL(url) {
        const res = await fetch(url);
        const data = await res.json();
        return loadWorld(data);
    }

    /**
     * Get current world
     */
    function getWorld() {
        return _world;
    }

    /**
     * Export world as JSON string
     */
    function exportWorld(pretty = true) {
        return JSON.stringify(_world, null, pretty ? 2 : 0);
    }

    /* ── Node CRUD ── */

    function generateId(type) {
        return `${type}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    }

    function getNodes(type = null) {
        if (!_world) return [];
        if (type) return _world.nodes.filter(n => n.type === type);
        return _world.nodes;
    }

    function getNodeById(id) {
        if (!_world) return null;
        return _world.nodes.find(n => n.id === id) || null;
    }

    function addNode(node) {
        if (!_world) throw new Error('No world loaded');
        if (!node.id) node.id = generateId(node.type);
        if (!node.type) throw new Error('Node type is required');
        _world.nodes.push(node);
        _autoCreateEdges(node);
        _notify('node-add', node);
        return node;
    }

    function updateNode(id, updates) {
        const node = getNodeById(id);
        if (!node) throw new Error(`Node not found: ${id}`);
        Object.assign(node, updates);
        _notify('node-update', node);
        return node;
    }

    function removeNode(id) {
        if (!_world) return;
        const idx = _world.nodes.findIndex(n => n.id === id);
        if (idx === -1) return;
        const node = _world.nodes.splice(idx, 1)[0];
        // Remove related edges
        _world.edges = _world.edges.filter(e => e.source !== id && e.target !== id);
        // Remove from tour
        _world.tour.waypoints = _world.tour.waypoints.filter(w =>
            (typeof w === 'string' ? w : w.node) !== id
        );
        _notify('node-remove', node);
        return node;
    }

    /* ── Edge CRUD ── */

    function getEdges(type = null) {
        if (!_world) return [];
        if (type) return _world.edges.filter(e => e.type === type);
        return _world.edges;
    }

    function addEdge(source, target, type, label = '') {
        if (!_world) throw new Error('No world loaded');
        const edge = { source, target, type };
        if (label) edge.label = label;
        _world.edges.push(edge);
        _notify('edge-add', edge);
        return edge;
    }

    function removeEdge(source, target, type) {
        if (!_world) return;
        const idx = _world.edges.findIndex(e =>
            e.source === source && e.target === target && e.type === type
        );
        if (idx !== -1) {
            const edge = _world.edges.splice(idx, 1)[0];
            _notify('edge-remove', edge);
            return edge;
        }
    }

    /* ── Query helpers ── */

    function getPlaces() { return getNodes(NODE_TYPES.PLACE); }
    function getEvents() { return getNodes(NODE_TYPES.EVENT); }
    function getPerspectives() { return getNodes(NODE_TYPES.PERSPECTIVE); }
    function getArtifacts() { return getNodes(NODE_TYPES.ARTIFACT); }

    /**
     * Get all Events anchored to a Place
     */
    function getEventsAtPlace(placeId) {
        return getEvents().filter(e => e.place === placeId);
    }

    /**
     * Get all Perspectives observing an Event
     */
    function getPerspectivesForEvent(eventId) {
        return getPerspectives().filter(p => p.event === eventId);
    }

    /**
     * Get all Artifacts produced by a Perspective
     */
    function getArtifactsForPerspective(perspectiveId) {
        return getArtifacts().filter(a => a.perspective === perspectiveId);
    }

    /**
     * Get unique ontology tags across all perspective nodes
     */
    function getOntologies() {
        const ontologies = new Set();
        getPerspectives().forEach(p => {
            if (p.ontology) ontologies.add(p.ontology);
        });
        return [...ontologies];
    }

    /**
     * Filter perspectives by ontology
     */
    function getPerspectivesByOntology(ontology) {
        return getPerspectives().filter(p => p.ontology === ontology);
    }

    /**
     * Get all nodes connected to a given node
     */
    function getConnectedNodes(nodeId) {
        if (!_world) return [];
        const connectedIds = new Set();
        _world.edges.forEach(e => {
            if (e.source === nodeId) connectedIds.add(e.target);
            if (e.target === nodeId) connectedIds.add(e.source);
        });
        return [...connectedIds].map(id => getNodeById(id)).filter(Boolean);
    }

    /**
     * Get the full context tree for a Place:
     * Place → Events → Perspectives → Artifacts
     */
    function getPlaceContext(placeId) {
        const place = getNodeById(placeId);
        if (!place || place.type !== NODE_TYPES.PLACE) return null;
        const events = getEventsAtPlace(placeId).map(event => ({
            ...event,
            perspectives: getPerspectivesForEvent(event.id).map(perspective => ({
                ...perspective,
                artifacts: getArtifactsForPerspective(perspective.id)
            }))
        }));
        return { ...place, events };
    }

    /* ── Tour ── */

    function getTour() {
        return _world ? _world.tour : null;
    }

    function setTour(tour) {
        if (!_world) throw new Error('No world loaded');
        _world.tour = tour;
        _notify('tour-update', tour);
    }

    function getTourWaypoints() {
        if (!_world || !_world.tour) return [];
        return _world.tour.waypoints.map(w => {
            const nodeId = typeof w === 'string' ? w : w.node;
            const node = getNodeById(nodeId);
            return {
                node,
                narration: typeof w === 'object' ? w.narration : '',
                raw: w
            };
        }).filter(w => w.node);
    }

    /* ── Claudesidian Bridge ── */

    /**
     * Parse Obsidian markdown (with optional YAML frontmatter) into a Perspective node
     */
    function obsidianToPerspective(markdown, defaults = {}) {
        let frontmatter = {};
        let content = markdown;

        // Parse YAML frontmatter
        const fmMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (fmMatch) {
            const yaml = fmMatch[1];
            content = fmMatch[2].trim();
            // Simple YAML parser for flat key-value pairs
            yaml.split('\n').forEach(line => {
                const colonIdx = line.indexOf(':');
                if (colonIdx > 0) {
                    const key = line.slice(0, colonIdx).trim();
                    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
                    frontmatter[key] = val;
                }
            });
        }

        // Extract title from first heading if present
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const label = frontmatter.title || (titleMatch ? titleMatch[1] : 'Untitled Perspective');

        return {
            id: generateId('perspective'),
            type: NODE_TYPES.PERSPECTIVE,
            label,
            description: frontmatter.description || '',
            event: defaults.event || '',
            ontology: frontmatter.ontology || defaults.ontology || 'personal',
            visibility: frontmatter.visibility || defaults.visibility || 'private',
            content,
            src: frontmatter.src || defaults.src || '',
            icon: '🔒',
            _importedFrom: 'claudesidian'
        };
    }

    /* ── Event system ── */

    function on(event, callback) {
        _listeners.push({ event, callback });
        return () => {
            _listeners = _listeners.filter(l => l.callback !== callback);
        };
    }

    function _notify(event, data) {
        _listeners
            .filter(l => l.event === event || l.event === '*')
            .forEach(l => l.callback(event, data));
    }

    /* ── Auto-create edges based on node relationships ── */

    function _autoCreateEdges(node) {
        if (node.type === NODE_TYPES.EVENT && node.place) {
            addEdge(node.id, node.place, EDGE_TYPES.ANCHORED_AT);
        }
        if (node.type === NODE_TYPES.PERSPECTIVE && node.event) {
            addEdge(node.id, node.event, EDGE_TYPES.OBSERVES);
        }
        if (node.type === NODE_TYPES.ARTIFACT && node.perspective) {
            addEdge(node.id, node.perspective, EDGE_TYPES.PRODUCED_BY);
        }
    }

    /* ── Schema validation ── */

    function validate(world = _world) {
        const errors = [];
        if (!world) { errors.push('No world data'); return { valid: false, errors }; }
        if (!world.version) errors.push('Missing version');
        if (!world.nodes || !Array.isArray(world.nodes)) errors.push('Missing or invalid nodes array');
        if (!world.edges || !Array.isArray(world.edges)) errors.push('Missing or invalid edges array');

        const nodeIds = new Set();
        (world.nodes || []).forEach((n, i) => {
            if (!n.id) errors.push(`Node ${i}: missing id`);
            if (!n.type) errors.push(`Node ${i}: missing type`);
            if (!Object.values(NODE_TYPES).includes(n.type)) errors.push(`Node ${i}: invalid type "${n.type}"`);
            if (nodeIds.has(n.id)) errors.push(`Node ${i}: duplicate id "${n.id}"`);
            nodeIds.add(n.id);
        });

        (world.edges || []).forEach((e, i) => {
            if (!nodeIds.has(e.source)) errors.push(`Edge ${i}: source "${e.source}" not found`);
            if (!nodeIds.has(e.target)) errors.push(`Edge ${i}: target "${e.target}" not found`);
        });

        return { valid: errors.length === 0, errors };
    }

    /* ── Public API ── */
    return {
        VERSION, NODE_TYPES, EDGE_TYPES, NODE_COLORS, NODE_ICONS, ONTOLOGY_COLORS,
        createWorld, loadWorld, loadWorldFromURL, getWorld, exportWorld,
        generateId, getNodes, getNodeById, addNode, updateNode, removeNode,
        getEdges, addEdge, removeEdge,
        getPlaces, getEvents, getPerspectives, getArtifacts,
        getEventsAtPlace, getPerspectivesForEvent, getArtifactsForPerspective,
        getOntologies, getPerspectivesByOntology, getConnectedNodes, getPlaceContext,
        getTour, setTour, getTourWaypoints,
        obsidianToPerspective,
        on, validate
    };
})();

// Export for ES modules if available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ROOM;
}
