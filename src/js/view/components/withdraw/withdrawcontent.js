import {InputItem,ImagePicker,Modal,Button,Toast} from "antd-mobile";
import {hashHistory} from "react-router";
// const alert = Modal.alert;
import url from "../../config/config";
import {compress} from "../../../utils/imgCompress";
import $ from "jquery";
export default React.createClass({
    getInitialState(){
        return {
            show:false,
            check:true,
            files:[],
            money:"",
            policyAmount:"",
            insuranceCompany:"",
            img:"",
            fee:0,
            list:[],
            check2:true,
            couponNo:"",
            listCoupon:[]
        }
    },
    componentWillUnmount(){
        // localStorage.withdraw=JSON.stringify(this.state);
        sessionStorage.withdraw1=JSON.stringify(this.state);
    },
    componentWillMount(){
        if(sessionStorage.withdraw1){
            this.setState(JSON.parse(sessionStorage.withdraw1))
        }
        var that=this;
        $.ajax({
            type: "get",
            url: url.url+"/api/act/mine/userInfo/getUserInfo.htm",
            data: {userId:localStorage.userId},
            dataType: "json",
            headers:{"Content-Type":"text/plain;charset=UTF-8",token:localStorage.Token},
            success: function (r) {
                console.log(r)
                if(r.code=="200"){
                    that.setState({
                        insuranceCompany:r.data.companyName
                    })
                }
            }
        });
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
                case 500:    Toast.info('系统错误', 1);
                                break;
                default:        break;
            }        
              that.setState(data.data);
          }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });       
    },  
    submit(){
        console.log(this.state)
        var reg = new RegExp("^[0-9]*$");
        console.log(!reg.test(this.state.policyAmount))
        if(!/^[0-9]{1,7}$/g.test(this.state.policyAmount)){
            Toast.info("请输入正确的保单金额", 2)
        }
        else if(!/^[0-9]{3,6}$/g.test(this.state.money)){
            Toast.info("请输入正确的提现金额", 2)
        }
        else{

        if(this.state.money==""){//提交申请
            Toast.info("请输入提现金额", 2)
        }else if(this.state.money>5000||this.state.money<100){//提交申请
            Toast.info("提现金额请输入100-5000以内额度", 2)
        }else if(this.state.list.length<3){
            Toast.info("请上传3-4张保单图片", 2)
        }else if(this.state.money-this.state.policyAmount>0){
            console.log(this.state.money);
            console.log(this.state.policyAmount)
            Toast.info("提现金额不得超过保单金额", 2)
        }else if(this.state.money>this.state.unuser){
            Toast.info("提现金额不得大于剩余额度", 2)
        }
        else{
        if(this.state.check){      
        var that=this;      
        var data=new FormData();
        data.append("userId",localStorage.userId);
        data.append("amount",this.state.money);
        data.append("policyAmount",this.state.policyAmount);
        // data.append("couponNo",this.state.couponNo);
        fetch(url.url+"/api/act/borrow/apply.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{  
          console.log(data);
           if(data.code=="200"){
            that.setState(data.data);
               if(data.data.listCoupon.length==0){//如果没有优惠券,吧选择优惠券的钩去掉
                   that.setState({
                       check2:false,                     
                   })
               }
               that.setState({
                show:true
               })
           }
        }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });
    }else{
        // console.log(1)
        Toast.info("请同意提现协议", 2)
    }
     }}   
    },
    confirm(){//确认申请
        console.log(this.state.check2);

        
        var img1=this.state.list[0];
        var img2=this.state.list[1];
        var img3=this.state.list[2];
        var img4=this.state.list[3];
        var that=this;
        var listid="";
        if(this.state.check2){
            listid=this.state.listCoupon[0].couponNo
        }
        // var listid=this.state.check2?this.state.listCoupon[0].couponNo:"";//优惠券号
        console.log(listid);
      var data=new FormData();
      data.append("userId",localStorage.userId);
      data.append("amount",this.state.money);
      data.append("borrowType","20");
      data.append("channelId","1");
      data.append("client","h5");
      data.append("insuranceCompany",this.state.insuranceCompany);
      data.append("couponNo",listid);
      data.append("policyAmount",this.state.money);
      data.append("policyImg",img1);
      data.append("policyImg1",img2);
      data.append("policyImg2",img3);
      data.append("policyImg3",img4);
      data.append("serviceFee",this.state.serviceFee);
      data.append("timeLimit","7");
        // console.log(this.state.check2);
        // console.log(this.state.listCoupon[0].couponNo)
      fetch(url.url+"/api/act/borrow/save.htm",{
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
                case 500:    Toast.info('系统错误', 1);
                                break;
                case 120001:    Toast.info('服务器响应超时', 1);
                                break;
                case 120002:    Toast.info('请输入保单金额', 1);
                                break;
                case 120003:    Toast.info('保单金额请输入100万以内数字', 1);
                                break;
                case 120004:    Toast.info('请输入提现金额', 1);
                                break;
                case 120005:    Toast.info('提现金额请输入100-5000以内额度', 1);
                                break;
                case 120006:    Toast.info('提现金额不得超过保单金额', 1);
                                break;
                case 120007:    Toast.info('请上传保单图片', 1);
                                break;
                case 120008:    Toast.info('上传保单图片失败，请稍后再次上传', 1);
                                break;
                case 120009:    Toast.info('上传保单图片失败，请稍后再次上传', 1);
                                break;
                case 120010:    Toast.info('请上传3-4张保单图片', 1);
                                break;
                case 120011:    Toast.info('请勾选提现协议', 1);
                                break;
                case 120012:    Toast.info('请选择保险公司', 1);
                                break;
                case 120013:    Toast.info('申请提现服务超时', 1);
                                break;
                case 120015:    Toast.info('服务器错误，请稍后再次申请', 1);
                                break;
                case 120016:    Toast.info('恭喜您，已申请成功，请稍后查看订单信息', 1);
                                break;
                case 120017:    Toast.info('申请失败，请稍后再次申请', 1);
                                break;
                case 120018:    Toast.info('120018	申请提现服务超时', 1);
                                break;
                default:        break;
            }      
        if(data.code=="200"){
            that.setState({
                show:false
            })
            Toast.info(data.msg, 2);
            
            hashHistory.push("loan");
            sessionStorage.withdraw="";
        }
           
        }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });
    },
    onChange(files, type, index){
        // console.log(files)
        if(type=="add"){
            console.log("add")
            var that=this;
            var data=new FormData();
            //此处图片进行压缩,写入image异步onload中
            var img = new Image();
            img.onload = ()=>{
                    var compressImg = compress(img);
                    data.append("img",compressImg);     
                    fetch(url.url+"/api/act/mine/userInfo/saveImg.htm",{
                        headers:{
                            token:localStorage.Token
                        },
                        method:"POST",body:data})
                        .then(r=>r.json())
                        .then((data)=>{
                            if(data.code==120008||data.code==120009){
                                Toast.info("上传保单图片失败，请稍后再次上传", 2);
                            }
                            that.state.list.push(data.data)
                            console.log(that.state.list);
                            
                            that.setState({
                                img:data.data
                            })
                        }).catch(function(e) {
                                console.log("Oops, error");
                                // Toast.info("服务器响应超时", 2);
                        });
            } 
            img.src = files[0].url;     
            //图片压缩结束
        }else{
            this.state.list.splice(index,1)
            console.log(index)
        }
        this.setState({
            files,
          });
      },
    change2(e){
         console.log(e.target.checked);
        //  console.log(this.state)
        var that=this;
        this.setState({check2:!this.state.check2});
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
        const {files}=this.state;
        return (
            <div>
            <div className="wd_top" style={{background:"url(images/images/txtop.png)",backgroundSize:"100% 100%"}}>
                <p>{this.state.unuse}</p>
                <div className="wd_topw">剩余可用额度</div>
            </div>
            <div className="withdrawcontent">
                
                <div className="modal" 
                    style={{display:this.state.show?"block":"none"}}
                >
                    <div className="con">
                    <div className="top"
                        style={{background:"url(images/images/850855399924466698.png) 0% 0%/100%" }}
                    >
                        <p>您的保单提现申请信息如下</p>
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
                        ><input type="checkbox" checked={this.state.check2} onChange={this.change2}/>使用优惠券(可使用优惠额度40元)</p>
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
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                    ></i>
                    请输入提现额度(100元-5000元):
                </div>
                <div className="price">
                    <div className="top">
                        <span style={{width:"1.52rem"}}>保单金额</span><InputItem
                        value={this.state.policyAmount}
                        onChange={(e)=>{
                            if(e>9999999){
                                e=9999999
                            }
                            this.setState({policyAmount:e});
                        }
                        } 
                        style={{height:"0.52rem",fontSize:"0.28rem"}}
                        placeholder="请输入保单金额" />
                    </div>
                    <div className="top">
                        <span style={{width:"1.52rem"}}>提现金额</span><InputItem
                        value={this.state.money}
                        onChange={(e)=>{
                            // console.log(e==1)
                            
                            var i=0;
                            // console.log(100<e<1000)
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
                           
                            this.setState({money:e,fee:i})
                        
                    }
                        
                } 
                        
                        style={{height:"0.52rem",fontSize:"0.28rem"}}
                        placeholder="请输入提现金额" />
                    </div>
                </div>
                <div className="fee">
                    手续费：{this.state.fee}元
                </div>
                <div className="company">
                
                <span style={{width:"1.52rem"}}>承保公司</span><InputItem
                        value={this.state.insuranceCompany}
                        // onChange={(e)=>{this.setState({insuranceCompany:e})}} 
                        
                        style={{height:"0.52rem",fontSize:"0.28rem"}}
                        placeholder="请输入承保公司" />
                </div>
                <div className="tip day">
                    <i
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                    ></i>
                    选择借款天数:<span>7天</span>
                </div>
                <div className="tip">
                    <i
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                    ></i>
                    上传保单图片
                </div>
                <div className="picker">
                    <ImagePicker
                    /* style={{borderColor:"red"}} */
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    
                    selectable={files.length <4}
                    />
                </div>
                <div className="sub">
                    <input type="submit" onClick={this.submit} value="提交申请" />
                    <div>
                        <input type="checkbox" defaultChecked={this.state.check} onChange={()=>{this.setState({check:!this.state.check})}}/>
                        <p>同意<a>《提现协议》</a></p>
                    </div>
                </div>
            </div>
            </div>
        )
    }
})