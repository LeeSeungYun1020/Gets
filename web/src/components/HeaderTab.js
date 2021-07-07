import link from '../link'

function HeaderTab() {
    return (
        <nav>
            <ul>
                <li><a id="tab_home" href={link.home}>Home</a></li>
                <li><a id="tab_closet" href={link.closet}>Closet</a></li>
                <li><a id="tab_product" href={link.product}>Product</a></li>
                <li><a id="tab_article" href={link.article}>Article</a></li>
            </ul>
        </nav>
    )
}

export default HeaderTab