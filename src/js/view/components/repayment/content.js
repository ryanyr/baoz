import url from "../../config/config";
import {Toast} from "antd-mobile";
import {hashHistory} from "react-router";
import store from "../../../store/store";
export default React.createClass({
    getInitialState(){
        return {
            ceateTime:"",
            repayTime:"",
            createTime:""
        }
    },
    btn(){
        console.log(1)
        var data=new FormData();//还款
        data.append("orderId",this.state.orderId);
        data.append("userId",localStorage.userId);
        fetch(url.url+"/api/act/pay/repayment/repay.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
              console.log(data); 
              switch(data.code){
                case 408:    Toast.info('系统响应超时', 1);
                                break;
                case 410:    Toast.info('用户信息过期，请重新登录', 1);
                                hashHistory.push("login");
                                break;
                case 411:    Toast.info('用户已在其他设备登录，请重新登录', 1);
                                hashHistory.push("login");
                                break;
                case 500:    Toast.info('服务器错误', 1);
                                break;
                case 150004:    Toast.info('您已还款成功', 1);
                                // sessionStorage.info=3;
                                store.dispatch({
                                    type:"INFO",
                                    data:3
                                })
                                hashHistory.push("loan")
                                break;
                case 150005:    Toast.info('还款失败，请稍后再次尝试', 1);
                                break;
                case 150006:    Toast.info('还款服务超时，请稍后再次尝试', 1);
                                break;
                default:        break;
                }                     
            })
    },
    componentWillMount(){
        console.log(1)
        var orderNo=this.props.orderNo;
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
      
        data.append("orderNo",orderNo);

        fetch(url.url+"/api/act/mine/borrow/orderInfo.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
            console.log(data)   
             switch(data.code){
                case 408:    Toast.info('系统响应超时', 1);
                                break;
                case 410:    Toast.info('用户信息过期，请重新登录', 1);
                                hashHistory.push("login");
                                break;
                case 411:    Toast.info('用户已在其他设备登录，请重新登录', 1);
                                hashHistory.push("login");
                                break;
                case 500:    Toast.info('服务器错误', 1);
                                break;
                case 150001:    Toast.info('获取订单详情服务超时', 1);
                                break;
                case 150003:    Toast.info('获取订单详情服务失败，请稍后再次尝试', 1);
                                break;
                default:        break;
                }     
            that.setState(data.data)
                
            }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });
    },
    render(){
        return (
            <div className="already-box">
            <div className="already-tops" style={{background:"url(images/images/repay-bg.png)",backgroundSize:"100%"}}>
                {/* <div className="already-head">还款完成时间 11</div> */}
                <div className="already-min1">已减免{this.state.amount<=1000?20:this.state.remitAmount}元</div>
                <div className="already-min2"><span className="already-min2a">{this.state.repayAmount}.</span><span className="already-min2b">00</span></div>
                <div className="already-min3">应还金额（元）</div>
                <div className="already-list">
                    <div className="already-list1">
                        <div className="already-list1a">
                            <div className="already-list1a1">{this.state.amount}<span className="already-list1a1a">.00元</span></div>
                            <div className="already-list1a2">借款金额</div>
                        </div>
                        <div className="already-list1b">
                            <div className="already-list1b1"></div>
                        </div>
                        <div className="already-list1c">
                            <div className="already-list1a1">{this.state.realAmount}<span className="already-list1a1a">.00元</span></div>
                            <div className="already-list1a2">实际到账（元）</div>
                        </div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">借款类别</div>
                        <div className="already-list2b">{this.state.borrowType}</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">服务费用</div>
                        <div className="already-list2b">{this.state.serviceFee}.00元</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">利息费用</div>
                        <div className="already-list2b">{this.state.interest}.00元</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">借款期限</div>
                        <div className="already-list2b">{this.state.timeLimit}天</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">应还日期</div>
                        <div className="already-list2b">{this.state.repayTime.split(" ")[0]}</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">申请时间</div>
                        <div className="already-list2b">{this.state.createTime.split(" ")[0]}</div>
                    </div>
                    <div className="already-list2">
                        <div className="already-list2a">收款卡号</div>
                        <div className="already-list2b">{this.state.cardNo}</div>
                    </div>
                    <div className="already-list3" onClick={this.btn}>还款</div>
                </div>
            </div>
        </div>
            // <div className="con_box">
            //     <div className="content">
            //         <img className="title"  src="images/images/bg_1.jpg" />
            //         <div className="top">
            //             <i
            //                 style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>借款类别：{this.state.borrowType}</span>
            //         </div>
            //         <div>
            //             <i
            //                 style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>借款金额：{this.state.amount}.00元</span>
            //         </div>
            //         <div>
            //             <i
            //                 style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>实际到账：{this.state.realAmount}.00元</span>
            //         </div>
            //         <div>
            //             <i
            //                 style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>服务费用：{this.state.serviceFee}.00元</span>
            //         </div>
            //         <div>
            //             <i
            //                 style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>利息费用：{this.state.interest}.00元</span>
            //         </div>
            //         <div>
            //             <i
            //                 style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>延期费用：{this.state.extensionAmount}.00元</span>
            //         </div>
            //         <div>
            //             <i
            //                 style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>借款期限：{this.state.timeLimit}天</span>
            //         </div>
            //         <div>
            //             <i
            //                 style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>申请时间：{this.state.createTime.split(" ")[0]}</span>
            //         </div>
            //         <div>
            //             <i
            //                 style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>收款卡号：{this.state.cardNo}</span>
            //         </div>
            //         <div className="yellow"
            //             style={{marginTop:"0.4rem"}}
            //         >
            //             <i
            //                 style={{background:"url(images/images/circle_1.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>优惠减免：{this.state.amount<=1000?20:this.state.remitAmount}.00元</span>
            //         </div>
            //         <div className="yellow">
            //             <i
            //                 style={{background:"url(images/images/circle_1.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>应还金额：{this.state.repayAmount}.00元</span>
            //         </div>
            //         <div className="yellow">
            //             <i
            //                 style={{background:"url(images/images/circle_1.jpg)",backgroundSize:"100%"}}
            //             ></i>
            //             <span>应还日期：{this.state.repayTime.split(" ")[0]}</span>
            //         </div>
                    
            //     </div>
            //     <div className="btn_box">
            //             <button onClick={this.btn}>还款</button>
            //     </div>
            // </div>
        )
    }
})