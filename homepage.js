const selectedTagContainer = document.querySelector("#tags:first-of-type");
const tagContainer = document.querySelector("#tags:last-of-type");
const projectContainer = document.querySelector("#projects #container");
const projectViewContainer = document.querySelector("#project-view");

var projects = [
    {
        title: "axum-diesel talk",
        year: "2025",
        links: [
            ["github", "https://github.com/ian-hon/axum-diesel-example"]
        ],
        media: [
            "0.png"
        ],
        description: "invited by Rust Malaysia to give a talk about axum, the rust web framework, with diesel integration",
        writeup: `On the 21st august 2025, I was invited to give a talk for Rust Malaysia, about axum.rs, the rust web framework.

The audience of the talk was filled with engineers twice my age, and decades more experience than me. We discussed how axum compares to other frameworks, and how Rust's features play into its overall maintability and long-term scalability.

For the talk, a simple e-wallet app was built with vanilla frontend and axum as the backend.`,
        pronunciation: "/ˈæksəm ˈdaɪ.zəl/",
        tags: [
            "rust", "axum", "talk", "diesel"
        ]
    },
    {
        title: "blockchain101 talk",
        year: "2025",
        links: [
            ["github", "https://github.com/ian-hon/solidity-by-example"]
        ],
        media: [
            "0.jpg",
            "1.jpg",
            "2.jpg",
            "3.jpg",
        ],
        description: "speaker for Solidity by Example (2025), teaching event-goers about Solidity, and publishing our first smart contract together",
        writeup: `In November 2025, I had the privilege to give a talk, Solidity by Example, for APU's Blockchain 101 workshop.

We went through setting up wallets, introducing blockchain terminologies and explaining how blockchain actually works.

Then, the participants received several broken smart contracts, and had to fix them; thus familiarising themselves with Solidity, Ethereum's language.

We ended the event by hosting a mini-ideathon.`,
        pronunciation: "/ˈblɒk.tʃeɪn wʌn.əʊ.wʌn/",
        tags: [
            "solidity", "blockchain", "talk"
        ]
    },
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
        description: 'open-source version control. aka, git remade in rust. using CAS + merkle DAG with sha256 implementation',
        writeup: `relic is an open-source version control system, that uses content-addressable storage (CAS) and a merkle directed acyclic graph (DAG), using sha256.

relic started because I wanted to learn how git actually worked under the hood, so I decided to build it from scratch using Rust.

Simple actions like committing, pushing, pulling, merging, changing branches, creating new branches, cherry-picking commits, and signing commits with SSH keys are all supported, and more to come.

To complement the relic system, Reliquary will be developed too, like GitHub to Git.`,
        pronunciation: "/ˈrel.ɪk/",
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
        description: "first search result on google. clutter-less multi-file pastebin with linting. over 20k global pastes & hundreds of daily users",
        writeup: `there is no clutter-free and straightforward way to share code nowadays. every pastebin website is filled with ads, has confusing UI or their pastes last only a few days.

As a result, I made hastebin. Now, it has over 20,000 pastes by strangers across the globe, supporting code sharing in countless languages (programming and not).

The backend is built in axum + supabase, and frontend in reactjs. A singular paste can support multiple files, and is all syntax linted (colour-coded).`,
        pronunciation: "/ˈheɪst.bɪn/",
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
        writeup: ``,
        pronunciation: "",
        description: "2d procedurally generated sandbox (cantor pairing + perlin noise). custom light engine + in-house chemistry system",
        writeup: `2d procedurally generated sandbox, using a custom light engine and in-house chemistry system.

This game is built in monogame, and the world is chunked, with only modified chunks being saved.

Each tile can optionally drop items, be interacted with, or emit light/light particles. The lighting uses a separate layer, that is multiplied onto the real-world layer after.`,
        pronunciation: "/jetəˈnʌð.ərrəʊɡlaɪk/",
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
        writeup: `some of the problems were revisited using other languages like C, C++, or python.

Progress as of now: 75 easy, 115 medium, 19 hard problems.

I started leetcode as I believed there could be improvement made on my problem solving and DSA skills.`,
        pronunciation: "/ˈliːt.koʊd/",
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
        year: "2024 (discontinued)",
        links: [
            // ["website", "https://hermes.ianhon.com"],
            ["github", "https://github.com/ian-hon/hermes"]
        ],
        media: [
            "hermes1.png",
            "hermes2.gif",
            "hermes3.png",
            "hermes4.png",
        ],
        description: "homebrew irc using websockets; aka discord in 90s aesthetic",
        writeup: `Discontinued, because the backend got DDOSed.

Started this project to learn websockets.`,
        pronunciation: "/ˈhɜːr.miːz/",
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
        writeup: `Each tile's current state is determined by weighted sum the 3x3 matrix surrounding it.

When these weights are configured, we can obtain really cool patterns.`,
        pronunciation: "/ˈnjʊə.rəl siː.ɛm/",
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
        writeup: `First big project; built during my SPM season.

Rust (rocket.rs) as the backend, and vanilla frontend.

Users can send money to one another, and wallets can be created for different saving goals.
A QR code can be automatically generated for users to scan and request money, just like current bank nowadays.

A timer can be set to automatically transfer money from one wallet to another (eg: weekly allowance).`,
        pronunciation: "/ˈɔː.rəm/",
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
        writeup: `Simulated stock exchange system; built during SPM season.

Rust (rocket.rs) backend, and vanilla frontend

Each user can either buy, hold or sell their assets during each 'iteration'.

Graphs are created using SVG, and are generated by the Rust backend; able to create several thoudsand graphs in several nanoseconds (i love rust).`,
        pronunciation: "/mænˈtɪs.ə/",
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
        writeup: `built during SPM season; used as a study timer (aka pomodoro timer)
    
Rust (rocket.rs) backend, vanilla frontend

A timer is started from now till the next task, with each task either being in a single day, or spanning multiple days.`,
        pronunciation: "/ˈkrɒn.ɒs/",
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
        writeup: `clone of the original 90s game, built in monogame/xna`,
        pronunciation: "/ˈæs.tə.rɔɪd/",
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
        writeup: `the minesweeper website i was using kept showing ads, so i made this and published it to itch.io`,
        pronunciation: "/ˈmɒn.oʊ.swiː.pər/",
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
        writeup: ``,
        pronunciation: "/ˈsær.ɪf ˈɒp.tɪks/",
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
        writeup: `it's a hassle to have to reopen the APSpace app just to check where and when's the next class, so the APU timetable is scraped and using the Google API, added into a Google calendar.

Shared amongst coursemates.`,
        pronunciation: "/ˈæp.speɪs tuː ˈkæl.ən.dər/",
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
        writeup: `APUGDC's official website. Now discontinued (im graduating soon).`,
        pronunciation: "/ˈeɪ.piː.juː dʒiː.diː.siː/",
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
        writeup: `bot is connected to cohere.ai API; users can ask questions and itll reply.

For SPM, I created a simple organic chemistry diagram creator using pillow. Input the hydrocarbon name and the diagram is generated (eg: methane, alkene, decan-3-iol).

Diagrams are stored so if already called before, just send the existing diagram.`,
        pronunciation: "/ˈdɪs.kɔːrd bɒts/",
        tags: [
            "python", "py-cord", "ai", "chem", "image"
        ]
    },
    {
        title: "learn-morse",
        year: "2024",
        links: [
            ["website", "https://ianhon.com/learn-morse.html"],
            ["github", "https://github.com/ian-hon/learn-morse"]
        ],
        media: [
            "0.gif",
            "morse.png"
        ],
        description: "learn morse code through practice",
        writeup: `learn morse code through practice`,
        pronunciation: "/lɜːrn mɔːrs/",
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
        writeup: `annual programming challenge every december. completed in rust.
        
started during MCO, and is one of my earlier exposures to DSA.`,
        pronunciation: "/ˈæd.vent ʌv koʊd/",
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
        writeup: `on-chain marketplace for dynamic nfts. features auctions and upgradable nfts (group effort)`,
        pronunciation: "/ˈsuː.iː ræŋk.ʌp/",
        tags: ["web3", "react", "vercel", "sui"]
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
    projects.map((v, index) => [v, index]).filter(r => (searchQuery.length == 0) || (
        r[0].title.includes(searchQuery) || r[0].description.includes(searchQuery) || r[0].year.includes(searchQuery) || (
            r[0].tags.filter(t => t.includes(searchQuery)).length != 0
        )
    )).filter(r => (selectedTags.length == 0) || (r[0].tags.filter(t => selectedTags.includes(t)).length == selectedTags.length)).forEach(r => {
        let e = r[0];
        let index = r[1];

        let linkString = '';
        e.links.forEach(l => {
            console.log(l);
            linkString += `<a href="${l[1]}" target="_blank"><img src="./assets/links/${l[0]}.png" /></a>`;
        });

        let tagString = '';
        e.tags.forEach((t) => {
            tagString += `<div class="project-tag">${t}</div>`
        });

        projectContainerNew += `<div class="project" onclick="onProjectClick(${index})">
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

// #region project focus
let currentProject = null;
let currentImageIndex = 0;

const previousButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const carouselInner = document.getElementById('carousel-inner');

function onProjectClick(id) {
    currentProject = projects[id];
    currentImageIndex = 0;

    document.getElementById('project-title').textContent = currentProject.title;
    // document.getElementById('project-writeup').innerHTML = currentProject.writeup.replace(/\n/g, '<br>');
    document.getElementById('project-writeup').innerHTML = currentProject.writeup;
    document.getElementById('project-pronunciation').textContent = currentProject.pronunciation;

    let linkString = '';
    currentProject.links.forEach(l => {
        linkString += `<a href="${l[1]}" target="_blank"><img src="./assets/links/${l[0]}.png" /></a>`;
    });
    document.getElementById('project-links').innerHTML = linkString;

    loadCarouselImages();
    projectViewContainer.ariaLabel = 'open';
}

function closeProjectView() {
    projectViewContainer.ariaLabel = '';
    currentProject = null;
}

function loadCarouselImages() {
    if (!currentProject || currentProject.media.length === 0) return;

    carouselInner.innerHTML = '';
    currentProject.media.forEach((media) => {
        const img = document.createElement('img');
        img.src = `./assets/projects/${currentProject.title}/${media}`;
        carouselInner.appendChild(img);
    });

    updateCarouselPosition();
}

function updateCarouselPosition() {
    carouselInner.style.transform = `translateX(calc(-${currentImageIndex * 60}vw - ${currentImageIndex * 3}ch))`;

    console.log(carouselInner.querySelectorAll('img'));
    carouselInner.querySelectorAll('img').forEach((e, i) => {
        console.log(e, i);
        // e.style.opacity = currentImageIndex == i ? '1' : '0.3';
        e.style.filter = currentImageIndex == i ? 'brightness(1)' : 'brightness(0.5)';
    })

    previousButton.style.opacity = currentImageIndex > 0 ? '0.7' : '0';
    nextButton.style.opacity = currentImageIndex < currentProject.media.length - 1 ? '0.7' : '0';
}

function prevImage() {
    if (!currentProject || currentImageIndex === 0) return;
    currentImageIndex--;
    updateCarouselPosition();
}

function nextImage() {
    if (!currentProject || currentImageIndex >= currentProject.media.length - 1) return;
    currentImageIndex++;
    updateCarouselPosition();
}
// #endregion

updateContainers();