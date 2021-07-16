const FooterAddress = props => {
    return (
        <div id = "footer_address">
            <div>{props.phoneNumber}</div>
            <div>{props.address}</div>
        </div>
    )
}

export default FooterAddress;