function SelectedItemImage(props) {
    return <img className="style_chip style_selected" src={props.image}/>
}

function DeselectedItemImage(props) {
    return <img className="style_chip style_deselected" src={props.image}/>
}

function HomeRecommendItem(props) {
    let itemImage = <DeselectedItemImage image={props.image}/>
    if (props.selected)
        itemImage = <SelectedItemImage image={props.image}/>
    return (
        <div>
            {itemImage}
            <div className="style_text">{props.text}</div>
        </div>
    )
}

export default HomeRecommendItem