import { Toast } from 'antd-mobile';
import $ from "jquery";
import url from "../../config/config";
import {hashHistory,browserHistory} from "react-router";
import { setInterval, clearInterval } from 'timers';
export default React.createClass({
    getInitialState(){
        return {
            phone:"",
            check:true,
            pwd:"",
            code:"",
            time:"发送验证码"
        }
    },
    send(){
        if(this.state.time=="发送验证码"){

        var that=this;
        var data=new FormData();//发送验证码
        data.append("phone",this.state.phone);
        fetch(url.url+"/api/user/sendVcode.htm",{
        // headers:{
        //     token:"50a8cb13556b48038081dd735372ee70"
        // },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
            console.log(data)
            if(data.msg=="请输入正确的手机号"){
                Toast.info('请输入正确的手机号', 1);
            }else{
                if(data.data.success){
                    Toast.info('发送成功', 1);
                    var i=60;
            // var that=this;
            var timer=setInterval(function(){
                i--;
                that.setState({
                    time:i+"秒后再次发送"
                })
                if(i==0){
                    clearInterval(timer);
                    that.setState({
                        time:"发送验证码"
                    })
                }
            },1000)
                }else{
                    Toast.info('发送失败', 1);
                }
            }  
        })}else{
            
        }
    },
    submit(e){
        e.preventDefault();
        if(!this.state.phone){
            Toast.info('请输入手机号码', 1); 
        }else if(!this.state.pwd){
            Toast.info('请输入验证码', 1);
        }else{

        
        // console.log(this.state.check)
        
        if(this.state.check){
        var data=new FormData();//登录
        data.append("loginName",this.state.phone);
        data.append("invitationCode",this.state.code);
        data.append("loginPwd",this.state.pwd)
        fetch(url.url+"/api/user/login.do",{
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
            console.log(data);
            if(data.msg=="请输入正确的手机号"){
                Toast.info('请输入正确的手机号', 1);
            }else{
                if(data.state==1||data.state==2){
                    localStorage.Login=true;
                    localStorage.userId=data.data.userId;
                    localStorage.Token=data.data.token;
                    localStorage.Phone=this.state.phone;
                    Toast.info('登录成功', 1);
                    if(data.state==2){
                        hashHistory.push("home");
                        
                    }if(data.state==1){
                        
                        hashHistory.push("loginsuccess");
                        localStorage.write=false;//第一次登陆,信息没有完善,没有获取到优惠券
                    }
                }else{
                    Toast.info('验证码不正确', 1);
                }
            }
        })     
    }else{
        Toast.info('请勾选注册协议', 1);
    }}
    },
    pwd(e){
        this.setState({
            pwd:e.target.value
        })
    },
    phoneChange(e){
        this.setState({
            phone:e.target.value
        })
    },
    editChecked(){
        this.setState({
            check:!this.state.check
        });
    },
    render(){
        return (
            <form onSubmit={this.submit}>
                <div className="form_phone">
                    
                    <i
                        style={{background:"url(images/images/icon_01.png)",width:"0.37rem",height:"0.5rem",backgroundSize:"100%"}} 
                    ></i><input placeholder="请输入手机号码" type="number" onChange={this.phoneChange} value={this.state.phone}/>
                </div>
                <div className="form_pwd">
                    <i
                        style={{background:"url(images/images/icon_02.png)",width:"0.37rem",height:"0.38rem",backgroundSize:"100%"}}
                    ></i><input placeholder="请输入验证码" type="number" onChange={this.pwd} />
                    <div onClick={this.send} className={this.state.time=="发送验证码"?"":"active"}>{this.state.time}</div>
                </div>
                <div className="form_qr">
                    <i 
                    style={{background:"url(images/images/icon_03.png)",width:"0.37rem",height:"0.37rem",backgroundSize:"100%"}}
                    ></i><input placeholder="请输入推广码" type="text" onChange={(e)=>{
                        this.setState({
                            code:e.target.value
                        })
                    }} />
                </div>
                <div className="protocol">
                    <input type="checkbox" defaultChecked={this.state.check} onChange={this.editChecked} />
                    <p>第一次登录会为你自动注册账号，为正常使用服务需同意<a>《注册协议》</a></p>
                </div>
                
                    <input className="sub" type="submit" value="登录" />
                
            </form>
        )
    }
})