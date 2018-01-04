import url from "../../config/config";

export default React.createClass({
    getInitialState(){
        return {
            createTime:""
        }
    },
    componentWillMount(){
        var orderNo=this.props.qu.orderId;
        var state=this.props.qu.state;
        // console.log(this.props)
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
        console.log(localStorage.userId)
        data.append("orderNo",orderNo);
        data.append("state",state);

        fetch(url.url+"/api/act/mine/borrow/orderInfo.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
            console.log(data)    
            if(data.code=="200"){
                that.setState(data.data)
            }
                
            })

    },
    render(){
        return (
            <div className="con_box">
                <div className="title">
                    <div className="imgbox">
                        <img src="images/images/bg_3.jpg" />
                    </div>
                    <span>您的订单正在审核中，请稍后查看审核信息</span>
                </div>
                <div className="info">
                    <div className="info_title">
                        <i
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                        ></i>
                        <span>以下为你的借款信息</span>
                    </div>
                    <div className="info_list">
                        <i
                        style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}} 
                        ></i>
                        <span>借款类型：{this.state.borrowType}</span>
                    </div>
                    <div className="info_list">
                        <i
                        style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}} 
                        ></i>
                        <span>借款金额：{this.state.amount}.00元</span>
                    </div>
                    <div className="info_list">
                        <i
                        style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}} 
                        ></i>
                        <span>实际到账：{this.state.realAmount}.00元</span>
                    </div>
                    <div className="info_list">
                        <i
                        style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}} 
                        ></i>
                        <span>服务费用：{this.state.serviceFee}.00元</span>
                    </div>
                    <div className="info_list">
                        <i
                        style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}} 
                        ></i>
                        <span>借款期限：{this.state.timeLimit}天</span>
                    </div>
                    <div className="info_list">
                        <i
                        style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}} 
                        ></i>
                        <span>申请时间：{this.state.createTime.split(" ")[0]}</span>
                    </div>
                    <div className="info_list">
                        <i
                        style={{background:"url(images/images/circle_2.jpg)",backgroundSize:"100%"}} 
                        ></i>
                        <span>收款卡号：{this.state.cardNo}</span>
                    </div>
                </div>
            </div>
        )
    }
})