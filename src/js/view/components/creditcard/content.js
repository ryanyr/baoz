import {  InputItem ,Modal} from 'antd-mobile';
import url from "../../config/config";
import { Toast} from 'antd-mobile';
import {hashHistory} from "react-router"
export default React.createClass({
    getInitialState(){
        return {
            check:true,
            money:"",
            show:false,
            serviceFee:0,
            couponNo:"",
            check2:true,
            listCoupon:[]
        }
    },
    componentWillUnmount(){
        sessionStorage.width=JSON.stringify(this.state)
    },
    componentWillMount(){
        console.log(Boolean(sessionStorage.width))
        if(sessionStorage.width){
            this.setState(JSON.parse(sessionStorage.width))
        }
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
  
        fetch(url.url+"/api/act/mine/userInfo/getMyMessage.htm",{
          headers:{
              token:localStorage.Token
          },
          method:"POST",body:data})
          .then(r=>r.json())
          .then((data)=>{
            if(data.code=="410"){
                Toast.info("您的账号已在其他设备登录", 2);
                setTimeout(function(){
                    hashHistory.push("login")
                },2000)
              }else if(data.code=="411"){
                Toast.info("登录已失效,请重新登录", 2);
                setTimeout(function(){
                    hashHistory.push("login")
                },2000) 
              }else if(data.code=="408"){
                Toast.info("系统响应超时", 2);
              }else if(data.code=="500"){
                Toast.info("系统错误", 2);
              }
              else{
                that.setState(data.data);
              } 
          }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    change(e){
        // console.log(e)
        var i=0;
        if(0<e&&e<=1000){
            i=20
            
            
        }else if(1000<e&&e<=2000){
            i=40
        }else if(2000<e&&e<=3000){
            i=60
        }else if(3000<e&&e<=4000){
            i=80
        }else if(4000<e&&e<=5000){
            i=100
        }else if(e>5000){
            e=5000
            i=100
        }
        console.log(e)
        this.setState({
            money:e,
            serviceFee:i
        })
    },
    submit(){
        console.log(this.state)
        var that=this;
        if(this.state.money<100||this.state.money>5000){
            Toast.info('代还金额请填写100-5000之间', 2);
        }else if(this.state.money>this.state.unuse){
            Toast.info('代还金额不得大于可用额度', 2);
        }
        
        else{
            if(this.state.check){
            var data=new FormData();
        data.append("amount",this.state.money);
        data.append("userId",localStorage.userId)
        fetch(url.url+"/api/act/pay/repayment/apply.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                console.log(data)
                if(data.code=="200"){
                    that.setState({
                        check2:true
                    })
                    that.setState(data.data);
                    if(data.data.listCoupon.length==0){//如果没有优惠券,把选择默认按钮去掉
                        that.setState({
                            check2:false
                        })
                    }
                    that.setState({show:true})
                    
                }
                
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
            });
        }else{
            Toast.info('请同意代还协议', 2);
        }
    }
        
    },
    confirm(){
        console.log(this.state.check2)
        var that=this;
        var data=new FormData();
        var listid="";
        if(this.state.check2){
            listid=this.state.listCoupon[0].couponNo
        }
        console.log(listid)
        data.append("amount",this.state.money);
        data.append("borrowType","10");
        data.append("channelId","1");
        data.append("client","h5");
        data.append("couponNo",listid);
        data.append("serviceFee",this.state.serviceFee);
        data.append("timeLimit","7");
        data.append("userId",localStorage.userId)
        fetch(url.url+"/api/act/pay/repayment/verify.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                console.log(data)
                if(data.code=="200"){
                    // that.setState(data.data);
                    that.setState({show:false});
                    Toast.info(data.msg, 2);
                    hashHistory.push("loan");
                    // localStorage.card="";
                    sessionStorage.width="";
                }
                
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    change2(e){
        // console.log(1)
        this.setState({check2:!this.state.check2})
        if(e.target.checked){
            this.setState({
                actualAmount:this.state.actualAmount-40,
            })
        }else{
            this.setState({
                actualAmount:this.state.actualAmount+40,
            })
        }
     },
    render(){
        return (
            <div className="card_con">
            <div className="modal" 
                    style={{display:this.state.show?"block":"none"}}
                >
                    <div className="con">
                    <div className="top"
                        style={{background:"url(images/images/850855399924466698.png) 0% 0%/100%" }}
                    >
                        <p>您的保单体现申请信息如下</p>
                        <p>提现金额:{this.state.amount}</p>
                        <p>时间期限:7天</p>
                        <p>手续费:{this.state.serviceFee}</p>
                        <p>待还金额:{this.state.totalMoney}</p>
                        <p>应还金额:{this.state.actualAmount}</p>
                    </div>
                    <div className="bottom">
                    <div
                        style={{height:"0.6rem"}}
                    >
                        <p
                            style={{display:this.state.listCoupon.length>0?"":"none"}}
                        ><input type="checkbox" checked={this.state.check2} onChange={this.change2}/>是否使用优惠券</p>
                    </div>
                    <div className="btn">
                        <div onClick={()=>{this.setState({show:false})}}>取消</div>
                        <div onClick={this.confirm}>确认</div>
                    </div>
                    </div>
                    
                    </div>
                </div>
                <div className="tip">
                    <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% /100%"}}
                    ></i>
                    <span>剩余可用额度</span>
                </div>
                <div className="title">
                    <i
                    style={{background:"url(images/images/10475463301731984.png) 0% 0% /100%"}}
                    ></i>
                    <span>剩余可用额度：</span>
                    <span>{this.state.unuse}元</span>
                </div>
                <div className="tip">
                    <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% /100%"}}
                    ></i>
                    <span>请输入代还额度(100元-5000元)</span>
                </div>
                <div className="title">
                    <span
                        style={{marginLeft:"0.36rem"}}
                    >代还金额</span>
                    <InputItem
                    value={this.state.money}
                    onChange={this.change}
                    // maxLength="4"
                    style={{height:"0.42rem",fontSize:"0.28rem"}} 
                    placeholder="请输入代还金额"
                    />
                </div>
                <div className="server">
                    <span>手续费：{this.state.serviceFee}元</span>
                </div>
                <div className="tip">
                    <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% /100%"}}
                    ></i>
                    <span>借款天数</span>
                </div>
                <div className="title">
                    <i
                    style={{background:"url(images/images/367267659602419724.png) 0% 0% /100%"}}
                    ></i>
                    <span>选择借款天数</span>
                    <span>7天</span>
                </div>
                <div className="submit">
                    <button onClick={this.submit}>提交申请</button>
                    <div>
                        <label><input type="checkbox" defaultChecked={this.state.check} onChange={()=>{this.setState({check:!this.state.check})}} />同意</label><a>《代还协议》</a>
                    </div>
                </div>
            </div>
        )
    }
})