import {  Checkbox } from 'antd-mobile';
import {Link,hashHistory} from "react-router";
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
          li0:false,
          li1:false,
          li2:false,
          li3:false,
          li4:false,
          changelist:[true,false],
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
            checkall:!this.state.checkall,
            orders:[],
            moneylist:[],
            allmoney:0
        })
        setTimeout(()=>{
            if(e.target.checked){//当全选框的状态是true时,把所有的状态都改为true
                this.setState({
                    li0:true,
                    li1:true,
                    li2:true,
                    li3:true,
                    li4:true,
                })
                all=this.state.list.length
                var allmoney=0;//先把总金额设置为0
                for(var i=0;i<this.state.list.length;i++){//再把订单号和每笔订单的金额都加进状态
                    this.state.moneylist.push(this.state.list[i].repayAmount);
                    this.state.orders.push(this.state.list[i].orderId);
                    allmoney+=this.state.list[i].repayAmount  //计算总金额             
                }
                
                this.setState({
                    allmoney:allmoney
                })
            }else{//当全选为空时,把所有的状态改为false
                all=0;//把all标记也改为0
                this.setState({
                    li0:false,
                    li1:false,
                    li2:false,
                    li3:false,
                    li4:false,
                    orders:[],
                    moneylist:[],
                    allmoney:0
                }) 
            }
        },100)

    },
    change(e){//获取列表
        all=0;//翻页也要设置为空
                this.setState({
                    li0:false,
                    li1:false,
                    li2:false,
                    li3:false,
                    li4:false,
                    orders:[],
                    moneylist:[],
                    allmoney:0,
                    checkall:false,//把全选按钮状态也改为空
                })
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
        var li=e.target.value;
        if(index==0){
            this.setState({
                li0:e.target.checked
            })
        }
        if(index==1){
            this.setState({
                li1:e.target.checked
            })
        }
        if(index==2){
            this.setState({
                li2:e.target.checked
            })
        }
        if(index==3){
            this.setState({
                li3:e.target.checked
            })
        }
        if(index==4){
            this.setState({
                li4:e.target.checked
            })
        }       
        var that=this;
        if(e.target.checked==true){
            
            this.state.orders[index]=ind.orderId;//分别在数组加入金额和订单号
            this.state.moneylist[index]=ind.repayAmount;
            all++;
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
    allpay(){//批量还款
        var newlist=[]
        for(var i=0;i<this.state.orders.length;i++){
            if(this.state.orders[i]>0){
                newlist.push(this.state.orders[i])
            }
        }
        let orders=newlist.join(",");
        if(this.state.allmoney=="0"){
            Toast.info("您还没有选择要还款的订单", 2);
        }else{
            var data=new FormData();//还款
            data.append("orderId",orders);
            data.append("userId",localStorage.userId);
            fetch(url.url+"/api/act/pay/repayment/repay.htm",{
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
                    case 500:    Toast.info('服务器错误', 1);
                                    break;
                    case 150004:    Toast.info('您已还款成功', 1);
                                    window.location.reload();
                                    store.dispatch({
                                        type:"INFO",
                                        data:3
                                    })
                                    // hashHistory.push("loan")
                                    break;
                    case 150005:    Toast.info('还款失败，请稍后再次尝试', 1);
                                    break;
                    case 150006:    Toast.info('还款服务超时，请稍后再次尝试', 1);
                                    break;
                    default:        break;
                    }                     
                })
        }
    },
    render(){
        var list=this.state.list.map((ind,index)=>{
            return (
                <div  className="repayments_list" to="repayment" key={index} ref="nu">
                    <Checkbox 
                        ref="nu1"
                        id=""
                        style={{marginLeft:"0.2rem"}}
                        value={`li${index}`}
                        checked={this.state[`li${index}`]}
                        onChange={(e)=>{
                            // console.log(e.target.value)
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
                    <div className="click" onClick={this.allpay}>
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