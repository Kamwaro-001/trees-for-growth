import './regenerator-runtime/runtime';
import axios from './axios';

// Make a request for a user with a given ID
function getting() {
    axios.get('/api/users/')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    
}
