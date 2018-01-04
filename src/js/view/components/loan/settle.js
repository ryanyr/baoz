import {Link} from "react-router";
import url from "../../config/config";
import {Pagination,Icon} from 'antd-mobile';

export default React.createClass({
    getInitialState(){
        return {
            list:[],
            createTime:"",
            showpage:false,
            page:1,
            total:"",
        }
    },
    componentWillMount(){
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
        data.append("stateList",[50]);
        data.append("page",1);
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
                console.log(data);
                var info=[];
                // for(var i=0;i<;i++)
                that.setState({
                    list:data.data.list,
                    total:data.data.pageInfo.total
                })
                
            })
    },
    render(){
        var show=this.props.page==3?"":"none";
        var list=null;
        console.log(this.state.list)
        if(this.state.list.length>0){
            list=this.state.list.map((ind,index)=>{
                return (
                <Link className="audit_list" to={{pathname:"already",query:{id:ind.orderNo}}} key={index}>
                    <div className="price">
                        <p>保险提款{ind.amount}</p>
                        <p>{ind.createTime.split(" ")[0]}</p>
                    </div>
                    <span></span>
                    <i
                        style={{background:"url(images/images/right.png)",backgroundSize:"100%",marginLeft:"0.3rem"}}
                    ></i>
                </Link>
                )
            })
        }
        return (
            <div className="audit"
                style={{display:show}}
            >   
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