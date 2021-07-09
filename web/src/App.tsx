import React from 'react';
import './stylesheets/App.scss';
import {useTranslation} from 'react-i18next'
import Header from './components/Header.js'
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
    const {t, i18n} = useTranslation()
    return (
        <div className="App">
            <Header/>
            <Home/>
            <Footer/>
        </div>
    )
}

export default App;
