const repoUrl = 'https://api.github.com/repos/sersanz4/SIM_GIM/contents/';
const tema1List = document.getElementById('tema1-list');
const tema2List = document.getElementById('tema2-list');
const laboratorioList = document.getElementById('laboratorio-list');
const videosList = document.getElementById('videos-list');

const sections = {
    "Tema 1": tema1List,
    "Tema 2": tema2List,
    "Laboratorio": laboratorioList,
    "Videos": videosList
};

function createListItem(file) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = file.html_url;
    a.textContent = file.name;
    li.appendChild(a);
    return li;
}

function fetchAndDisplayFiles(url, listElement) {
    fetch(url)
        .then(response => response.json())
        .then(files => {
            files.forEach(file => {
                const li = createListItem(file);
                listElement.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching files:', error));
}

fetch(repoUrl)
    .then(response => response.json())
    .then(files => {
        files.forEach(file => {
            if (file.type === 'dir' && sections[file.name]) {
                const listElement = sections[file.name];
                fetchAndDisplayFiles(file.url, listElement);
            }
        });

        // Fetch contents of the Laboratorio folder
        const laboratorioUrl = files.find(file => file.name === 'Laboratorio').url;
        fetch(laboratorioUrl)
            .then(response => response.json())
            .then(labFolders => {
                labFolders.forEach(folder => {
                    const folderLi = document.createElement('li');
                    folderLi.textContent = folder.name;
                    const sublist = document.createElement('ul');
                    fetchAndDisplayFiles(folder.url, sublist);
                    folderLi.appendChild(sublist);
                    laboratorioList.appendChild(folderLi);
                });
            });
    })
    .catch(error => console.error('Error fetching files:', error));
