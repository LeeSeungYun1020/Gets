const isLogin = () => !!sessionStorage.getItem('token');
// import axios from "axios";
//
// async function isLogin() {
//     const response = await axios.get('http://localhost:3000/auth/user',{ withCredentials: true })
//     console.log(response.data.result)
//     return (response.data.result)
// }


export default isLogin;