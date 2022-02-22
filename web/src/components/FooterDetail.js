import FooterDetailItem from "./FooterDetailItem";

function FooterDetail(props) {
    const detailList = props.list.map((item) => <FooterDetailItem key={item.title.toString()} title={item.title}
                                                                  link={item.link}/>)
    return (<div className="detail_component">
        <span className="footer_title">{props.title}</span>
        <div className="footer_category">
            {detailList}
        </div>
    </div>)
}

export default FooterDetail