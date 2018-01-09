import {InputItem,ImagePicker,Toast,Picker,List} from "antd-mobile";
import url from "../../config/config";
import store from "../../../store/store";
import {hashHistory,browserHistory} from "react-router";
import {compress} from "../../../utils/imgCompress";
import { setTimeout } from "timers";
export default React.createClass({
    getInitialState(){
        return {
            files:[],
            imgurl:"images/images/icon_11.jpg",
            imgup:"",
            certificateNo:"",
            companyName:[],
            title:"代理人",
            list:[],
            info:false,
            value:[],//保险公司列表
            value2:[]//职位列表
        }
    },
    componentWillUnmount(){
        sessionStorage.stee=JSON.stringify(this.state);
    },
    componentWillMount(){
        if(sessionStorage.stee){
            this.setState(JSON.parse(sessionStorage.stee))
        }
        
        var that=this;
        fetch(url.url+"/api/act/mine/userInfo/insuranceList.htm",{
           headers:{
               token:localStorage.Token
           },
           method:"get"})
           .then(r=>r.json())
           .then((data)=>{
               console.log(data)
               var newlist=data.data.map((con)=>{
                    return {label:con.companyName,value:con.companyName}
                    // console.log(con.bankName)
               })
               console.log(newlist)
               that.setState({
                companyName:newlist
               })
               
           }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
            });


           var that=this;//查询信息是否完善
			var data=new FormData();
			data.append("userId",localStorage.userId);
	  
			fetch(url.url+"/api/act/mine/userInfo/getMyMessage.htm",{
			  headers:{
				  token:localStorage.Token
			  },
			  method:"POST",body:data})
			  .then(r=>r.json())
			  .then((data)=>{			
                  if(data.data.userInfo=="未完善"){                       
                  }else{
                    that.setState({
                        info:true
                    })
                  }
               
			  }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });
    },
    btn(){
        console.log(this.state)
        var that=this
         
        var reg=/^[0-9a-z]{4,20}$/ig;
        if(!reg.test(this.state.certificateNo)){
            Toast.info("请填写正确保险从业编号", 2);
        }
        else if(!this.state.value[0]){
            Toast.info("请选择所属公司", 2);
        }
        else if(!this.state.value2[0]){
            Toast.info("请选择职务", 2);
        }
        else if(!this.state.imgup){
            Toast.info("请上传行销系统职位截图", 2);
        }        
        else{
        var data=new FormData();
        data.append("certificateNo",this.state.certificateNo);
        data.append("companyName",this.state.value[0]);
        data.append("title",this.state.value2[0]);
        data.append("titleImg",this.state.imgup);       
        data.append("userId",localStorage.userId);
        fetch(url.url+"/api/act/mine/userInfo/saveWorkInfo.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
            console.log(data);
            if(data.code=="200"){
                localStorage.couponinfo=JSON.stringify(data.data);
                console.log(localStorage.couponinfo)
                Toast.info(data.msg, 2);              
                if(that.state.info){//判断信息是否获取过登陆优惠券
                    that.props.changepage();
                    setTimeout(function(){
                        hashHistory.push("my");
                    },50) 
                    
                                      
                }else{
                    hashHistory.push("waitcoupon");
                   
                }                
            }else if(data.code=="400"){
                Toast.info(data.msg, 2);

            }else if(data.code=="410"){
                Toast.info("您的账号已在其他设备登录", 2); 
            }else if(data.code=="411"){
                Toast.info("登录已失效,请重新登录", 2); 
            }
        }).catch(function(e) {
                console.log("Oops, error");
                // Toast.info("服务器响应超时", 2);
        });
    }
    },
    onChange(files, type, index){
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
                console.log(data)
                that.setState({
                    imgurl:files[0].url,
                    imgup:data.data
                    });
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
        } 
        img.src = files[0].url;     
        //图片压缩结束 
      },
    render(){
        const {files}=this.state;
        var showbox=this.props.page==3?"":"none";
        return (
            <div className="step_3" style={{display:showbox}}>
           
                <div className="title">
                    <img src="images/images/title_3.jpg" />
                </div>
                <div className="con">
                    <div className="tip">
                        <i
                            style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                        ></i>
                        职业信息
                    </div>
                    <div className="wrap">
                        <div className="price">
                            <div className="top">
                                <span>保险从业编号</span><InputItem
                                value={this.state.certificateNo}
                                onChange={(e)=>{this.setState({
                                    certificateNo:e})}} 
                                style={{height:"0.52rem",fontSize:"0.28rem"}}
                                placeholder="请输入从业编号" />
                            </div>
                            <div className="top">
                                <span>所属公司</span>
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
                            </div>
                            <div className="top"
                                style={{borderTop:"0.02rem solid #f89c47"}}
                            >
                                <span>职务</span>
                                <Picker extra="请选择职务"
                                    
                                    data={[{label:"代理人",value:"代理人"},{label:"主任",value:"主任"},{label:"经理",value:"经理"},{label:"总监",value:"总监"},]}
                                    cols="1" 
                                    value={this.state.value2}                                  
                                    onOk={e => {this.setState({value2:e})}}
                                    onDismiss={e => console.log('dismiss', e)}
                                    >
                                    <List.Item
                                        style={{width:"4rem"}}
                                    ></List.Item>
                                    </Picker>
                               
                            </div>
                            <div className="upimg">
                                上传行销系统职位截图
                            </div>
                            <div className="img_box">
                                <div className="left">
                                    <div
                                    style={{position:"relative",overflow:"hidden"}}
                                    >
                                        <img src={this.state.imgurl} />
                                        <ImagePicker
                                        style={{position:"absolute",top:"0",left:"0",width:"16rem",height:"15rem",opacity:"0"}}
                                        files={files}
                                        onChange={this.onChange}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={files.length <1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="step">
                        <button onClick={()=>{this.props.step(2)}}>上一步</button><button onClick={this.btn}>提交</button>
                    </div>  
                </div>
            </div>
            
        )
    }
})
