const selectedTagContainer = document.querySelector("#tags:first-of-type");
const tagContainer = document.querySelector("#tags:last-of-type");
const projectContainer = document.querySelector("#projects #container");

var projects = [
    {
        title: 'relic',
        year: '2025',
        links: [
            ['github', 'https://github.com/ian-hon/relic']
        ],
        media: [
            'staging_new.gif',
            'adding.gif',
            'pending.gif',
            'new_file.gif'
        ],
        description: 'open-source version control. aka, git remade in rust',
        tags: ['rust', 'version control']
    },
    {
        title: "hastebin",
        year: "2024",
        links: [
            ["github", "https://github.com/ian-hon/hastebin"],
            ["website", "https://hastebin.ianhon.com"],
        ],
        media: [
            "hastebin4.gif",
            "hastebin2.gif",
            "hastebin3.gif",
            "hastebin0.png"
        ],
        description: "clutter-less multi-file pastebin with syntax highlighting. over 3.8k global pastes",
        tags: ["react", "next.js", "vercel", "postgresql", "axum"]
    },
    {
        title: "yetAnotherRoguelike",
        year: "2022",
        links: [
            ["github", "https://github.com/ian-hon/YetAnotherRoguelike"]
        ],
        media: [
            "0.gif"
        ],
        // description: "2D infinite sandbox roguelike with procedural generation using Cantor's pairing and Perlin noise. Features custom light blending, UI framework, and in-house chemistry system.",
        description: "2d procedurally generated sandbox (cantor pairing + perlin noise). custom light engine + in-house chemistry system",
        tags: ["c#", "monogame/xna", "procedural generation", "chem"]
    },
    {
        title: "leetcode",
        year: "2024-2025",
        links: [
            ["leetcode", "https://leetcode.com/u/ajian_nedo/"]
        ],
        media: [
            "compilation.png"
        ],
        description: "200+ problems, 100+ streak, all rust.",
        tags: ["rust", "competitive programming", "dsa"]
    },
    // {
    //     title: "voxelux",
    //     year: "2024",
    //     links: [],
    //     media: [],
    //     description: "3d open-world sandbox using dynamic mesh generation + greedy meshing and world chunking",
    //     tags: ["rust", "bevy", "3d"]
    // },
    {
        title: "hermes",
        year: "2024",
        links: [
            ["website", "https://hermes.ianhon.com"],
            ["github", "https://github.com/ian-hon/hermes"]
        ],
        media: [
            "hermes1.png",
            "hermes2.gif",
            "hermes3.png",
            "hermes4.png",
        ],
        description: "homebrew irc using websockets; aka discord in 90s aesthetic",
        tags: ["react", "next.js", "vercel", "sqlite", "axum", "irc", "websockets"]
    },
    {
        title: "neuralCM",
        year: "2023",
        links: [
            ["github", 'https://github.com/ian-hon/NeuralCM']
        ],
        media: [
            'worms.gif',
            'slime_mold.gif',
            'pheromones.gif',
            'cell_mitosis.gif'
        ],
        description: "neural cellular automata. imitates cell division and cell death using neural networks.",
        tags: ["c#", "monogame/xna", "ai", "simulation"]
    },
    {
        title: "aurum",
        year: "2023 (discontinued)",
        links: [
            ["github", "https://github.com/ian-hon/aurum"]
        ],
        media: [
            "aurum.png"
        ],
        description: "e-wallet application built in rust.",
        tags: ["rust", "fintech", "vanillajs"]
    },
    {
        title: "mantissa",
        year: "2023 (discontinued)",
        links: [
            ["github", "https://github.com/ian-hon/mantissa"]
        ],
        media: [
            "mantissa.png"
        ],
        description: "simulated stock exchange and bourse. simulates over thousands of stocks, and several millions of users",
        tags: ["rust", "simulation", "finance", "vanillajs"]
    },
    {
        title: "chronos",
        year: "2023 (discontinued)",
        links: [
            ["github", "https://github.com/ian-hon/chronos"]
        ],
        media: [
            "chronos.png"
        ],
        description: "clutterless calendar application",
        tags: ["rust", "productivity", "vanillajs"]
    },
    // {
    //     title: "soterius",
    //     year: "2025",
    //     links: [],
    //     media: [],
    //     description: "user registration system, used by other apps in my ecosystem",
    //     tags: ["rust", "auth", "backend"]
    // },
    {
        title: "asteroid",
        year: "2023",
        links: [
            ["itch", "https://asianerd.itch.io/asteroid"],
        ],
        media: [
            "0.gif"
        ],
        description: "clone of the original 90s game, built in monogame/xna",
        tags: ["c#", "monogame/xna"]
    },
    {
        title: "monosweeper",
        year: "2021",
        links: [
            ["github", "https://github.com/ian-hon/MonoSweeper"],
            ["itch", "https://asianerd.itch.io/monosweeper"],
        ],
        media: [
            "0.gif"
        ],
        description: "built this because the minesweeper website kept showing ads",
        tags: ["c#", "monogame/xna"]
    },
    {
        title: "sarif optics",
        year: "2025",
        links: [],
        media: [
            '0.gif',
            '1.png'
        ],
        description: "simple threejs test",
        tags: ["threejs", "3d", "react", 'vite']
    },
    {
        title: "apspace-to-calendar",
        year: "2024",
        links: [
            ["github", "https://github.com/ian-hon/apspace-to-calendar"]
        ],
        media: [
            '0.png',
            'multi_intake.png',
            'terminal_view.png'
        ],
        description: "scrapes apu's timetable and appends to google calendar",
        tags: [
            "python", "automation"
        ]
    },
    {
        title: "apugdc",
        year: "2024",
        links: [
            ["github", 'https://github.com/ian-hon/apugdc'],
            ["website", 'https://apugdc.vercel.app'],
        ],
        media: [
            "landing.png",
            "landing_2.png",
            "events.png",
            "showcase.png"
        ],
        description: "apu game development club official website. current & past events, leaderboards and showcase system",
        tags: ['react', 'expressjs', 'vercel', 'next.js']
    },
    {
        title: "discord bots",
        year: "2021",
        links: [
            ["github", "https://github.com/ian-hon/discord-bots"]
        ],
        media: [
            "0.png",
            "1.png",
            "2.png",
            "3.png",
        ],
        description: "discord bot with ai chatbot, server health monitoring, minecraft live player list and o-chem diagram generation using pillow",
        tags: [
            "python", "py-cord", "ai", "chem", "image"
        ]
    },
    {
        title: "learn-morse",
        year: "2024",
        links: [
            ["website", "https://ianhon.com/learn-morse"],
            ["github", "https://github.com/ian-hon/learn-morse"]
        ],
        media: [
            "0.gif",
            "morse.png"
        ],
        description: "learn morse code through practice",
        tags: ["vanillajs"]
    },
    {
        title: "advent-of-code",
        year: "2020-present",
        links: [
            ["github", "https://github.com/ian-hon/advent-of-code"]
        ],
        media: [
            "0.png"
        ],
        description: "annual programming challenge every december. completed in rust",
        tags: ["rust"]
    },
    {
        title: "SuiRankup",
        year: "2025",
        links: [
            ["github", "https://github.com/wz-Tan/devmatch2_Ch1llGuys"],
            ["website", "https://devmatch2-ch1ll-guys-prod-2.vercel.app/"]
        ],
        media: [
            "1.png",
            "0.png",
            "2.png",
        ],
        description: "on-chain marketplace for dynamic nfts. features auctions and upgradable nfts (group effort)",
        tags: ["web3", "react", "vercel", "sui"]
    },
    {
        title: "axum-diesel talk",
        year: "2025",
        links: [
            ["github", "https://github.com/ian-hon/axum-diesel-example"]
        ],
        media: [
            "0.png"
        ],
        description: "invited by Rust Malaysia to give a talk about axum, the rust web framework, with diesel integration (group effort)",
        tags: [
            "rust", "axum", "talk", "diesel"
        ]
    },
];

var tags = Array.from(new Set(projects.flatMap(e => e.tags)));
var tagPairs = {};
tags.forEach((t) => { tagPairs[t] = Array.from(new Set(projects.map(e => e.tags).filter(e => e.includes(t)).flatMap(e => e).filter(e => e !== t))); });
var selectedTags = [];

var searchQuery = '';
document.querySelector("#query input").addEventListener('keyup', () => {
    searchQuery = document.querySelector("#query input").value;

    console.log(searchQuery);

    updateContainers();
})

var filterOpen = false;
const filterContainer = document.querySelector("#query #filter");
const filterToggle = document.querySelector("#query #filter-toggle");

function updateContainers() {
    updateTagContainers();
    updateProjectContainers();
    updateFilterContainer();
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
    let projectContainerNew = '';
    projects.filter(p => (searchQuery.length == 0) || (
        p.title.includes(searchQuery) || p.description.includes(searchQuery) || p.year.includes(searchQuery) || (
            p.tags.filter(t => t.includes(searchQuery)).length != 0
        )
    )).filter(p => (selectedTags.length == 0) || (p.tags.filter(t => selectedTags.includes(t)).length == selectedTags.length)).forEach((e) => {
        let linkString = '';
        e.links.forEach(l => {
            console.log(l);
            linkString += `<a href="${l[1]}" target="_blank"><img src="./assets/links/${l[0]}.png" /></a>`;
        });

        let tagString = '';
        e.tags.forEach((t) => {
            tagString += `<div class="project-tag">${t}</div>`
        });

        projectContainerNew += `<div class="project">
            <div id="background" style="background-image: url(\'./assets/projects/${e.title}/${e.media[0]}\')"></div>
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
        </div>`;
    });

    projectContainer.innerHTML = projectContainerNew;
}
// #endregion

// #region filter section
function toggleFilterContainer() {
    filterOpen = !filterOpen;

    selectedTags = [];
    updateContainers();
}

function updateFilterContainer() {
    filterContainer.setAttribute('data-open', filterOpen);
    filterToggle.querySelector("h3").innerHTML = `${filterOpen ? 'close' : 'open'} filters`;

    console.log(filterOpen);
}
// #endregion

updateContainers();