import i18n from "i18next"
import detector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next"

import english from './translation.en'
import korean from './translation.ko'

const resource = {
    en: {
        translation: english
    },
    ko: {
        translation: korean
    }
};

i18n
    .use(detector)
    .use(initReactI18next)  // passes i18n down to react-i18next
    .init({
        resources: resource,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        debug: true,
    });

export default i18n;