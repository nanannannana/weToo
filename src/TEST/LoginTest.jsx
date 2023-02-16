/* eslint-disable */
import axios from 'axios';

function LoginTest() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <button
        onClick={async () => {
          const data = await axios({
            method: 'post',
            url: 'http://localhost:8000/auth/login',
            data: {
              id: 'asd',
              pw: '123',
            },
          });
          console.log(data);
        }}
      >
        버튼
      </button>
      <button
        onClick={async () => {
          const data = await axios({
            method: 'post',
            url: 'http://localhost:8000/auth/userinfo',
          });
          console.log(data);
        }}
      >
        버튼
      </button>
    </>
  );
}
