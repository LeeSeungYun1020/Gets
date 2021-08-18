import HeaderTab from './HeaderTab'
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import {useHistory} from "react-router-dom"
function Header() {
    const history = useHistory()
    return (
        <header>
            {/* 로고 */}
            <HeaderLogo/>
            {/* 탭 */}
            <HeaderTab/>
            {/* 메뉴 */}
            <HeaderMenu/>
        </header>
    )
}

export default Header