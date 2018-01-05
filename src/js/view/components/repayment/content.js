import url from "../../config/config";



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
        data.append("repayAmount",this.state.repayAmount);
        data.append("userId",localStorage.userId);
        fetch(url.url+"/api/act/pay/repayment/repay.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
              console.log(data); 
            //   var data = data.data;
                                
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
            that.setState(data.data)
                
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    render(){
        return (
            <div className="con_box">
                <div className="content">
                    <img className="title"  src="images/images/bg_1.jpg" />
                    <div className="top">
                        <i
                            style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
                        ></i>
                        <span>借款类别：{this.state.borrowType}</span>
                    </div>
                    <div>
                        <i
                            style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
                        ></i>
                        <span>借款金额：{this.state.amount}.00元</span>
                    </div>
                    <div>
                        <i
                            style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
                        ></i>
                        <span>实际到账：{this.state.realAmount}.00元</span>
                    </div>
                    <div>
                        <i
                            style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
                        ></i>
                        <span>服务费用：{this.state.serviceFee}.00元</span>
                    </div>
                    <div>
                        <i
                            style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
                        ></i>
                        <span>借款期限：{this.state.timeLimit}天</span>
                    </div>
                    <div>
                        <i
                            style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
                        ></i>
                        <span>申请时间：{this.state.createTime.split(" ")[0]}</span>
                    </div>
                    <div>
                        <i
                            style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}}
                        ></i>
                        <span>收款卡号：{this.state.cardNo}</span>
                    </div>
                    <div className="yellow"
                        style={{marginTop:"0.4rem"}}
                    >
                        <i
                            style={{background:"url(images/images/circle_1.jpg)",backgroundSize:"100%"}}
                        ></i>
                        <span>优惠减免：{this.state.remitAmount}.00元</span>
                    </div>
                    <div className="yellow">
                        <i
                            style={{background:"url(images/images/circle_1.jpg)",backgroundSize:"100%"}}
                        ></i>
                        <span>应还金额：{this.state.repayAmount}.00元</span>
                    </div>
                    <div className="yellow">
                        <i
                            style={{background:"url(images/images/circle_1.jpg)",backgroundSize:"100%"}}
                        ></i>
                        <span>应还日期：{this.state.repayTime.split(" ")[0]}</span>
                    </div>
                    
                </div>
                <div className="btn_box">
                        <button onClick={this.btn}>还款</button>
                </div>
            </div>
        )
    }
})