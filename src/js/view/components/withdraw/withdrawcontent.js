import {InputItem,ImagePicker,Modal,Button,Toast,Picker,List} from "antd-mobile";
import {hashHistory,Link} from "react-router";
// const alert = Modal.alert;
import url from "../../config/config";
import {compress} from "../../../utils/imgCompress";
import $ from "jquery";
export default React.createClass({
    getInitialState(){
        return {
            ti2:"checked",
            show:false,
            check:true,
            files:[],
            money:"",
            img1:"images/images/icon_10.jpg",
            img2:"images/images/icon_10.jpg",
            img3:"images/images/icon_10.jpg",
            upimg3:"",
            upimg3:"",
            upimg3:"",
            policyAmount:"",
            insuranceCompany:"",
            img:"",
            fee:0,
            list:[],
            check2:true,//勾选优惠券
            couponNo:"",
            listCoupon:[],
            value:[]
        }
    },
    componentWillUnmount(){
        // localStorage.withdraw=JSON.stringify(this.state);
        sessionStorage.withdraw1=JSON.stringify(this.state);
    },
    componentWillMount(){
        var that=this;
        fetch(url.url+"/api/act/mine/userInfo/insuranceList.htm",{
           headers:{
               token:localStorage.Token
           },
           method:"get"})
           .then(r=>r.json())
           .then((data)=>{
            //    console.log(data)
               var newlist=data.data.map((con)=>{
                    return {label:con.companyName,value:con.companyName}
                    // console.log(con.bankName)
               })
            //    console.log(newlist)
               that.setState({
                companyName:newlist
               })
               
           }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
            });
        // console.log(sessionStorage.withdraw1)
        if(sessionStorage.withdraw1){
            // console.log(1)
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
                
                // console.log(r)
                // if(r.code=="200"){
                    that.setState({
                        insuranceCompany:r.data.companyName
                    })
                
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
            //   console.log(data)
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
              }
              else if(data.code=="408"){
                Toast.info("系统响应超时", 2);
              }else if(data.code=="500"){
                Toast.info("系统错误", 2);
              }else{
                that.setState(data.data);
              } 
          }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });       
    },  
    submit(){
        // console.log(this.state)
        // console.log(new Date())
        this.setState({
            year:new Date().getFullYear(),
            month:new Date().getMonth() + 1,
            day:new Date().getDate()
        })
        var reg = new RegExp("^[0-9]*$");
        console.log(!reg.test(this.state.policyAmount))
        if(!/^[0-9]{1,6}$/g.test(this.state.policyAmount)){
            Toast.info("请输入正确的保单金额", 2)
        }
        else if(!/^[0-9]{3,6}$/g.test(this.state.money)){
            Toast.info("请输入正确的提现金额", 2)
        }else if(!this.state.value[0]){
            Toast.info("请选择承保公司", 2)
        }
        else{

        if(this.state.money==""){//提交申请
            Toast.info("请输入提现金额", 2)
        }else if(this.state.money>5000||this.state.money<100){//提交申请
            Toast.info("提现金额请输入100-5000以内额度", 2)
        }else if(!this.state.upimg1||!this.state.upimg2||!this.state.upimg3){

            Toast.info("请上传3张保单图片", 2)
        }else if(this.state.money-this.state.policyAmount>0){
            console.log(this.state.money);

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
        data.append("insuranceCompany",this.state.value[0]);
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
            that.setState({check2:true})
               if(data.data.listCoupon.length==0){//如果没有优惠券,吧选择优惠券的钩去掉
                   that.setState({
                      check2:false                 
                   })
               }
               that.setState({
                show:true
               })
           }
        })
        .catch(function(e) {
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
        var that=this;
        var listid="";//优惠券号
        if(this.state.check2){
            listid=this.state.listCoupon[0].couponNo
        }
        console.log(listid);
      var data=new FormData();
      data.append("userId",localStorage.userId);
      data.append("amount",this.state.money);
      data.append("borrowType","20");
      data.append("channelId","1");
      data.append("client","h5");
      data.append("insuranceCompany",this.state.insuranceCompany);
      data.append("couponNo",listid);
      data.append("policyAmount",this.state.policyAmount);
      data.append("policyImg",this.state.upimg1);
      data.append("policyImg1",this.state.upimg2);
      data.append("policyImg2",this.state.upimg3);
      data.append("serviceFee",this.state.serviceFee);
      data.append("timeLimit","7");
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
                                // alert(1)
                                that.setState({
                                    show:false
                                })
                                
                                
                                hashHistory.push("tcsuccess");
                                sessionStorage.withdraw1="";
                                break;
                case 120017:    Toast.info('申请失败，请稍后再次申请', 1);
                                break;
                case 120018:    Toast.info('120018	申请提现服务超时', 1);
                                break;
                default:        break;
            }      
           
        })
        // .catch(function(e) {
        //         console.log("Oops, error");
        //         Toast.info("服务器响应超时", 2);
                
        // });
    },
    upimg(files){//上传图片统一方法
        console.log(files)
        return new Promise(function(suc,err){
            var that=this;
            var data=new FormData();
            //此处图片进行压缩,写入image异步onload中
            /* var img = new Image();
            img.onload = ()=>{
                    var compressImg = compress(img);
                    console.log(compressImg);
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
                            }else{
                                suc(data)
                            }
                           
                        }).catch(function(e) {
                                console.log("Oops, error");
                                
                                // Toast.info("服务器响应超时", 2);
                        });
            } 
            img.src = files[0].url;      */
            //图片压缩结束

                data.append("img",files[0].url);     
                fetch(url.url+"/api/act/mine/userInfo/saveImg.htm",{
                    headers:{
                        token:localStorage.Token
                    },
                    method:"POST",body:data})
                    .then(r=>r.json())
                    .then((data)=>{
                        if(data.code==120008||data.code==120009){
                            Toast.info("上传保单图片失败，请稍后再次上传", 2);
                        }else{
                            suc(data)
                        }
                        
                    }).catch(function(e) {
                            console.log("Oops, error");                                
                            // Toast.info("服务器响应超时", 2);
                    });

        })
            
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
     onChange1(files, type, index){//上传第一张照片
        var that=this;
        this.upimg(files).then((data)=>{
            console.log(data)
            that.setState({
                img1:files[0].url,
                upimg1:data.data
            })
        })
                    
      },
      onChange2(files, type, index){//上传第二张照片
        var that=this;
        this.upimg(files).then((data)=>{
            console.log(data)
            that.setState({
                img2:files[0].url,
                upimg2:data.data
            })
        })                    
      },
      onChange3(files, type, index){//上传第二张照片
        var that=this;
        this.upimg(files).then((data)=>{
            console.log(data)
            that.setState({
                img3:files[0].url,
                upimg3:data.data
            })
        })                    
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
                        <div className="top">
                            <div className="top-1">
                                您的保单提现申请信息
                            </div>
                            <div className="top-2">
                                <div className="ti1"
                                    style={{background:"url(images/images/ti1.png) center center no-repeat/100%"}}
                                ></div>
                                <div className="ti2">
                                    预计还款时间{this.state.year}-{this.state.month}-{this.state.day*1+7}
                                </div>
                                <div className="ti1"
                                    style={{background:"url(images/images/ti1.png) center center no-repeat/100%"}}
                                ></div>
                            </div>
                            <div className="top-3">
                                <div className="ti1">{this.state.actualAmount}</div>
                                <div className="ti2">已优惠{this.state.check2?40:0}元!</div>
                            </div>
                            <div className="top_4">
                                <div className="ti1">
                                <p>{this.state.amount}元</p>
                                <p>提现金额</p>
                                </div>
                                <div className="ti2"
                                    style={{background:"url(images/images/zhu.png) 0% 0%/100%"}}
                                ></div>
                                <div className="ti1">
                                <p>7天</p>
                                <p>期限</p>
                                </div>
                                <div className="ti2"
                                    style={{background:"url(images/images/zhu.png) 0% 0%/100%"}}
                                ></div>
                                <div className="ti1">
                                <p>{this.state.serviceFee}元</p>
                                <p>手续费</p>
                                </div>
                            </div>
                            <div className="top_5">
                            <div
                                style={{visibility:this.state.listCoupon.length>0?"":"hidden"}}
                            >
                                <label><div
                                    style={{background:this.state.check2?"url(images/images/small-2.png) 0% 0%/100%":"url(images/images/small-1.jpg) 0% 0%/100%"}}
                                ><input type="checkbox"
                                checked={this.state.check2}
                                onChange={
                                    this.change2
                                   }
                                        // style={{width:"0.1rem",height:"0.1rem"}}
                                    /></div>使用优惠券</label>
                                    <span>(可使用优惠券额度40元)</span>
                                </div>
                            </div>
                            
                        </div>
                        <div className="bottom"
                            style={{background:"url(images/images/top-bg.png) 0% 0%/100%"}}
                        >
                        <div className="left"
                            onClick={()=>{
                                this.setState({
                                    show:false
                                })
                            }}
                        >取消</div>
                        <div className="right"
                            onClick={()=>{
                                this.confirm()
                            }}
                        >确认</div>
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
                            if(e>999999){
                                e=999999
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
                
                <span style={{width:"1.52rem"}}>承保公司</span>
                <Picker extra="请选择所属公司"
                                    
                                    data={this.state.companyName}
                                    cols="1" 
                                    value={this.state.value}                                  
                                    onOk={e => {this.setState({value:e})}}
                                    onDismiss={e => console.log('dismiss', e)}
                                    >
                                    <List.Item
                                        style={{width:"4rem"}}
                                    ></List.Item>
                                    </Picker>                              
                            {/* </div> */}
                {/* <InputItem
                        value={this.state.insuranceCompany}
                        // onChange={(e)=>{this.setState({insuranceCompany:e})}} 
                        
                        style={{height:"0.52rem",fontSize:"0.28rem"}}
                        placeholder="请输入承保公司" /> */}
                </div>
                <div className="tip day">
                    <i
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                    ></i>
                    借款天数:<span>7天</span>
                </div>
                <div className="tip">
                    <i
                        style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                    ></i>
                    上传保单图片
                </div>
                <div className="picker">
                    <div>
                        <img src={this.state.img1} />
                        <ImagePicker
                                style={{position:"absolute",top:"0",left:"0",width:"6rem",height:"5rem",opacity:"0"}}
                                files={files}
                                onChange={this.onChange1}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length <1}
                                />
                    </div>
                    <div>
                        <img src={this.state.img2} />
                        <ImagePicker
                                style={{position:"absolute",top:"0",left:"0",opacity:"0",width:"10rem",height:"10rem"}}
                                files={files}
                                onChange={this.onChange2}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length <1}
                                />
                    </div>
                    <div>
                        <img src={this.state.img3} />
                        <ImagePicker
                                style={{position:"absolute",top:"0",left:"0",opacity:"0",width:"10rem",height:"10rem"}}
                                files={files}
                                onChange={this.onChange3}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length <1}
                                />
                    </div>
                </div>
                <div className="sub">
                    <input type="submit" onClick={this.submit} value="提交申请" />
                    <div>
                        <input type="checkbox" defaultChecked={this.state.check} onChange={()=>{this.setState({check:!this.state.check})}}/>
                        <p>同意</p>
                        <Link to="borrow">《借款协议》</Link>
                    </div>
                </div>
            </div>
            </div>
        )
    }
})