import React from "react"
import axios from "axios"
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import  { useHistory} from 'react-router';

const GetsCheckbox = withStyles({
    root: {
        color: "#d4d3d3",
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
            checkId: "",
            checkId_bool: false,
            checkPw:"",
        };

    }


    handleNameChange = event => {
        this.setState({name: event.target.value});
    }

    handleEmailChange = event => {
        this.setState({email: event.target.value});
        let that = this;
        axios.post('http://localhost:3000/api/signup/check', {
            email: event.target.value
        })
            .then(function (response){
                console.log(response.data.result)
                if(response.data.result && event.target.value.indexOf('@') > 0 && event.target.value.indexOf('.') > 0) { // 중복되지않고 이메일 형식일때 사용 가능
                    that.setState({checkId: "사용가능한 이메일입니다.", checkId_bool: true})
                }
                else if (!response.data.result) {
                    that.setState({checkId: "중복되는 이메일입니다.", checkId_bool: false})
                }
                else {
                    that.setState({checkId: "사용불가능한 이메일입니다.", checkId_bool: false})
                }
                })
            .catch(function (error) {
                console.log(error)
                console.log("사용불가능한 이메일입니다.")
            })
    }

    handlePasswordChange = event => {
        this.setState({password: event.target.value});
        console.log(event.target.value);
    }

    handlePasswordConfirmChange = event => {
        let timer;
        if (timer) {
            clearTimeout(timer);
        }
        this.setState({passwordConfirm: event.target.value});
        console.log(event.target.value);
        timer = setTimeout(() => {
            if (this.state.password !== this.state.passwordConfirm) {
                this.setState({checkPw: "비밀번호가 일치하지 않습니다."})
            } else {
                this.setState({checkPw: ""})
            }
        }, 500); // 일정시간이 지난 후 유효성 함수 내에서 비밀번호 확인
    }

    handlePhoneNumberChange = event => {
        this.setState({phoneNumber: event.target.value});
    }
    handleYearChange = event => {
        this.setState({year: event.target.value});
    }

    handleMonthChange = event => {
        this.setState({month: event.target.value});
    }

    handleDayChange = event => {
        this.setState({day: event.target.value});
    }

    handleInfo = () => {
        if(this.state.password !== this.state.passwordConfirm){
            return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
        }
        if(!this.state.checkId_bool){
            return alert("사용가능한 이메일을 입력해주세요");
        }
        axios.post('http://localhost:3000/api/signup/basic', {
            email: this.state.email,
            pw: this.state.password,
            name: this.state.name,
            phone: this.state.phoneNumber,
            year: this.state.year,
            month: this.state.month,
            day: this.state.day
        })
            .then(function(response) {
                document.location.href = '/account/signin'
                console.log(response);
            })
            .catch(function (error) {

                console.log(error)
            })
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
                        <span id = "checkId">{this.state.checkId}</span>
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
                        <span id = "checkPw">{this.state.checkPw}</span>
                    </label>
                    <label>
                        <div className= "info">
                            <h4 className="essential">{this.props.essential}</h4>
                            <h4>{this.props.phone}</h4>
                        </div>
                        <input type="number" name={"phone"} placeholder={this.props.enter_phone} value={this.state.phoneNumber}
                               onChange={this.handlePhoneNumberChange} required/>
                    </label>
                    <label>
                        <div className= "info">
                            <h4 className="essential">{this.props.essential}</h4>
                            <h4>{this.props.birthday}</h4>
                        </div>
                        <div id="input_birth">
                            <input type="number" name={"year"} placeholder={this.props.year} value={this.state.year}
                                   onChange={this.handleYearChange} required/>
                            <input type="number" name={"month"} placeholder={this.props.month} value={this.state.month}
                                   onChange={this.handleMonthChange} required/>
                            <input type="number" name={"day"} placeholder={this.props.day} value={this.state.day}
                                   onChange={this.handleDayChange} required/>
                        </div>
                    </label>

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