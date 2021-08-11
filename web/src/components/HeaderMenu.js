import link from '../link'
import cartIcon from "../images/header/cart.webp"
import infoIcon from "../images/header/my_page.webp"
import signinIcon from "../images/header/log_in.webp"
import logoutIcon from "../images/header/log_out.webp"
import axios from "axios";
import {Link} from 'react-router-dom';
import {useEffect, useState} from "react";
function HeaderMenu() {
    const [login, setLogin] = useState(false)
    useEffect(() => {
        if(sessionStorage.getItem("token")) {
            setLogin(true);
        }
    }, [login])
    return (
        <div id="top_menu">
            <Link to = {link.cart}><img src={cartIcon}/><p>cart</p></Link>
            <Link to = {link.info}><img src={infoIcon}/><p>my page</p></Link>

            {login ? //토큰이 있으면 로그아웃 화면 보여줌
                <Link to={link.home}><img onClick={() => {
                    axios.get('http://localhost:3000/auth/signout', {withCredentials: true})
                        .then(function (response) {
                            if(response.data.result) {
                                sessionStorage.clear();
                                setLogin(false);
                            }
                        })
                }} src={logoutIcon}/><p>log out</p></Link> :
                <Link to={link.signin}><img src={signinIcon}/><p>log in</p></Link>
            }

        </div>
    )
};

export default HeaderMenu