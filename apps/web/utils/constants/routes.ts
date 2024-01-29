//this routes can be accessed with out authentication used for authorization
const authenticationRoutes = {
  intro: "/intro",
  new: "/new",
  import: "/import",
};

//this routes needed for authentication purposes
const authorizationRoutes = {
  auth: "/auth",
};

// this routes need authentication for accessing
const authorizedRoutes = {
  home: "/",
  send: "/send",
  swap: "/swap",
};

export const Routes = {
  authorizedRoutes,
  authorizationRoutes,
  authenticationRoutes,
};
