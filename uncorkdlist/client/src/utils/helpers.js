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

};
