export const API_URL = 'http://localhost:3000';

interface UserPostBody {
  name?: string;
  email: string;
  password: string;
}

export function USER_POST(body: UserPostBody) {
  return {
    url: API_URL + '/user',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

// export function USER_GET(token) {
//   return {
//     url: API_URL + '/user',
//     options: {
//       method: 'GET',
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     },
//   };
// }
