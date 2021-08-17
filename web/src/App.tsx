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
import Home from "./components/home/Home";
import link from "./link";
import SignIn from "./components/login/SignIn";
import AfterRegister from "./components/AfterRegister";
import DetailInfo from "./components/login/DetailInfo";
import FindId from "./components/login/FindId";
import FindPw from "./components/login/FindPw";
import FindPwEmail from "./components/login/FindPwEmail";
import Register from "./components/login/Register";
import NotFound from "./components/NotFound";
import Product from "./components/product/Product";
import Closet from "./components/closet/Closet";
import DetailInfoPage from "./components/closet/DetailInfoPage";
import ScrollToTop from "./components/ScrollToTop";
import PublicRoute from "./lib/PublicRoute";
import PrivateRoute from "./lib/PrivateRoute";
export default function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <ScrollToTop />
                <Switch>
                    {/*publicRoute : 권한없으면 못들어감 restricted가 있으면 로그인했을때 못들어감 없으면 그냥 다 들어갈 수 있음 홈으로 리다이렉트 */}
                    {/*privateRoute : 로그인 안했을 때 못들어감*/}
                    <PublicRoute restricted = {false} component = {Home} exact path={link.home} />
                    <PrivateRoute component={Closet} exact path={link.closet}/>
                    <PrivateRoute component={Closet} exact path={link.defaultcloset} />
                    <PublicRoute restricted = {false} component = {Product} exact path={link.product} />
                    <PublicRoute restricted = {false} component= {Product} exact path={link.defaultproduct} />
                    <PublicRoute restricted path = {link.detailcoordination} component = {DetailInfoPage} />
                    <PublicRoute restricted component = {SignIn} path={link.signin} />
                    <PublicRoute restricted component={FindId} path={link.findid} />
                    <PublicRoute restricted component={FindPw} path={link.findpw} />
                    <PublicRoute restricted component={FindPwEmail} path = {link.findpwemail} />
                    <PublicRoute restricted component={Register} path={link.register} />
                    <PrivateRoute component={AfterRegister} path={link.afterregister} />
                    <PrivateRoute component = {DetailInfo} path={link.detailinfo} />
                    <PrivateRoute component = {'#'} path={link.info}></PrivateRoute>
                    {/*<Route path={link.info}>*/}
                    {/*    <h1>구현 예정 - 내 정보</h1>*/}
                    {/*</Route>*/}
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