import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
const SignInBox = (props) => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const history = useHistory();

    const handleEmailChange = (event) => {
        SetEmail(event.target.value);
    }
    const handlePasswordChange = (event) => SetPassword(event.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/signin', {
            email: email,
            pw: password
        })
            .then( response => {
                if (response.data.result) {
                    console.log(history.goBack());
                }
                else {
                    alert("이메일과 비밀번호를 확인해주세요.")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    let signForm
        signForm = (
            <div id = "sign_form">
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="email" name={"email"} value={email} placeholder={props.input_id} onChange={handleEmailChange}
                               required/>
                    </label>

                    <label>
                        <input type="password" name={"password"} placeholder={props.input_pw} value={password}
                               onChange={handlePasswordChange} required/>
                    </label>
                    <input id = "submit" type="submit" value={props.login} />
                </form>
            </div>
        )
    return (
        <div>
            {signForm}
        </div>
    )
}

export default SignInBox