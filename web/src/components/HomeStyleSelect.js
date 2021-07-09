import HomeStyleSelectBox from "./HomeStyleSelectBox";

function HomeStyleSelect(props) {
    const selectAreaList = props.list.map((item) =>
        <HomeStyleSelectBox title={item.title} index={item.index} default={item.default} list={item.list}/>
    )

    return (
        <div id="my_style">
            <h1>{props.title}</h1>
            <div id="style_select">
                {selectAreaList}
            </div>
        </div>
    )
}

export default HomeStyleSelect