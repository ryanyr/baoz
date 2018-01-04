import {InputItem,ImagePicker,Modal,Button,Toast} from "antd-mobile";
import {hashHistory} from "react-router";
// const alert = Modal.alert;
import url from "../../config/config";
import {compress} from "../../../utils/imgCompress";

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
    componentWillMount(){
      var that=this;
      var data1=new FormData();
    //   data1.append("couponType",1);
    //   data1.append("page",1);
    //   data1.append("pageSize",5);
    //   data1.append("userId",localStorage.userId);
    //   fetch(url.url+"/api/act/coupon/query.htm",{
    //     headers:{
    //         token:localStorage.Token
    //     },
    //     method:"POST",body:data1})
    //     .then(r=>r.json())
    //     .then((data)=>{
    //       console.log(data)    
    //         that.setState({
    //             couponNo:data.data.list[0].couponNo
    //         })
    //     })
        // var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
  
        fetch(url.url+"/api/act/mine/userInfo/getMyMessage.htm",{
          headers:{
              token:localStorage.Token
          },
          method:"POST",body:data})
          .then(r=>r.json())
          .then((data)=>{
            console.log(data)    
              that.setState(data.data);
          })       
    },  
    submit(){
        console.log(this.state)
        var reg = new RegExp("^[0-9]*$");
        console.log(!reg.test(this.state.policyAmount))
        if(!/^[0-9]{1,6}$/g.test(this.state.policyAmount)){
            Toast.info("请输入正确的保单金额", 2)
        }
        else if(!/^[0-9]{3,6}$/g.test(this.state.money)){
            Toast.info("请输入正确的提现金额", 2)
        }else if(!/^[\u4e00-\u9fa5]{2,10}$/g.test(this.state.insuranceCompany)){
            Toast.info("请输入正确的承保公司", 2)
        }
        else if(!this.state.money||!this.state.policyAmount||!this.state.insuranceCompany||!this.state.img){
            Toast.info("请填写完整参数", 2)
        }
        else{

   
        if
        (this.state.money>5000||this.state.money<100){//提交申请
            Toast.info("提现金额100-5000", 2)
        }else if(this.state.list.length<3){
            Toast.info("最少上传3张保单图片", 2)
        }else if(this.state.money-this.state.policyAmount>0){
            console.log(this.state.money);
            console.log(this.state.policyAmount)
            Toast.info("提现金额不得大于保单金额", 2)
        }else if(this.state.money>this.state.unuser){
            Toast.info("提现金额不得大于剩余额度", 2)
        }
        else{
        if(this.state.check){      
        
        // console.log(this.state)
        
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
          console.log(data)    
           if(data.code=="200"){
               that.setState(data.data);
               that.setState({
                show:true
               })
           }
        })
    }else{
        // console.log(1)
        Toast.info("请同意提现协议", 2)
    }
     }}   
    },
    confirm(){//确认申请
    
        var img1=this.state.list[0];
        var img2=this.state.list[1];
        var img3=this.state.list[2];
        var img4=this.state.list[3];
        var that=this;
        var listid=this.state.check2?this.state.listCoupon[0].couponNo:"";//优惠券号
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
        console.log(this.state.check2);
        console.log(this.state.listCoupon[0].couponNo)
      fetch(url.url+"/api/act/borrow/save.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
          console.log(data)    
        if(data.code=="200"){
            that.setState({
                show:false
            })
            Toast.info(data.msg, 2);
            hashHistory.push("loan")
        }
           
        })
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
                            that.state.list.push(data.data)
                            console.log(that.state.list);
                            
                            that.setState({
                                img:data.data
                            })
                        })
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
     change2(){
        // console.log(1)
        console.log(this.state.list)
        this.setState({check2:!this.state.check2});
        // console.log(this.state.check2)
        if(this.state.check2){
            this.setState({
                actualAmount:this.state.actualAmount+40,
                // amount
            })
        }else{
            this.setState({
                actualAmount:this.state.actualAmount-40,
                // amount
            })
        }
     },
    render(){
        const {files}=this.state;
        return (
            <div className="withdrawcontent">
                <div className="modal" 
                    style={{display:this.state.show?"block":"none"}}
                >
                    <div className="con">
                    <p>确认提交</p>
                    <p>您的保单体现申请信息如下:</p>
                    <p>提现金额:{this.state.amount}</p>
                    <p>时间期限:7天</p>
                    {/* <p>申请时间:</p> */}
                    <p>手续费:{this.state.serviceFee}</p>
                    <p
                        style={{display:this.state.listCoupon.length>0?"":"none"}}
                    ><input type="checkbox" defaultChecked={this.state.check2} onChange={this.change2}/>是否使用优惠券</p>
                    <p>待还金额:{this.state.totalMoney}</p>
                    <p>应还金额:{this.state.actualAmount}</p>
                    <div className="btn">
                        <div onClick={()=>{this.setState({show:false})}}>取消</div>
                        <div onClick={this.confirm}>确认</div>
                    </div>
                    </div>
                </div>
                <div className="tip">
                    <i
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                    ></i>
                    剩余可用额度
                </div>
                <div className="title">
                    <div className="title_con">
                        <div className="ti"
                            style={{background:"url(images/images/10475463301731984.png)",backgroundSize:"100% 100%"}} 
                        ></div><span>剩余可用提现额度：</span><span>{this.state.unuse}元</span>
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
                        onChange={(e)=>{this.setState({insuranceCompany:e})}} 
                        
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
        )
    }
})