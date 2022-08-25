const overview = document.querySelector(".overview");
const username = "juanmatthew";
const repoList = document.querySelector(".repo-list");
const displayRepoInfo = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
//create a global variable for back to repo button and the search by name placeholder
const backToRepoButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const gitUsers = async function () {
  const userData = await fetch(`https://api.github.com/users/${username}`); 
  const userInfo = await userData.json();
  console.log(userInfo);
  displayUserInfo(userInfo);
};

gitUsers();

const displayUserInfo = function (userInfo){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML=`
    <figure>
        <img alt="user avatar" src=${userInfo.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${userInfo.name}</p>
        <p><strong>Bio:</strong> ${userInfo.bio}</p>
        <p><strong>Location:</strong> ${userInfo.location}</p>
        <p><strong>Number of public repos:</strong> ${userInfo.public_repos}</p>
    </div>`;

  overview.append(div);
  fetchRepos();
};
//async function to fetch repos
const fetchRepos = async function () {
    const gitRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const fetchRepoInfo = await gitRepos.json();
    repoDetails(fetchRepoInfo);
};
//fetchRepos();

//creating a function to display Info About Your Repos
const repoDetails = function (repos) {
  for (const repo of repos) {
      const listItems = document.createElement("li");
      listItems.classList.add("repo");
      listItems.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(listItems);
  }  
};

//create a click event listener for the ul class repo-list
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        //console.log(repoName);
        specificRepoInfo(repoName);
    }
});
//create an async function to get the specifc repo information
const specificRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    
    const fetchLanguages = await fetch(repoInfo.language_url);
    const languageData = await fetchLanguages.json();
  
    const languages = [];
    for (const language in languageData) {
      languages.push(language);
    }

    //console.log(languageData);
    displaySpecificRepoInfo(repoInfo, languages);
};

const displaySpecificRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    displayRepoInfo.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML= `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoData.append(div);
};





