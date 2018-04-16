//Include the Axios Library to make HTTP Requests
import axios from "axios";


// Export methods to be used to access the list API
export default {

    //saveDataString - 

    savedataString: function(dataString){
        console.log(dataString)

        return axios({
          method: 'post',
          url: '/api/savedatastring',
          data: dataString
        })
      },

};
