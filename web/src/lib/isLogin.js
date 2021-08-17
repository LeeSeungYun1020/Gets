const isLogin = () => !!sessionStorage.getItem('token');

export default isLogin;