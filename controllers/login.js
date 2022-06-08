module.exports = (app) => {
  app.get("/home", (req, res) => {
    console.log(req.app.get("user"), "hello sandhya");
    res.send(req.app.get("user"));
  });
};
