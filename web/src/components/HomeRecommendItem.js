function SelectedItem(props) {
    return (
        <div>
            <img className="style_chip style_selected" src={props.image}/>
            <div className="style_selected_text">{props.text}</div>
        </div>
    )
}

function DeselectedItem(props) {
    return (
        <div>
            <img className="style_chip style_deselected" src={props.image}/>
            <div className="style_deselected_text">{props.text}</div>
        </div>
    )
}

function HomeRecommendItem(props) {
    let item = <DeselectedItem image={props.image} text={props.text}/>
    if (props.selected)
        item = <SelectedItem image={props.image} text={props.text}/>
    return (
        <div>
            {item}
        </div>
    )
}

export default HomeRecommendItem