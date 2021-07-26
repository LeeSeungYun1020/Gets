import React from "react"
import axios from "axios"

class SignInBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
    }
    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    handleInfo = () => {
        let that = this;
        axios.post('http://localhost:3000/api/signin', {
            email: this.state.email,
            pw: this.state.password
        })
            .then(function (response) {
                document.location.href = '/'
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let signForm
        signForm = (
            <div id = "sign_form">
                <form onSubmit={this.handleInfo}>
                    <label>
                        <input type="email" name={"email"} value={this.state.email} placeholder={this.props.input_id} onChange={this.handleEmailChange}
                               required/>
                    </label>

                    <label>
                        <input type="password" name={"password"} placeholder={this.props.input_pw} value={this.state.password}
                               onChange={this.handlePasswordChange} required/>
                    </label>
                    <input id = "submit" type="submit" value={this.props.login}/>
                </form>
            </div>
        )
        return (
            <div>
                {signForm}
            </div>
        )
    }
}

export default SignInBox