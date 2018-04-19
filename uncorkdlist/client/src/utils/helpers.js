//Include the Axios Library to make HTTP Requests
import axios from "axios";


// Export methods to be used to access the list API
export default {

  //Http request to save a new record in database
  savedataString: function(dataString){
      console.log("FIRT DATE" ,dataString)
      return axios({
        method: 'post',
        url: '/api/savedatastring',
        data: dataString
      })
    },

  //HTTP request to retrieve respective users data records
  retrieveDataStrings: function(userCode){
    console.log("RETRIEVE HELPER WORKS", userCode)
    return axios.get('/api/retrievedatastrings/' + userCode)
  },

  changeStatus: function(data){
    return axios({
      method:'post',
      url :'/api/changeStatus',
      data : data
    })
  },

  //Logic to randomly generate 32-bit Hex
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
  },

  compareAsc: function (a, b) {
    // Use toUpperCase() to ignore character casing
    const dataA = a.data_string.toUpperCase();
    const dataB = b.data_string.toUpperCase();
  
    let comparison = 0;
    if (dataA > dataB) {
      comparison = 1;
    } else if (dataA < dataB) {
      comparison = -1;
    }
    return comparison;
  }, 

  compareDesc: function (a, b) {
    // Use toUpperCase() to ignore character casing
    const dataA = a.data_string.toUpperCase();
    const dataB = b.data_string.toUpperCase();
  
    let comparison = 0;
    if (dataA > dataB) {
      comparison = -1;
    } else if (dataA < dataB) {
      comparison = 1;
    }
    return comparison;
  }, 

  



  // //OUT OF USE - was used for server session
  // getUserSession: function(userCode){
  //   return axios({
  //     method: 'post',
  //     url: '/api/saveusersession',
  //     data: userCode
  //   })
  // }
};
