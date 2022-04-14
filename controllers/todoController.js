const path = require("path");
const APIFunction = require(path.join(__dirname, "../assets/asyncFunction.js"));
const loadBusiness = require(path.join(__dirname, "../assets/loadBusiness.js"));

module.exports = (app) => {
  app.post("/validateOwner", (req, res) => {
    APIFunction.retrieveOwnerValidation(req, res);
  });
  app.get("/validateOwner", (req, res) => {
    loadBusiness.validateNewOwner();
    res.send("Success");
  });
  app.get("*", (req, res) => {
    res.render("404");
  });
};
