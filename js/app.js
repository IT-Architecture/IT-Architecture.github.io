// The Auth0 client, initialized in configureClient()
let auth0Client = null;

/**
 * Starts the authentication flow
 */
const login = async (targetUrl) => {
  try {
    console.log("Logging in", targetUrl);

    const options = {
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    };

    if (targetUrl) {
      options.appState = { targetUrl };
    }

    await auth0Client.loginWithRedirect(options);
  } catch (err) {
    console.log("Log in failed", err);
  }
};

/**
 * Executes the logout flow
 */
const logout = async () => {
  try {
    console.log("Logging out");
    await auth0Client.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  } catch (err) {
    console.log("Log out failed", err);
  }
};



/**
 * Initializes the Auth0 client
 */
const configureClient = async () => {

  auth0Client = await auth0.createAuth0Client({
    domain: "dev-fe4zf-19.us.auth0.com",
    clientId: "145YekZoFGI4gBaSSWXcQVUu79fcDRsS"
  });
};


// Will run when page finishes loading
window.onload = async () => {
  await configureClient();

  // If unable to parse the history hash, default to the root URL
//   if (!showContentFromUrl(window.location.pathname)) {
//     showContentFromUrl("/");
//     window.history.replaceState({ url: "/" }, {}, "/");
//   }

  const bodyElement = document.getElementsByTagName("body")[0];

  // Listen out for clicks on any hyperlink that navigates to a #/ URL
//   bodyElement.addEventListener("click", (e) => {
//     if (isRouteLink(e.target)) {
//       const url = e.target.getAttribute("href");

//       if (showContentFromUrl(url)) {
//         e.preventDefault();
//         window.history.pushState({ url }, {}, url);
//       }
//     }
//   });
  const accessToken = await auth0Client.getTokenSilently();
  const isAuthenticated = await auth0Client.isAuthenticated();

  console.log("TOKEN : " + accessToken)
  console.log("AUTHEN : " + isAuthenticated)
  if(isAuthenticated) {

    const user = await auth0Client.getUser();
    console.log(user)
    document.getElementById('loginbtn').style.display = 'none';
    document.getElementById('logoutbtn').style.display = 'inline-block';
    document.getElementById("ifconnected").innerHTML = "Connected as " + user["nickname"];
    return;

  } else {  
      document.getElementById('loginbtn').style.display = 'inline-block';
      document.getElementById('logoutbtn').style.display = 'none';
      document.getElementById('ifconnected').style.display = 'flex';
  }

};