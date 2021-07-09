import React from "react";
import SignInBox from "./SignInBox";
import {useTranslation} from "react-i18next";

function SignIn() {
    const {t, i18n} = useTranslation()

    return (
        <SignInBox email={t("email")} password={t("password")} left={t("previous")} right={t("next")}/>
    )
}

export default SignIn