import link from '../link'
import { NavLink } from 'react-router-dom';

function HeaderTab() {
    return (
        <nav>
            <ul>
                <NavLink exact to={link.home} className="tab" activeClassName="active" ><a id="tab_home" href={link.home}>Home</a></NavLink>
                <NavLink to={link.closet} className="tab" activeClassName="active"><a id="tab_closet" href={link.closet}>Closet</a></NavLink>
                <NavLink to={link.product} className="tab" activeClassName="active"><a id="tab_product" href={link.product}>Product</a></NavLink>
                <NavLink to={link.article} className="tab" activeClassName="active"><a id="tab_article" href={link.article}>Article</a></NavLink>
            </ul>
        </nav>
    )
}

export default HeaderTab