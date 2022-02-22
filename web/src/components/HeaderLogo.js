import logo from '../images/logo/logo_white.png'
import {Link} from "react-router-dom";
import link from "../link";

function HeaderLogo() {
    return (
        <section id="logo">
            <Link to={link.home} rel="stylesheet"><img src={logo} height="50px"/></Link>
        </section>
    )
}

export default HeaderLogo