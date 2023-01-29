import React from "react"
import axios from "axios"
import link from "../../link"

class SignInBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phoneNumber: ""
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        // this.handleName = this.handleName.bind(this);
        this.handleInfo = this.handleInfo.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handlePhoneNumberChange(event) {
        this.setState({phoneNumber: event.target.value});
    }

    handleInfo(event) {
        alert(`name=${this.state.name}, phoneNumber=${this.state.phoneNumber}`)
        axios.post(link.base + '/api/signin', {
            name: this.state.name,
            phone: this.state.phoneNumber
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let FindForm
        FindForm = (
            <div id="find_id_form">
                <form onSubmit={this.handleInfo}>
                    <label>
                        <input type="text" name={"name"} value={this.state.name} placeholder={this.props.name}
                               onChange={this.handleNameChange}
                               required/>
                    </label>

                    <label>
                        <input type="number" name={"phoneNumber"} placeholder={this.props.enter_phone}
                               value={this.state.phoneNumber}
                               onChange={this.handlePhoneNumberChange} required/>
                        {/*<button type ="submit">{this.props.request}</button>*/}
                    </label>
                    <input id="submit" type="submit" value={this.props.enter}/>
                </form>
            </div>
        )
        return (
            <div>
                {FindForm}
            </div>
        )
    }
}

export default SignInBox