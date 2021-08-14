import React from "react"
import axios from "axios"
import link from "../../link";
import {Link} from "react-router-dom"
class FindPwEmailBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleEmail = this.handleEmail.bind(this);

    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleEmail(event) {
        alert(`email=${this.state.email}`)
        axios.post('http://localhost:3000/api/signin', {
            email: this.state.email
        })
    }

    render() {
        let FindForm = (
            <div id="find_pw_email_form">
                <form onSubmit={this.handleEmail}>
                    <label>
                        <input type="email" name={"email"} value={this.state.email} placeholder={this.props.enter_email}
                               onChange={this.handleEmailChange}
                               required/>
                    </label>
                    <input id="submit" type="submit" value={this.props.enter}/>
                </form>
            </div>
        )

        return (
            <div>

                <div id = "select_type_info">
                    <h3><Link className = "pw_link" to = {link.findpw}>{this.props.find_with_phone}</Link></h3>
                    <h3 style = {{borderColor : "#000000"}}><Link className = "pw_link" to = {link.findpwemail}>{this.props.find_with_email}</Link></h3>
                </div>
                <div>
                    {FindForm}
                </div>
                <div id = "select_info_line"></div>
                <div id = "select_info_text">
                    <div id = "select_info_text_h4">
                        <h4 id = "text_top">{this.props.pw_info_1}</h4>
                        <h4>{this.props.pw_info_2}</h4>
                        <h4 id = "text_bottom">{this.props.pw_info_3}</h4>
                    </div>
                    <p>{this.props.pw_info_4}</p>
                    <p>{this.props.pw_info_5}</p>
                </div>
            </div>
        )
    }
}

export default FindPwEmailBox