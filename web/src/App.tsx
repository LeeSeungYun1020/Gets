import React from 'react';
import './stylesheets/App.scss';
import {useTranslation} from 'react-i18next'
import Header from './components/Header.js'

function App() {
    const {t, i18n} = useTranslation()
    return (
        <div className="App">
            <Header/>
            <div>{t("test")}</div>
        </div>
    )
}

export default App;
