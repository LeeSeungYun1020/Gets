import React from "react"
import axios from "axios"
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const GetsCheckbox = withStyles({
    root: {
        color: "#7eb693",
        '&$checked': {
            color: "#7eb693",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

class RegisterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            passwordConfirm : "",
            phoneNumber: "",
            year: "",
            month: "",
            day: "",
            check_1: false,
            check_2: false,
            check_3: false,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    }


    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handlePasswordConfirmChange(event) {
        this.setState({passwordConfirm: event.target.value});
    }

    handlePhoneNumberChange(event) {
        this.setState({phoneNumber: event.target.value});
    }

    render() {
        let registerForm
        registerForm = (
            <div id = "register_form">
                <form onSubmit={this.handleInfo}>
                    <label>
                        <div className= "info">
                            <h4 className="essential">{this.props.essential}</h4>
                            <h4>{this.props.name}</h4>
                        </div>
                        <input type="text" name={"name"} value={this.state.input_name} placeholder={this.props.name} onChange={this.handleNameChange}
                               required/>
                    </label>

                    <label>
                        <div className= "info">
                            <h4 className="essential">{this.props.essential}</h4>
                            <h4>{this.props.email}</h4>
                        </div>
                        <input type="email" name={"email"} placeholder={this.props.input_email} value={this.state.email}
                               onChange={this.handleEmailChange} required/>
                    </label>
                    <label>
                        <div className= "info">
                            <h4 className="essential">{this.props.essential}</h4>
                            <h4>{this.props.password}</h4>
                        </div>
                        <input type="password" name={"password"} placeholder={this.props.input_pw} value={this.state.password}
                               onChange={this.handlePasswordChange} required/>
                        <input type="password" name={"passwordConfirm"} placeholder={this.props.input_pw_confirm} value={this.state.passwordConfirm}
                               onChange={this.handlePasswordConfirmChange} required/>
                    </label>
                    <label>
                        <div className= "info">
                            <h4 className="essential">{this.props.essential}</h4>
                            <h4>{this.props.phone}</h4>
                        </div>
                        <input type="number" name={"phone"} placeholder={this.props.enter_phone} value={this.state.phoneNumber}
                               onChange={this.handlePhoneNumberChange} required/>
                    </label>
                    <div>
                        <div className= "info">
                            <h4 className="essential">{this.props.essential}</h4>
                            <h4>{this.props.birthday}</h4>
                        </div>
                    </div>

                    <div id = "agree_line"></div>
                    <FormGroup>
                        <div className="custom_checkbox">
                            <FormControlLabel
                                control={
                                    <GetsCheckbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="big" />}
                                        checkedIcon={<CheckBoxIcon fontSize="big" />}
                                        name="check_1"
                                    />
                                }
                                label={this.props.agree_1}
                            />
                        </div>
                        <div className="custom_checkbox">
                        <FormControlLabel
                                control={
                                    <GetsCheckbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="big" />}
                                        checkedIcon={<CheckBoxIcon fontSize="big" />}
                                        name="check_2"
                                    />
                                }
                                label={this.props.agree_2}
                            />
                        </div>
                        <div className="custom_checkbox">
                            <FormControlLabel
                                control={
                                    <GetsCheckbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="big" />}
                                        checkedIcon={<CheckBoxIcon fontSize="big" />}
                                        name="check_3"
                                    />
                                }
                                label={this.props.agree_3}
                            />
                        </div>
                    </FormGroup>
                    <input id = "register_submit" type="submit" value={this.props.register}/>
                </form>
            </div>
        )
        return (
            <div>
                {registerForm}
            </div>
        )
    }
}

export default RegisterBox