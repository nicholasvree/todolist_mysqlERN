var db = require("../models");
var mysql = require("mysql2");

module.exports = function(app) {
   
  //Route to save data string to database
  app.post("/api/savedatastring", function(req,res){
      db.Item.create({
        user_code:req.body.userCode,
        data_string: req.body.dataString
      })
      .catch(function(err){
       return res.send(err)
      })
      .then(function(result){
        return res.send(result)
      })
 
  })

  //Route to retrieve records from database
  app.get("/api/retrievedatastrings/:userCode", function(req, res){
    db.Item.findAll({
      where: {
        user_code : req.params.userCode
      }
    }).then(function(result){
      console.log(result)
      return res.json(result)
    })
  })

       // OUT OF USE - route to log user code in session variable and redirect to home page
    //   app.post("/api/saveusersession", function(req, res) {

        

    //     if(req.body.params.code == undefined){
    //         req.session.currentCode=generateUnid()
    //     }else{
    //         req.session.currentCode = req.body.params.code          
    //     }

    //     console.log("LOGGING RAN", req.session.currentCode)

    //     res.send("TRUE")
        
    //   });

      // OUT OF USE //DELETE WHEN READY - route to test session permanence
      // app.get("/api/testsessionvalue", function(req, res) {
      //         console.log("FROM TEST", req.session.currentCode)
      //         res.send(req.session.currentCode)  
      //         });

      // OUT OF USE - function generateUnid(
//     a                  // placeholder
//   ){
//     return a           // if the placeholder was passed, return
//       ? (              // a random number from 0 to 15
//         a ^            // unless b is 8,
//         Math.random()  // in which case
//         * 16           // a random number from
//         >> a/4         // 8 to 11
//         ).toString(16) // in hexadecimal
//       : (              // or otherwise a concatenated string:
//         [1e10] + 
//         1e10 +
//         1e9
//         ).replace(     // replacing
//           /[01]/g,     // zeroes and ones with
//           generateUnid // random hex digits
//         ).toLowerCase()
//   }



}
