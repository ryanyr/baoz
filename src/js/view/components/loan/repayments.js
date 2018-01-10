import {  Checkbox } from 'antd-mobile';
import {Link} from "react-router";
import url from "../../config/config";
import {Pagination,Icon,Toast} from 'antd-mobile';
import store from "../../../store/store";
import { setTimeout } from 'timers';
var all=0;
export default React.createClass({
    getInitialState(){
        return {
          list:[],
          page:1,
          total:"",
          showpage:false,
          checkall:false,
          allmoney:0,
          num:0,
          selectedStores:[],
          changelist:true,
          orders:["","","","",""],
          moneylist:["","","","",""],
        //   li1:true
        }
    },
    componentWillMount(){
        if(store.getState().LIST_2.total){
            this.setState(store.getState().LIST_2);
            this.change(store.getState().LIST_2.page)

        }else{
            this.change(this.state.page)
        }
        
    },
    componentWillUnmount(){
        var that=this;
        store.dispatch({
            type:"LIST_2",
            data:{
                total:that.state.total,
                page:that.state.page
            }
        })
    },
    changeall(e){
        
        this.setState({
            checkall:!this.state.checkall
        })
        if(e.target.checked){
            console.log(this.refs.nu1.checked)
        }
    },
    change(e){
        this.setState({
            page:e
        })
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
        data.append("stateList",[40,52,55,60]);
        data.append("page",e);
        data.append("pageSize",5);
        fetch(url.url+"/api/act/mine/borrow/list.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                console.log(data)
                if(data.data.list.length>0){
                    that.setState({
                        showpage:true
                    })
                }

                var info=[];
                for(var i=0;i<data.data.list.length;i++){
                    if(data.data.list[i].state=="40"||data.data.list[i].state=="52"||data.data.list[i].state=="60"||data.data.list[i].state=="55"){
                        // data.data.list[i]["info"]="待还款"
                        if(data.data.list[i].state=="40"){
                            data.data.list[i]["info"]="待还款"
                            console.log(data.data.list[i])
                        }
                        else if(data.data.list[i].state=="52"){
                            data.data.list[i]["info"]="还款中"
                        }
                        else if(data.data.list[i].state=="55"){
                            data.data.list[i]["info"]="已延期"
                        }
                        else if(data.data.list[i].state=="60"){
                            data.data.list[i]["info"]="已逾期"
                        }
                        info.push(data.data.list[i]);
                    }
                }
                that.setState({list:info,total:data.data.pageInfo.total})
                
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    changelist(e,ind,index){
        var that=this;
        if(e.target.checked){
            this.state.orders[index]=ind.orderNo;
            this.state.moneylist[index]=ind.repayAmount;
            all++;
            // console.log(this.state.list.length)
            this.setState({
                allmoney:this.state.allmoney+ind.repayAmount*1
            })
            if(all==this.state.list.length){
                this.setState({
                    checkall:true
                })
            }
            
        }else{
            this.state.orders[index]="";
            this.state.moneylist[index]=""
            this.setState({
                allmoney:this.state.allmoney-ind.repayAmount*1
            })
            all--;
            this.setState({
                checkall:false
            })
        };
        
        
        
    },
    btn(){
        console.log(this.refs.nu)
    },
    render(){
        var list=this.state.list.map((ind,index)=>{
            return (
                <div  className="repayments_list" to="repayment" key={index} ref="nu">
                    <Checkbox 
                        ref="nu1"
                        id="che"
                        style={{marginLeft:"0.2rem"}}
                        value={index}
                        // checked={this.state.changelist}
                        onChange={(e)=>{
                            console.log(this.refs.nu1)
                            this.changelist(e,ind,index)
                        }}
                    />
                    <div className="info_left">
                        <p>{ind.createTime.split(" ")[0]}</p>
                        <p>{ind.amount}元</p>
                    </div>
                    <div className="info_right">
                        <p>应还</p>
                        <p>{ind.repayAmount}元</p>
                    </div>
                    <Link to={{pathname:"repayment",query:{orderNo:ind.orderNo}}}>
                        <span>去还款</span>
                        <i
                            style={{background:"url(images/images/right.png)",backgroundSize:"100%"}}
                        ></i>
                    </Link>
                </div>
            )
        })
        var show=this.props.page==2?"":"none";
        var imgurl=this.props.page==1?"url(images/images/audit_2.png)":"url(images/images/audit_1.png)";
        return (
            <div className="repayments"
                style={{display:show}}
            >
                <div className="checkall" onClick={this.btn}>
                    <label>
                        <Checkbox
                        ref="all"
                        checked={this.state.checkall}
                        onChange={this.changeall} 
                        style={{marginRight:"0.2rem"}}
                    />
                    全选</label>
                    {/* <div
                        style={{marginLeft:}}
                    >批量还款</div> */}
                    <span className="allmoney">总计：<span>{this.state.allmoney}元</span></span>
                    <div className="click" onClick={()=>{
                        console.log(this.state)
                    }}>
                        批量还款
                    </div>
                </div>
                <div
                    style={{height:"7rem"}}
                >
                    {list}
                </div>
                
                <Pagination total={Math.ceil(this.state.total/5)}
                 className="custom-pagination-with-icon"
                 style={{display:this.state.showpage?"":"none"}}
                current={this.state.page}
                onChange={(e)=>{
                    this.change(e)
                }}
                locale={{
                prevText: (<span className="arrow-align" onClick={()=>{
                    
                }}>上一页</span>),
                 nextText: (<span className="arrow-align">下一页</span>),
                }}
                /> 
            </div>
        )
    }
})