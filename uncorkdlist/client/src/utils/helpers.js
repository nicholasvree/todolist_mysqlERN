//Include the Axios Library to make HTTP Requests
import axios from "axios";


// Export methods to be used to access the list API
export default {

  getUserSession: function(userCode){

    console.log("GET USER SESSION RAN" ,userCode)

    return axios({
      method: 'post',
      url: '/api/saveusersession',
      data: userCode
    })
  },

    //saveDataString - 

    savedataString: function(dataString){
        console.log("FIRT DATE" ,dataString)


        return axios({
          method: 'post',
          url: '/api/savedatastring',
          data: dataString
        })
      },

      generateUnid: function(a){
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
              this.generateUnid // random hex digits
            ).toLowerCase()
      }

};
