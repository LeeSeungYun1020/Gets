import {useTranslation} from 'react-i18next'
import FooterDetail from "./FooterDetail";
import link from "../link";
import FooterLogo from "./FooterLogo";
import { makeStyles } from '@material-ui/core/styles';
import i18next from 'i18next';
import React from "react";
import { Select, Box, Grommet } from 'grommet';
import { CaretDownFill } from 'grommet-icons';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}));

function changeLang(lang) {
    i18next.changeLanguage(lang);
}

function Footer(props) {
    const options = [
        { label: '한국어', value: 'ko' },
        { label: 'English', value: 'en'}
    ];
    const {t, i18n} = useTranslation()
    return (
        <footer id="main_footer">
            < FooterLogo/>
            <div id="footer_layout">
                <div id="detail">
                    <FooterDetail
                        title={t("about_title")}
                        list={[{title: t("about_company"), link: link.about}]}/>
                    <FooterDetail
                        title={t("feedback_title")}
                        list={[
                            {title: t("feedback_faq"), link: link.faq},
                            {title: t("feedback_chatting"), link: link.chatting},
                        ]}/>
                    <FooterDetail
                        title={t("policy_title")}
                        list={[
                            {title: t("policy_privacy"), link: link.privacy},
                            {title: t("policy_terms"), link: link.terms},
                        ]}/>
                    <FooterDetail
                        title={t("account_title")}
                        list={[
                            {title: t("account_mypage"), link: link.info},
                            {title: t("account_mystyle"), link: link.style},
                            {title: t("account_order"), link: link.order},
                        ]}/>
                    <Select
                        options={options}
                        placeholder={t("korean")}
                        labelKey='label'
                        valueKey='value'
                        onChange={({ option }) => {
                            changeLang(option.value);
                        }}
                        alignSelf='start'
                        style={{
                            width: '8vw',
                        }}
                        icon={
                            <Box>
                                <CaretDownFill size="medium" color="#d4d3d3" />
                            </Box>
                        }
                    ></Select>
                </div>
            </div>

        </footer>

    )
}

export default Footer