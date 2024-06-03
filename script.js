const repoUrl = 'https://api.github.com/repos/sersanz4/SIM_GIM/contents/';
const ul = document.getElementById('file-list');

fetch(repoUrl)
    .then(response => response.json())
    .then(files => {
        files.forEach(file => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = file.html_url;
            a.textContent = file.name;
            li.appendChild(a);
            ul.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching files:', error));
