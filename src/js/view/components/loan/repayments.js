import {  Checkbox } from 'antd-mobile';
import {Link} from "react-router";
import url from "../../config/config";
import {Pagination,Icon} from 'antd-mobile';
export default React.createClass({
    getInitialState(){
        return {
          list:[],
          page:1,
          total:""
        }
    },
    componentWillMount(){
        console.log("re");
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
        data.append("stateList",[40,51,52,55,60]);
        data.append("page",this.state.page);
        data.append("pageSize",5);
        fetch(url.url+"/api/act/mine/borrow/list.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                console.log(data);
                var info=[];
                for(var i=0;i<data.data.list.length;i++){
                    if(data.data.list[i].state=="31"||data.data.list[i].state=="52"||data.data.list[i].state=="60"||data.data.list[i].state=="55"){
                        // data.data.list[i]["info"]="待还款"
                        if(data.data.list[i].state=="40"){
                            data.data.list[i]["info"]="待还款"
                            console.log(data.data.list[i])
                        }
                        else if(data.data.list[i].state=="51"){
                            data.data.list[i]["info"]="减免还款"
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
                
            })
    },
    checkchange(e){
        this.setState({
            checkall:!this.state.checkall
        })
    },
    render(){
        var list=this.state.list.map((ind)=>{
            // console.log(ind)
            return (
                <div className="repayments_list" to="repayment" key={ind}>
                    <Checkbox 
                        style={{marginLeft:"0.2rem"}}
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
                <div className="checkall">
                    <label><Checkbox
                        onChange={this.checkchange} 
                        style={{marginRight:"0.2rem"}}
                    />全选</label>
                    <span className="allmoney">总计：<span>10000元</span></span>
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