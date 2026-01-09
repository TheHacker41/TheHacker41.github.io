const userName = "TheHacker41";
const orgName = "infinitecampus41";
const repoStyles = {
    "InfiniteCampus": { bg: "https://www.infinitecampus.xyz/res/icon.png", color: "lime" },
    "canvas": { bg: "https://www.infinitecampus.xyz/res/canvasicon.png", color: "red" },
    "Chrome-Extension": { bg: "https://www.infinitecampus.xyz/res/icon.png", color: "lime" },
    "Chat": { bg: "https://www.infinitecampus.xyz/res/chaticon.png", color: "purple" },
    "chat-program": { bg: "https://www.infinitecampus.xyz/res/chaticon.png", color: "purple" },
    "nettlewebadmin": { bg: "https://www.infinitecampus.xyz/res/nettlewebicon.png", color: "lightblue" },
};
async function fetchGitHubProfile() {
    try {
        const res = await fetch(`https://api.github.com/users/${userName}`);
        const data = await res.json();
        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('username').textContent = data.login;
        document.getElementById('bio').textContent = data.bio || "No Desc Available";
    } catch (err) {
        console.error("Error Fetching Profile:", err);
    }
}
async function fetchGitHubRepos() {
    try {
        const res = await fetch(`https://api.github.com/orgs/${orgName}/repos?sort=updated`);
        const repos = await res.json();
        const reposContainer = document.getElementById('repos');
        reposContainer.innerHTML = "";
        repos.slice(0, 6).forEach(repo => {
            const repoEl = document.createElement('div');
            repoEl.className = 'repo';
            const style = repoStyles[repo.name] || {};
            if (style.bg) {
                repoEl.style.backgroundImage = `url('${style.bg}')`;
                repoEl.style.backgroundSize = 'cover';
                repoEl.style.backgroundPosition = 'center';
                repoEl.innerHTML = `
                    <div class="overlay"></div>
                    <h4 style="color:${style.color || '#58a6ff'}">${repo.name}</h4>
                    <p style="font-size:0.8rem">${repo.description || "No Description"}</p>
                `;
            } else {
                repoEl.innerHTML = `
                    <h4 style="color:${style.color || '#58a6ff'}">${repo.name}</h4>
                    <p style="font-size:0.8rem">${repo.description || "No Description"}</p>
                `;
            }
            repoEl.addEventListener('click', () => {
                window.open(repo.html_url, '_blank');
            });
            reposContainer.appendChild(repoEl);
        });
    } catch (err) {
        console.error("Error Fetching Repos:", err);
    }
}
fetchGitHubProfile();
fetchGitHubRepos();
