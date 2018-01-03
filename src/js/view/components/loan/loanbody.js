

import Audit from "./audit";
import Repayments from "./repayments";
import Settle from "./settle";
import {browserHistory} from "react-router";
import store from "../../../store/store";
export default React.createClass({
    getInitialState(){
        return {
            page:1
        }
    },

    componentWillMount(){
        if(store.getState().infopage){
            this.setState({
                page:store.getState().infopage
            })
        }
    },
    componentWillUnmount(){
        store.dispatch({
            type:"INFO",
            data:this.state.page
        })
    },
    render(){
        var imgurlleft=this.state.page==1?"url(images/images/audit_2.png) 0% 0% /100%":"url(images/images/audit_1.png) 0% 0% /100%";
        var imgurlcenter=this.state.page==2?"url(images/images/center_2.png) 0% 0% /100%":"url(images/images/center_1.png) 0% 0% /100%";
        var imgurlright=this.state.page==3?"url(images/images/dui_2.png) 0% 0% /100%":"url(images/images/dui.png) 0% 0% /100%";
        return (
            <div className="loan_body">
                <div className="tab">
                    <div className={this.state.page==1?"active":""} onClick={()=>{this.setState({page:1})}}>
                        <i
                            style={{background:imgurlleft}}
                        ></i><span>审核中</span>
                    </div>
                    <div className={this.state.page==2?"active":""} onClick={()=>{this.setState({page:2})}}>
                        <i
                            style={{background:imgurlcenter}}
                        ></i><span>待还款</span>
                    </div>
                    <div className={this.state.page==3?"active":""} onClick={()=>{this.setState({page:3})}}>
                        <i
                        style={{background:imgurlright}}
                        ></i><span>已结清</span>
                    </div>
                </div>
                <div className="content">
                    <Audit page={this.state.page} />
                    <Repayments page={this.state.page}  />
                    <Settle page={this.state.page} />
                </div>
            </div>
        )
    }
})
