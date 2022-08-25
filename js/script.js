//This div is where your profile information will appear
const overview = document.querySelector(".overview");
//GitHub username
const username = "juanmatthew";
//select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
//selects the section class repos
const displayRepoInfo = document.querySelector(".repos");
//selects 
const repoData = document.querySelector(".repo-data");

//async function to fetch your GitHub user data
const gitUsers = async function () {
    //Target the “users” endpoint and use a template literal to add the global username variable to the endpoint: users/${username}. Notice that you’ll add a “$” character in front of the variable name to create a placeholder. Because you’re using a template literal, surround the URL in backticks instead of quotation marks.
  const userData = await fetch(`https://api.github.com/users/${username}`); 
  //In your next await statement, resolve the JSON response.
  const userInfo = await userData.json();
  //Log out the response to the console 
  console.log(userInfo);
  //call the function displaying the user information, and pass it the JSON data as an argument
  displayUserInfo(userInfo);
};
//call your function to see your results
gitUsers();
//In the response, look carefully at the properties. You’ll need some of those properties to complete the next function!


//function to display the fetched user information on the page. This function should accept the JSON data as a parameter.
const displayUserInfo = function (userInfo){
    //Inside the function, create a new div and give it a class of “user-info”. -needed to create a variable first to create the element
    const div = document.createElement("div");
    div.classList.add("user-info");
    //Inside the 5 placeholders, use the JSON data to grab the relevant properties to display on the page. in console.log u need to just make sure the info has captured and use those properties.
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
  //Append the div to the overview element.
  overview.append(div);
  fetchRepos();
};

//async function to fetch repos
const fetchRepos = async function () {
    //"repos" is the endpoint, sort=updated to sort most recently recent to last updated then per_page=100 to show 100 repos per page at a time as a parameter
    const gitRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    //Your second await statement should return the JSON response
    const repoInfo = await gitRepos.json();

    //create a variable called fetchLanguages to fetch data from language_url property of your repoInfo
    const fetchLanguages = await fetch(gitRepos.language_url);
    //Create a variable called languageData to save the JSON response.
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    //add each language to an empty array called languages
    const languages = [];
    //Hint: The languageData is an object. Remember how to loop through an object? You’ll want to add the languages to the end of the array.
    for (const language in languageData) {
        languages.push(language);
    }

    console.log(repoInfo);
    //calling the function to display repo info and passing the argument of the gitrepos json variable to get the repo data
    repoDetails(repoInfo);
};
//fetchRepos();

//creating a function to display Info About Your Repos
const repoDetails = function (repos) {
    //Inside the function, loop and create a list item for each repo and give each item
  for (const repo of repos) {
      const listItems = document.createElement("li");
      //A class of “repo”.
      listItems.classList.add("repo");
      //An <h3> element with the repo name. 
      listItems.innerHTML = `<h3>${repo.name}</h3>`;
      //Append the list item to the global variable that selects the unordered repos list
      repoList.append(listItems);
  }  
};

//create a click event listener for the ul class repo-list
repoList.addEventListener("click", function (e) {
    //Add a conditional statement to check if the event target (i.e., the element that was clicked on) matches the <h3> element (i.e., the name of the repo)
    if (e.target.matches("h3")){
        //create a variable called repoName to target the innerText where the event happens
        const repoName = e.target.innerText;
        //Log out the variable to the console. Try clicking on a few repo names to see if your event listener is working as expected.
        //console.log(repoName);
    }
});