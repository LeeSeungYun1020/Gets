function HomeStyleSelectBox(props) {
    const items = props.list.map((text) =>
        <li>{text}</li>
    )

    const wrapperID = "select-wrap" + props.index
    const selectID = "select" + props.index
    return (
        <div id="select_area">
            <div className="select_box">
                <h2>{props.title}</h2>
                <div id={wrapperID} className="select-wrap">
                    <div id={selectID} className="select">
                        {props.default}
                    </div>
                    <ul id="ul" className="select-ul">
                        <div>
                            {items}
                        </div>
                    </ul>
                </div>
            </div>
            <div className="line"></div>
        </div>
    )
}

export default HomeStyleSelectBox