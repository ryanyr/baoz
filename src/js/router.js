import {Router,Route,hashHistory,IndexRedirect,browserHistory,IndexRoute} from "react-router";
import Rou from "./view/router/router";//跟路由
import Home from "./view/router/home/homeRouter";//首页
import My from "./view/router/my/myRouter";//我的
import Login from "./view/router/login/loginRouter";//登录
import Merchants from "./view/router/merchants/merchantsRouter";//商户名
import Qr from "./view/router/qr/qrcodeRouter";//二维码
import Information from "./view/router/information/informationRouter";//完善个人信息
import Perfect from "./view/router/prefect/perfectRouter";//已完善个人信息
import Loan from "./view/router/loan/loanRouter";//借款信息
import Repayment from "./view/router/repayment/repaymentRouter";//还款
import Already from "./view/router/already/alreadyrepayRouter";//已还款
import About from "./view/router/about/aboutRouter";//关于我们
import Card from "./view/router/creditcard/creditcard";//信用卡代还
import Withdraw from "./view/router/withdraw/withdrawRouter";//立即提现
import Coupon from "./view/router/coupon/couponRouter";//优惠券
import Usecoupon from "./view/router/usecoupon/usecouponRouter";//如何使用优惠券
import Meloan from "./view/router/meloan/merchantsRouter";//我要贷款
import Memoney from "./view/router/memoney/somewordRouter";//我要赚钱
import Gvrp from "./view/router/gvrp/gvrpRouter";//注册协议
import Getcoupon from "./view/router/getcoupon/getcouponRouter";//获得优惠券
import Waitcoupon from "./view/router/waitcoupon/waitcouponRouter";//申请授信提交成功
import Believe from "./view/router/believe/believeRouter";//授信协议
import Tcsuccess from "./view/router/tcsuccess/tcRouter";//提交成功
import Txing from "./view/router/txing/txingRouter";//审核中
import Bzhome from "./view/router/bzhome/bzhomeRouter";//保赚首页
import Loginsuccess from "./view/router/loginsuccess/loginsuccessRouter";//登录成功
import Loanlist from "./view/router/loanlist/loanlist";//我要贷款信息列表
import Makemoney from "./view/router/makemoneylist/makemoneylist";//我要赚钱信息列表
import Sqcg from "./view/router/sqcg/sqcgRouter";//申请成功
import Sqsb from "./view/router/sqsb/sqsbRouter";//授信失败
import Pmh from "./view/router/pmh/pmhRouter";//信用卡还款
import Ddd from "./view/router/ddd/dd"
export default React.createClass({
    enterMy(){
        // window.scrollTo(0,0)
    },
    render:function(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Rou}>
                    <IndexRedirect to="home"/>                   
                    <Route path="home" component={Home} />
                    <Route path="my" component={My} onEnter={this.enterMy} />
                    <Route path="login" component={Login} />
                    <Route path="merchants" component={Merchants} />
                    <Route path="qr" component={Qr} />
                    <Route path="information" component={Information} />
                    <Route path="perfect" component={Perfect} />
                    <Route path="loan" component={Loan} />
                    <Route path="repayment" component={Repayment} />
                    <Route path="already" component={Already} />
                    <Route path="about" component={About} />
                    <Route path="withdraw" component={Withdraw} />
               		<Route path="coupon" component={Coupon} />
                    <Route path="meloan" component={Meloan} />
                    <Route path="memoney" component={Memoney} />
                    <Route path="gvrp" component={Gvrp} />
                    <Route path="getcoupon" component={Getcoupon} />
                    <Route path="waitcoupon" component={Waitcoupon} />
                    <Route path="believe" component={Believe} />
                    <Route path="tcsuccess" component={Tcsuccess} />
                    <Route path="txing" component={Txing} />
                    <Route path="bzhome" component={Bzhome} />
                    <Route path="loginsuccess" component={Loginsuccess} />
                    <Route path="card" component={Card} />
                    <Route path="loanlist" component={Loanlist} />
                    <Route path="makemoney" component={Makemoney} />
                    <Route path="sqcg" component={Sqcg} />
                    <Route path="sqsb" component={Sqsb} />
                    <Route path="pmh" component={Pmh} />
                    <Route path="sqsb" component={Sqsb} />
                    <Route path="pmh" component={Pmh} />
                    <Route path="loanlist" component={Loanlist} />
                    <Route path="makemoney" component={Makemoney} />                   
                    <Route path="ddd" component={Ddd} />
                    <Route path="usecoupon" component={Usecoupon} />                     
                </Route>
            </Router>
        )
    }
})