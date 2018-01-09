import {  Checkbox } from 'antd-mobile';
import {Link} from "react-router";
import url from "../../config/config";
import {Pagination,Icon,Toast} from 'antd-mobile';
import store from "../../../store/store";
export default React.createClass({
    getInitialState(){
        return {
          list:[],
          page:1,
          total:"",
          showpage:false,
          checkall:true,
          num:0,
          oders:[]
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
    change(e){
        this.setState({
            page:e
        })
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
        data.append("stateList",[40,31,52,55,60]);
        data.append("page",e);
        data.append("pageSize",5);
        fetch(url.url+"/api/act/mine/borrow/list.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                if(data.data.list.length>0){
                    that.setState({
                        showpage:true
                    })
                }

                var info=[];
                for(var i=0;i<data.data.list.length;i++){
                    if(data.data.list[i].state=="31"||data.data.list[i].state=="52"||data.data.list[i].state=="60"||data.data.list[i].state=="55"){
                        // data.data.list[i]["info"]="待还款"
                        if(data.data.list[i].state=="40"){
                            data.data.list[i]["info"]="待还款"
                            console.log(data.data.list[i])
                        }
                        else if(data.data.list[i].state=="31"){
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
    checkchange(e){
        // console.log(this.state.checkall)
        console.log(e.target.checked)
        this.setState({
            checkall:!this.state.checkall
        })
    },
    changelist(e,ind,index){
        if(e.target.value){
            console.log(1)
            this.setState({

            })
        }
    },
    btn(){
        console.log(this.refs.nu)
    },
    render(){
        var list=this.state.list.map((ind,index)=>{
            return (
                <div className="repayments_list" to="repayment" key={index} ref="nu">
                    <Checkbox 
                        style={{marginLeft:"0.2rem"}}

                        onChange={(e)=>{
                            this.changelist(e,ind,index)
                        }}
                    />
                    <div className="info_left">
                        <p>{ind.createTime.split(" ")[0]}</p>
                        <p>{ind.amount}元</p>
                    </div>
                    <div className="info_right">
                        <p>应还</p>
                        <p>{ind.realAmount+ind.serviceFee}元</p>
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
                    <label><Checkbox
                        checked={this.state.checkall}
                        onChange={this.checkchange} 
                        style={{marginRight:"0.2rem"}}
                    />全选</label>
                    <span className="allmoney">总计：<span>0元</span></span>
                    <div className="click">
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