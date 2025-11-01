const selectedTagContainer = document.querySelector("#tags:first-of-type");
const tagContainer = document.querySelector("#tags:last-of-type");

var tags = [
    'web3',
    'fullstack',
    'c#',
    'c++',
    'rust',
    'python',
    'solidity',
    'react',
    'html/css',
    'firestore',
    'vercel',
    'expo eas',
    'version control'
]

var selectedTags = [];

function updateContainers() {
    selectedTagContainer.innerHTML = '';
    tagContainer.innerHTML = '';

    let selectedTagContainerNew = '';
    let tagContainerNew = '';

    let unselected = tags.filter(x => !selectedTags.includes(x));
    unselected.forEach((e) => {
        tagContainerNew += `<div class="tag" onclick="select('${e}')">
            <h2>${e.toLowerCase()}</h2>
            <div>
                <img src="./assets/cross.png">
            </div>
        </div>`;
    });

    selectedTags.forEach((e) => {
        selectedTagContainerNew += `<div class="tag" selected onclick="deselect('${e}')">
            <h2>${e.toLowerCase()}</h2>
            <div>
                <img src="./assets/cross.png">
            </div>
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

updateContainers();