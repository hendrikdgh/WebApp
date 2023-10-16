module.exports = app => {
    const stats = require("../controllers/stats.controller.js");
  
    var router = require("express").Router();
  
    // Calculate stats
    router.get("/stats", stats.calculate);
  
    app.use('/api', router);
};
