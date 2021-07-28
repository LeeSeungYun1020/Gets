import React, {useState} from "react"
import axios from "axios"
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import  { useHistory } from 'react-router-dom';

const GetsCheckbox = withStyles({
    root: {
        color: "#d4d3d3",
        '&$checked': {
            color: "#7eb693",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const RegisterBox = props => {
    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [passwordConfirm, SetPasswordConfirm] = useState("");
    const [phoneNumber, SetPhoneNumber] = useState("");
    const [year, SetYear] = useState("");
    const [month, SetMonth] = useState("");
    const [day, SetDay] = useState("");
    const [check_1, SetCheck_1] = useState(false);
    const [check_2, SetCheck_2] = useState(false);
    const [check_3, SetCheck_3] = useState(false);
    const [checkId, SetCheckId] = useState("");
    const [checkId_bool, SetCheckId_bool] = useState(false);
    const [checkPw, SetCheckPw] = useState("");

    const history = useHistory();

    const handleNameChange = event => {
        SetName(event.target.value);
    }

    const handleEmailChange = event => {
        SetEmail(event.target.value);
        let that = this;
        axios.post('http://localhost:3000/api/signup/check', {
            email: event.target.value
        })
            .then(function (response){
                console.log(response.data.result)
                if(response.data.result && event.target.value.indexOf('@') > 0 && event.target.value.indexOf('.') > 0) { // 중복되지않고 이메일 형식일때 사용 가능
                    SetCheckId("사용가능한 이메일입니다.");
                    SetCheckId_bool(true);
                }
                else if (!response.data.result) {
                    SetCheckId("중복되는 이메일입니다.");
                    SetCheckId_bool(false);
                }
                else {
                    SetCheckId("형식에 맞지 않은 이메일입니다.");
                    SetCheckId_bool(false);
                }
            })
            .catch(function (error) {
                console.log(error)
                console.log("사용불가능한 이메일입니다.")
            })
    }

    const handlePasswordChange = event => {
        SetPassword(event.target.value);
    }

    const handlePasswordConfirmChange = event => {
        SetPasswordConfirm(event.target.value);
        if(password === event.target.value){
            SetCheckPw("");
        }
        else {
            SetCheckPw("비밀번호가 일치하지 않습니다.");
        }
    }
    const handlePhoneNumberChange = event => {
        SetPhoneNumber(event.target.value);
    }
    const handleYearChange = event => {
        SetYear(event.target.value);
    }

    const handleMonthChange = event => {
        SetMonth(event.target.value);
    }

    const handleDayChange = event => {
        SetDay(event.target.value);
    }

    const handleCheck_1 = e => {
        if(e.target.checked) {
            SetCheck_1(true)
        }
        else {
            SetCheck_1(false)
        }
    }

    const handleCheck_2 = e => {
        if(e.target.checked) {
            SetCheck_2(true)
        }
        else {
            SetCheck_2(false)
        }
    }

    const handleCheck_3 = e => {
        if(e.target.checked) {
            SetCheck_3(true)
        }
        else {
            SetCheck_3(false)
        }
    }

    const handleInfo = e => {
        e.preventDefault();
        if(!checkId_bool){
            alert("사용가능한 이메일을 입력해주세요");
        }
        else if(password !== passwordConfirm){
            alert("비밀번호를 다시 확인해주세요")
        }
        else if (!check_1 || !check_2) {
            alert("필수 이용약관에 동의해주세요")
        }
        else {
            axios.post('http://localhost:3000/api/signup/basic', {
                email: email,
                pw: password,
                name: name,
                phone: phoneNumber,
                year: year,
                month: month,
                day: day
            })
            .then(function(response) {
                history.push("/account/signin")
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    }
    let registerForm
    registerForm = (
        <div id = "register_form">
            <form onSubmit={handleInfo}>
                <label>
                    <div className= "info">
                        <h4 className="essential">{props.essential}</h4>
                        <h4>{props.name}</h4>
                    </div>
                    <input type="text" name={"name"} value={name} placeholder={props.name} onChange={handleNameChange}
                           required/>
                </label>
                <label>
                    <div className= "info">
                        <h4 className="essential">{props.essential}</h4>
                        <h4>{props.email}</h4>
                    </div>
                    <input type="email" name={"email"} placeholder={props.input_email} value={email}
                           onChange={handleEmailChange} required/>
                    <span id = "checkId">{checkId}</span>
                </label>
                <label>
                    <div className= "info">
                        <h4 className="essential">{props.essential}</h4>
                        <h4>{props.password}</h4>
                    </div>
                    <input type="password" name={"password"} placeholder={props.input_pw} value={password}
                           onChange={handlePasswordChange} required/>
                    <input type="password" name={"passwordConfirm"} placeholder={props.input_pw_confirm} value={passwordConfirm}
                           onChange={handlePasswordConfirmChange} required/>
                    <span id = "checkPw">{checkPw}</span>
                </label>
                <label>
                    <div className= "info">
                        <h4 className="essential">{props.essential}</h4>
                        <h4>{props.phone}</h4>
                    </div>
                    <input type="number" name={"phone"} placeholder={props.enter_phone} value={phoneNumber}
                           onChange={handlePhoneNumberChange} required/>
                </label>
                <label>
                    <div className= "info">
                        <h4 className="essential">{props.essential}</h4>
                        <h4>{props.birthday}</h4>
                    </div>
                    <div id="input_birth">
                        <input type="number" name={"year"} placeholder={props.year} value={year}
                               onChange={handleYearChange} required/>
                        <input type="number" name={"month"} placeholder={props.month} value={month}
                               onChange={handleMonthChange} required/>
                        <input type="number" name={"day"} placeholder={props.day} value={day}
                               onChange={handleDayChange} required/>
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
                                    onChange = {handleCheck_1}
                                />
                            }
                            label={props.agree_1}
                        />
                    </div>
                    <div className="custom_checkbox">
                        <FormControlLabel
                            control={
                                <GetsCheckbox
                                    icon={<CheckBoxOutlineBlankIcon fontSize="big" />}
                                    checkedIcon={<CheckBoxIcon fontSize="big" />}
                                    name="check_2"
                                    onChange = {handleCheck_2}
                                />
                            }
                            label={props.agree_2}
                        />
                    </div>
                    <div className="custom_checkbox">
                        <FormControlLabel
                            control={
                                <GetsCheckbox
                                    icon={<CheckBoxOutlineBlankIcon fontSize="big" />}
                                    checkedIcon={<CheckBoxIcon fontSize="big" />}
                                    name="check_3"
                                    onChange = {handleCheck_3}
                                />
                            }
                            label={props.agree_3}
                        />
                    </div>
                </FormGroup>
                <input id = "register_submit" type="submit" value={props.register}/>
            </form>
        </div>
    )
    return (
        <div>
            {registerForm}
        </div>
    )
}

export default RegisterBox