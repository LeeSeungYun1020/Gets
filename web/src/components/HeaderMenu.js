import link from '../link'
import cartIcon from "../images/header/cart.webp"
import infoIcon from "../images/header/my_page.webp"
import signinIcon from "../images/header/log_in.webp"
import logoutIcon from "../images/header/log_out.webp"

function HeaderMenu() {
    return (
        <div id="top_menu">
            <a href={link.cart}><img src={cartIcon}/><p>cart</p></a>
            {localStorage.getItem("token") ?
                <a href={link.info}><img src={infoIcon}/><p>my page</p></a>:
                <a href={link.signin}><img src={infoIcon}/><p>my page</p></a>
            }

            {localStorage.getItem("token") ? //토큰이 있으면 로그아웃 화면 보여줌
                <a href={link.logout}><img src={logoutIcon}/><p>log out</p></a> :
                <a href={link.signin}><img src={signinIcon}/><p>log in</p></a>
                }

        </div>
    )
}

export default HeaderMenu