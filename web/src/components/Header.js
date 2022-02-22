import HeaderTab from './HeaderTab'
import HeaderLogo from "./HeaderLogo";
import HeaderContainer from "./HeaderContainer";

function Header({login, setLogin}) {
    return (
        <header>
            {/* 로고 */}
            <HeaderLogo/>
            {/* 탭 */}
            <HeaderTab/>
            {/* 메뉴 */}
            <HeaderContainer/>
        </header>
    )
}

export default Header