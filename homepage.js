const selectedTagContainer = document.querySelector("#tags:first-of-type");
const tagContainer = document.querySelector("#tags:last-of-type");
const projectContainer = document.querySelector("#projects #container");

var projects = [
    {
        title: 'relic',
        year: '2025',
        links: {
            'github': 'https://github.com/ian-hon/relic'
        },
        media: [
            'staging_new.gif',
            'adding.gif',
            'pending.gif',
            'new_file.gif'
        ],
        description: 'open-source version control. aka, git remade in rust',
        tags: ['rust', 'low-level', 'version control']
    },
    {
        title: "hastebin",
        year: "2024",
        links: {
            github: "https://github.com/ian-hon/hastebin",
            website: "https://hastebin.ianhon.com"
        },
        media: [],
        description: "No-clutter multi-file pastebin with syntax highlighting. Over 2,500 pastes globally. Supports permanent storage and multiple files.",
        tags: ["react", "next.js", "vercel", "postgresql", "axum", "web"]
    },
    {
        title: "YetAnotherRoguelike",
        year: "2023",
        links: {},
        media: [],
        description: "2D infinite sandbox roguelike with procedural generation using Cantor’s pairing and Perlin noise. Features custom light blending, UI framework, and in-house chemistry system.",
        tags: ["c#", "xna", "monogame", "game dev", "procedural generation"]
    },
    {
        title: "Leetcode",
        year: "2025",
        links: {},
        media: [],
        description: "Completed 200+ Leetcode problems over a 100-day streak, all solved using Rust.",
        tags: ["rust", "competitive programming", "dsa"]
    },
    {
        title: "Voxelux",
        year: "2024",
        links: {},
        media: [],
        description: "3D open-world sandbox RPG using dynamic mesh generation with greedy meshing, UV mapping, and chunk-based world segmentation.",
        tags: ["rust", "bevy", "game dev", "3d"]
    },
    {
        title: "Hermes",
        year: "2024",
        links: {},
        media: [],
        description: "Homebrew IRC system with WebSocket support, mirroring Discord in a retro 1980s hacker terminal aesthetic.",
        tags: ["react", "next.js", "vercel", "postgresql", "axum", "irc", "websockets"]
    },
    {
        title: "NeuralCM",
        year: "2023",
        links: {},
        media: [],
        description: "Neural cellular automata capable of imitating biological processes like cell division and death using neural networks.",
        tags: ["c#", "xna", "monogame", "ai", "simulation"]
    },
    {
        title: "Aurum",
        year: "2025",
        links: {},
        media: [],
        description: "Functional e-wallet application built in Rust.",
        tags: ["rust", "fintech", "wallet"]
    },
    {
        title: "Mantissa",
        year: "2025",
        links: {},
        media: [],
        description: "Simulated stock exchange network and bourse.",
        tags: ["rust", "simulation", "finance"]
    },
    {
        title: "Chronos",
        year: "2025",
        links: {},
        media: [],
        description: "Clutterless calendar application.",
        tags: ["rust", "productivity"]
    },
    {
        title: "Soterius",
        year: "2025",
        links: {},
        media: [],
        description: "User registration system used by various apps.",
        tags: ["rust", "auth", "backend"]
    },
    {
        title: "Asteroid & MonoSweeper",
        year: "2023",
        links: {},
        media: [],
        description: "Clones of classic 90s arcade games.",
        tags: ["game dev", "c#", "retro", "xna", "monogame"]
    }
];
var tags = []

var tags = Array.from(new Set(projects.flatMap(e => e.tags)));
var tagPairs = {};
tags.forEach((t) => { tagPairs[t] = Array.from(new Set(projects.map(e => e.tags).filter(e => e.includes(t)).flatMap(e => e).filter(e => e !== t))); });
var selectedTags = [];

function updateContainers() {
    updateTagContainers();
    updateProjectContainers();
}

// #region tagging
function updateTagContainers() {
    let selectedTagContainerNew = '';
    let tagContainerNew = '';

    if (selectedTags.length != 0) {
        // union of all tag pairs
        let pairs = Object.entries(tagPairs).filter(([k, _]) => selectedTags.includes(k)).map(([_, v]) => v);
        let selection = pairs[0];

        pairs.forEach((p) => {
            selection = selection.filter(e => p.includes(e));
        });

        selection.forEach((e) => {
            tagContainerNew += `<div class="tag" onclick="select('${e}')">
            <h2>${e.toLowerCase()}</h2>
            <div><img src="./assets/cross.png"></div>
        </div>`;
        });
    } else {
        tags.filter(x => !selectedTags.includes(x)).forEach((e) => {
            tagContainerNew += `<div class="tag" onclick="select('${e}')">
            <h2>${e.toLowerCase()}</h2>
            <div><img src="./assets/cross.png"></div>
        </div>`;
        });
    }

    selectedTags.forEach((e) => {
        selectedTagContainerNew += `<div class="tag" selected onclick="deselect('${e}')">
            <h2>${e.toLowerCase()}</h2>
            <div><img src="./assets/cross.png"></div>
        </div>`;
    });

    tagContainer.innerHTML = tagContainerNew;
    selectedTagContainer.innerHTML = selectedTagContainerNew;
}

function deselect(e) {
    selectedTags = selectedTags.filter(i => i !== e);

    updateContainers();
}

function select(e) {
    selectedTags.push(e);

    updateContainers();
}
// #endregion


// #region projects
function updateProjectContainers() {
    projectContainerNew = '';
    projects.filter(p => (selectedTags.length == 0) || (p.tags.filter(t => selectedTags.includes(t)).length == selectedTags.length)).forEach((e) => {
        // projects.forEach((e) => {
        let linkString = '';
        Object.keys(e.links).forEach((l) => {
            linkString += `<a href="${e.links[l]}"><img src="./assets/links/${l}.png" /></a>`;
        })

        let tagString = '';
        e.tags.forEach((t) => {
            tagString += `<div class="project-tag">${t}</div>`
        })

        projectContainerNew += `<div class="project">
        <img src="./assets/projects/${e.title}/${e.media[0]}">
        <div id="details">
            <div id="header">
                <div id="title">
                    <h2>${e.title}</h2>
                    <h4>${e.year}</h4>
                </div>
                <div id="links">
                    ${linkString}
                </div>
            </div>
            <h3 id="description">${e.description}</h3>
            <div id="tags">
                ${tagString}
            </div>
        </div>
    </div>`
    });

    projectContainer.innerHTML = projectContainerNew;
}
// #endregion


updateContainers();