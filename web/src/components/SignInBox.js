import React from "react";

class SignInBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", type: "email"};

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmailPrevious = this.handleEmailPrevious.bind(this);
        this.handlePasswordPrevious = this.handlePasswordPrevious.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleEmail(event) {
        alert('Email: ' + this.state.email)
        this.setState({type: "password"})
        event.preventDefault()
    }

    handlePassword(event) {
        alert(`email=${this.state.email}, password=${this.state.password}`)
        event.preventDefault();
    }

    handleEmailPrevious(event) {
        // TODO 뒤로 가기
        event.preventDefault()
    }

    handlePasswordPrevious(event) {
        this.setState({type: "email", password: "em"})
        event.preventDefault();
    }

    render() {
        let signForm
        if (this.state.type === "email") {
            signForm = (
                <form onSubmit={this.handleEmail}>
                    <label>
                        {this.props.email}
                        <input type="email" name={"email"} value={this.state.email} onChange={this.handleEmailChange}
                               required/>
                    </label>
                    <input type="button" value={this.props.left} onClick={this.handleEmailPrevious}/>
                    <input type="submit" value={this.props.right}/>
                </form>
            )
        } else {
            signForm = (
                <form onSubmit={this.handlePassword}>
                    <label>
                        {this.props.password}
                        <input type="password" name={"password"} value={this.state.password}
                               onChange={this.handlePasswordChange} required/>
                    </label>
                    <input type="button" value={this.props.left} onClick={this.handlePasswordPrevious}/>
                    <input type="submit" value={this.props.right}/>
                </form>
            )
        }

        return (
            <div>
                <h1>{this.props.title}</h1>
                {signForm}
            </div>
        )
    }


}

export default SignInBox