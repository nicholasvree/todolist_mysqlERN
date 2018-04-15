
var db = require("../models");





module.exports = function(app) {

      app.get("/api", function(req, res) {

        // console.log(req.query)


        //   var sessData = req.session;
        //   sessData.myCode = "TEST";
        //   res.json(sessData.code);

        req.session.currentCode = req.query.code
        // console.log(req.session.code) 

        // console.log(sessData.myCode)
        res.json(req.session.currentCode)
        
      });


}
