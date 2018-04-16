

var db = require("../models");


function generateUnid(
    a                  // placeholder
  ){
    return a           // if the placeholder was passed, return
      ? (              // a random number from 0 to 15
        a ^            // unless b is 8,
        Math.random()  // in which case
        * 16           // a random number from
        >> a/4         // 8 to 11
        ).toString(16) // in hexadecimal
      : (              // or otherwise a concatenated string:
        [1e10] + 
        1e10 +
        1e9
        ).replace(     // replacing
          /[01]/g,     // zeroes and ones with
          generateUnid // random hex digits
        ).toLowerCase()
  }




module.exports = function(app) {

      app.get("/api", function(req, res) {

        if(req.query.code == undefined){
            req.session.currentCode=generateUnid()
        }else{
            req.session.currentCode = req.query.code            
        }

        console.log(req.session.currentCode)

        res.redirect("/")
        
      });

      //DELETE WHEN READY - route to test session permanence
      app.get("/api/testSessionValue", function(req, res) {
              console.log("FROM TEST", req.session.currentCode)
              res.send(req.session.currentCode)  
              });


}
