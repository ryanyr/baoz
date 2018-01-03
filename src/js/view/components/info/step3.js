import {InputItem,ImagePicker,Toast} from "antd-mobile";
import url from "../../config/config";
import store from "../../../store/store";
import {hashHistory,browserHistory} from "react-router";
import {compress} from "../../../utils/imgCompress";

export default React.createClass({
    getInitialState(){
        return {
            files:[],
            imgurl:"images/images/icon_11.jpg",
            imgup:"",
            certificateNo:"",
            companyName:"",
            title:"代理人"
        }
    },
    btn(){
        if(!this.state.certificateNo){
            Toast.info("请填写保险从业编号", 2);
        }else if(!this.state.companyName){
            Toast.info("请填写所属公司", 2);
        }else if(!this.state.imgup){
            Toast.info("请上传行销系统职位截图", 2);
        }
        
        else{
        console.log(this.state)
        var data=new FormData();
        data.append("certificateNo",this.state.certificateNo);
        data.append("companyName",this.state.companyName);
        data.append("title",this.state.title);
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
                localStorage.credit=true;
                console.log(localStorage.getCoupon)
                if(localStorage.getCoupon=="true"){//判断信息是否获取过登陆优惠券
                    hashHistory.push("my");
                    // localStorage.writed=false;
                    
                }else{
                    hashHistory.push("waitcoupon");
                   
                }
                localStorage.couponinfo=JSON.stringify(data.data)
                
            }else if(data.code=="400"){
                Toast.info(data.msg, 2);

            }
        })
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
            })
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
                                onChange={(e)=>{this.setState({
                                    certificateNo:e})}} 
                                style={{height:"0.42rem",fontSize:"0.28rem"}}
                                placeholder="请输入从业编号" />
                            </div>
                            <div className="top">
                                <span>所属公司</span><InputItem
                                 onChange={(e)=>{this.setState({
                                    companyName:e})}} 
                                style={{height:"0.42rem",fontSize:"0.28rem"}}
                                placeholder="请输入公司名称" />
                            </div>
                            <div className="top"
                                style={{borderTop:"0.02rem solid #f89c47"}}
                            >
                                <span>代理人</span>
                                <div
                                    style={{paddingLeft:"15px"}}
                                >
                                <select
                                    style={{border:"0",height:"0.52rem"}}
                                    value={this.state.title}
                                    onChange={(e)=>{
                                        this.setState({
                                            title:e.target.value
                                        })
                                    }}
                                >
                                    <option value="代理人">代理人</option>
                                    <option value="代理人2">主任</option>
                                    <option value="代理人2">经理</option>
                                    <option value="代理人2">总监</option>
                                </select>
                                </div>
                               
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