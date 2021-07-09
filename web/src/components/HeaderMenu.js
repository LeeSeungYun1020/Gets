import link from '../link'
import cartIcon from "../images/header/cart.png"
import infoIcon from "../images/header/my_page.png"
import signinIcon from "../images/header/log_in.png"

function HeaderMenu() {
    return (
        <div id="top_menu">
            <a href={link.cart}><img src={cartIcon}/></a>
            <a href={link.info}><img src={infoIcon}/></a>
            <a href={link.signin}><img src={signinIcon}/></a>
        </div>
    )
}

export default HeaderMenu