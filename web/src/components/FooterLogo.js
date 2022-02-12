import logo from "../images/logo/logo_white.png";
import facebook_icon from "../images/footer/facebook_icon.webp"
import instagram_icon from "../images/footer/instagram_icon.webp"

function FooterLogo(props) {
    return (
        <>
            <div id="footer_top">
                <div id="footer_logo"><img src={logo}/></div>
                <div id="footer_icon">
                    <img src={instagram_icon}/>
                    <img src={facebook_icon}/>
                </div>
            </div>
        </>
    )
}

export default FooterLogo