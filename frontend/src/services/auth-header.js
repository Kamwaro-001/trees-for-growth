// export default function authHeader() {
//     const user = JSON.parse(localStorage.getItem('user'));
  
//     if (user && user.accessToken) {
//       return { Authorization: 'Bearer ' + user.accessToken };
//     } else {
//       return {};
//     }
//   }
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
      console.log('hello this user: ' + user)
  
    if (user && user.auth_token) {
      return { Authorization: 'Bearer ' + user.auth_token };
    } else {
      return {};
    }
  }

  