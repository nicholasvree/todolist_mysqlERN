var db = require("../models");
var mysql = require("mysql2");



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

    //route to log user code in session variable and redirect to home page
      app.post("/api/saveusersession", function(req, res) {

        

        if(req.body.params.code == undefined){
            req.session.currentCode=generateUnid()
        }else{
            req.session.currentCode = req.body.params.code          
        }

        console.log("LOGGING RAN", req.session.currentCode)

        res.send("TRUE")
        
      });

      //DELETE WHEN READY - route to test session permanence
      app.get("/api/testsessionvalue", function(req, res) {
              console.log("FROM TEST", req.session.currentCode)
              res.send(req.session.currentCode)  
              });

      app.post("/api/savedatastring", function(req,res){
          // console.log("CODE", req.session.currentCode)
          console.log("DATASTRING", req.body)
          
          db.Item.create({
            user_code:req.body.userCode,
            data_string: req.body.dataString
          }).then(function(postResult) {
            // log the result to our terminal/bash window
          // console.log(postResult);
            // redirect
            res.send(req.body)  
          });
      })

      app.get("/api/retrievedatastrings/:userCode", function(req, res){
        // console.log("Retrieve controller ran" , req)

        db.Item.findAll({
          where: {
            user_code : req.params.userCode
          }
        }).then(function(result){
          console.log(result)

          return res.json(result)
        })
      })


}
