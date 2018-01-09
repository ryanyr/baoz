import {Link} from "react-router";
import url from "../../config/config";
import {Pagination,Icon,Toast} from 'antd-mobile';
import store from "../../../store/store";
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
        console.log(store.getState().LIST_3)
        if(store.getState().LIST_3.total){
            this.setState(store.getState().LIST_3);
            this.change(store.getState().LIST_3.page)

        }else{
            this.change(this.state.page)
        }
    },
    componentWillUnmount(){
        var that=this;
        store.dispatch({
            type:"LIST_3",
            data:{
                total:that.state.total,
                page:that.state.page
            }
        })
    },
    change(e){
        this.setState({//改变页数的时候们也要设置对应状态,卸载时保存进reduce
            page:e
        })
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
        data.append("stateList",[50]);
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
                // for(var i=0;i<;i++)
                that.setState({
                    list:data.data.list,
                    total:data.data.pageInfo.total
                })
                
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    render(){
        var show=this.props.page==3?"":"none";
        var list=null;
        if(this.state.list.length>0){
            list=this.state.list.map((ind,index)=>{
                return (
                <Link className="audit_list" to={{pathname:"already",query:{id:ind.orderNo}}} key={index}>
                    <div className="price">
                        <p>{ind.amount}</p>
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