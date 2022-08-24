//This div is where your profile information will appear
const overview = document.querySelector(".overview");
//GitHub username
const username = "juanmatthew";

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