module.exports = {
  "get": {
    "/users": require("./controllers/UsersController").getAction
  },
  "post": {
    "/users": require("./controllers/UsersController").postAction
  }
};