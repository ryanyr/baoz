import {InputItem,Toast} from "antd-mobile";
import {hashHistory} from "react-router";
import url from "../../config/config";
export default React.createClass({
    getInitialState(){
        return {
            num:"",
            ti1:"自持",
            ti2:"全款",
            ti3:1,
            ti4:"全款",
            ti5:1,
            ti6:1,
            ti7:1,
            ti8:"0-3000元/每月"
        }
    },
    btn(e){
        //我要赚钱提交接口
        console.log(this.state);
        var data=new FormData();
        data.append("accumulationFund",this.state.ti5);
        data.append("carMortgage",this.state.ti4);
        data.append("houseExtension",this.state.ti3);
        data.append("houseMortgage",this.state.ti2);
        data.append("houseOwnership",this.state.ti1);
        data.append("insuranceInfo",this.state.ti7);
        data.append("loanAmount",this.state.num);
        data.append("salary",this.state.ti8);
        data.append("socialSecurity",this.state.ti6);
        data.append("userId",localStorage.userId);
        fetch(url.url+"/api/act/mine/userExtraInfo/saveWantMakeMoney.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                // console.log(data)

                if(data.code=="200"){
                    // that.props.step(2)
                    hashHistory.push("home")
                }else if(data.code=="400"){
                    Toast.info(data.msg, 2);
                }
            })
    },
    render(){
        return (
            <div className="list_con">
                <div className="tips">
                    <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% /100%"}}
                    ></i>
                    <span>请输入客户的贷款信息</span>
                </div>
                <div className="title">
                    <i
                        style={{background:"url(images/images/10475463301731984.png) 0% 0% /100%"}}
                    ></i>
                    <span
                    >借款金额</span>
                    <InputItem
                    value={this.state.num}
                    onChange={(e)=>{this.setState({num:e})}}
                    style={{height:"0.42rem",fontSize:"0.28rem",marginLeft:"0.8rem"}} 
                    placeholder="请输入借款金额"
                    />
                </div>
                <div className="tips">
                    <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% /100%"}}
                    ></i>
                    <span>房产信息</span>
                </div>
                <div className="list_info">
                    <div>
                        <span>所有权：</span>
                        <span><label><input type="radio" name="ti1" defaultChecked={this.state.ti1=="自持"?"true":""} onChange={()=>{
                            this.setState({
                                ti1:"自持"
                            })
                        }}/>自持</label></span>
                        <span><label><input type="radio"  name="ti1" defaultChecked={this.state.ti1=="租赁"?"true":""} onChange={()=>{
                            this.setState({
                                ti1:"租赁"
                            })
                        }}/>租赁</label></span>
                    </div>
                    <div>
                        <span>按揭情况：</span>
                        <span><label><input type="radio" name="ti2" defaultChecked={this.state.ti2=="全款"?"true":""} onChange={()=>{
                            this.setState({
                                ti2:"全款"
                            })
                        }}/>全款</label></span>
                        <span><label><input type="radio" name="ti2" defaultChecked={this.state.ti2=="按揭"?"true":""} onChange={()=>{
                            this.setState({
                                ti2:"按揭"
                            })
                        }}/>按揭</label></span>
                    </div>
                    <div>
                        <span>是否延展：</span>
                        <span><label><input type="radio" name="ti3" defaultChecked={this.state.ti3==1?"true":""} onChange={()=>{
                            this.setState({
                                ti3:1
                            })
                        }}/>是</label></span>
                        <span><label><input type="radio" name="ti3" defaultChecked={this.state.ti3==2?"true":""} onChange={()=>{
                            this.setState({
                                ti3:0
                            })
                        }}/>否</label></span>
                    </div>
                </div>
                <div className="tips">
                    <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% /100%"}}
                    ></i>
                    <span>车辆情况</span>
                </div>
                <div className="list_info">
                    <div>
                        <span>按揭情况：</span>
                        <span><label><input type="radio" name="ti4" defaultChecked={this.state.ti4=="全款"?"true":""} onChange={()=>{
                            this.setState({
                                ti4:"全款"
                            })
                        }}/>全款</label></span>
                        <span><label><input type="radio" name="ti4" defaultChecked={this.state.ti4=="按揭"?"true":""} onChange={()=>{
                            this.setState({
                                ti4:"按揭"
                            })
                        }}/>按揭</label></span>
                    </div>
                </div>
                <div className="tips">
                    <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% /100%"}}
                    ></i>
                    <span>公积金信息</span>
                </div>
                <div className="list_info">
                    <div>
                        <span>缴纳情况：</span>
                        <span><label><input type="radio" name="ti5" defaultChecked={this.state.ti5==1?"true":""} onChange={()=>{
                            this.setState({
                                ti5:1
                            })
                        }}/>有</label></span>
                        <span><label><input type="radio" name="ti5" defaultChecked={this.state.ti5==2?"true":""} onChange={()=>{
                            this.setState({
                                ti5:0
                            })
                        }}/>无</label></span>
                    </div>
                </div>
                <div className="tips">
                    <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% /100%"}}
                    ></i>
                    <span>社保信息</span>
                </div>
                <div className="list_info">
                    <div>
                        <span>缴纳情况：</span>
                        <span><label><input type="radio" name="ti6" defaultChecked={this.state.ti6==1?"true":""} onChange={()=>{
                            this.setState({
                                ti6:1
                            })
                        }}/>有</label></span>
                        <span><label><input type="radio" name="ti6" defaultChecked={this.state.ti6==2?"true":""} onChange={()=>{
                            this.setState({
                                ti6:0
                            })
                        }}/>无</label></span>
                    </div>
                </div>
                <div className="tips">
                    <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% /100%"}}
                    ></i>
                    <span>社保信息</span>
                </div>
                <div className="list_info">
                    <div>
                        <span>工资流水：</span>
                        <select value={this.state.ti8} onChange={(e)=>{
                            this.setState({
                                ti8:e.target.value
                            })
                        }}>
                            <option value="0-3000元/每月">0-3000元/每月</option>
                            <option value="3001-6000元/每月">3001-6000元/每月</option>
                        </select>
                    </div>
                </div>
                <div className="tips">
                    <i
                        style={{background:"url(images/images/icon_05.png) 0% 0% /100%"}}
                    ></i>
                    <span>保险信息</span>
                </div>
                <div className="list_info">
                    <div>
                        <span>是否有保险：</span>
                        <span><label><input type="radio" name="ti7" defaultChecked={this.state.ti7==1?"true":""} onChange={()=>{
                            this.setState({
                                ti7:1
                            })
                        }}/>有</label></span>
                        <span><label><input type="radio" name="ti7" defaultChecked={this.state.ti7==2?"true":""} onChange={()=>{
                            this.setState({
                                ti7:0
                            })
                        }}/>无</label></span>
                    </div>
                </div>
                <div className="submit">
                    <button  onClick={this.btn}>提交</button>
                </div>
            </div>
        )
    }
})