import {useTranslation} from 'react-i18next'
import FooterDetail from "./FooterDetail";
import link from "../link";
import FooterLogo from "./FooterLogo";

function Footer(props) {
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
                </div>
            </div>

        </footer>

    )
}

export default Footer