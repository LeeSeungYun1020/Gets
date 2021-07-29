import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './stylesheets/App.scss';
import Header from './components/Header.js'
import Footer from "./components/Footer";
import Home from "./components/Home";
import link from "./link";
import SignIn from "./components/SignIn";
import FindId from "./components/FindId";
import FindPw from "./components/FindPw";
import FindPwEmail from "./components/FindPwEmail";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

export default function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path={link.home}>
                        <Home />
                    </Route>
                    <Route path={link.closet}>
                        <h1>구현 예정 - 옷장</h1>
                    </Route>
                    <Route path={link.product}>
                        <h1>구현 예정 - 제품</h1>
                    </Route>
                    <Route path={link.signin}>
                        <SignIn />
                    </Route>
                    <Route path={link.logout}>
                        <h1>구현하기 전까지 못나감ㅋㅋ</h1>
                    </Route>
                    <Route path={link.findid}>
                        <FindId />
                    </Route>
                    <Route path={link.findpw}>
                        <FindPw />
                    </Route>
                    <Route path={link.findpwemail}>
                        <FindPwEmail />
                    </Route>
                    <Route path={link.register}>
                        <Register />
                    </Route>
                    <Route path={link.signup}>
                        <h1>구현 예정 - 회원 가입</h1>
                    </Route>
                    <Route path={link.info}>
                        <h1>구현 예정 - 내 정보</h1>
                    </Route>
                    <Route path={link.style}>
                        <h1>구현 예정 - 내 스타일</h1>
                    </Route>
                    <Route path={link.order}>
                        <h1>구현 예정 - 주문 내역</h1>
                    </Route>
                    <Route path={link.feedback}>
                        <h1>구현 예정 - 피드백</h1>
                    </Route>
                    <Route path={link.cart}>
                        <h1>구현 예정 - 장바구니</h1>
                    </Route>
                    <Route path={link.article}>
                        <h1>구현 예정 - 기사</h1>
                    </Route>
                    <Route path={link.faq}>
                        <h1>구현 예정 - 자주 묻는 질문</h1>
                    </Route>
                    <Route path={link.chatting}>
                        <h1>구현 예정 - 상담 내역</h1>
                    </Route>
                    <Route path={link.privacy}>
                        <h1>구현 예정 - 개인정보처리방침</h1>
                    </Route>
                    <Route path={link.terms}>
                        <h1>구현 예정 - 약관</h1>
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
                <Footer />
            </div>
        </Router>
    )
}