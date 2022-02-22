import link from '../link'
import {NavLink} from 'react-router-dom';

function HeaderTab() {
    return (
        <nav>
            <ul>
                <NavLink exact to={link.home} className="tab" activeClassName="active">Home</NavLink>
                <NavLink to={link.defaultcloset} className="tab" activeClassName="active">Closet</NavLink>
                <NavLink to={link.defaultproduct} className="tab" activeClassName="active">Product</NavLink>
                <NavLink to={link.article} className="tab" activeClassName="active">Style</NavLink>
            </ul>
        </nav>
    )
}

export default HeaderTab