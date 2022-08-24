//This div is where your profile information will appear
const overview = document.querySelector(".overview");
//GitHub username
const username = "juanmatthew";

//async function to fetch your GitHub user data
const gitUsers = async function () {
    //Target the “users” endpoint and use a template literal to add the global username variable to the endpoint: users/${username}. Notice that you’ll add a “$” character in front of the variable name to create a placeholder. Because you’re using a template literal, surround the URL in backticks instead of quotation marks.
  const userData = await fetch(`https://api.github.com/users/${username}`); 
  //In your next await statement, resolve the JSON response.
  const userInfo = await userData.json();
  //Log out the response to the console 
  console.log(userInfo);
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
    div.innerHTML=`<div>
    <p><strong>Name:</strong> ${userInfo.name}</p>
    <p><strong>Bio:</strong> ${userInfo.bio}</p>
    <p><strong>Location:</strong> ${userInfo.location}</p>
    <p><strong>Number of public repos:</strong> ${userInfo.public_repos}</p>
  </div> `;
  //Append the div to the overview element.
  overview.append(div);
};