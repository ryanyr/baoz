import {Link} from "react-router";
import url from "../../config/config";
import {Pagination,Icon} from 'antd-mobile';
import store from "../../../store/store";
export default React.createClass({
    getInitialState(){
        return {
            list:[],
            list1:[],
            total:"",
            page:1,
            showpage:false
        }
    },
    componentWillMount(){
        // if(store.getState().)
        console.log(store.getState().LIST_1.page)
        if(store.getState().LIST_1.total){
            console.log("有")
            this.setState(store.getState().LIST_1);
            this.change(store.getState().LIST_1.page)
            // console.log(this.state.page)
        }else{
            this.change(this.state.page)
        }
        
        
        
    },
    componentWillUnmount(){
        console.log(1)
        var that=this;
        store.dispatch({
            type:"LIST_1",
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
        data.append("stateList",[10,20,30,21,31,32,41]);
       
       
        data.append("page",e);
        data.append("pageSize",5);
        fetch(url.url+"/api/act/mine/borrow/list.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                console.log(data);
                if(data.data.list.length>0){
                    that.setState({
                        showpage:true
                    })
                }
                // if(data.state.)
                var info=[];
                for(var i=0;i<data.data.list.length;i++){
                    if(data.data.list[i].state=="10"||data.data.list[i].state=="20"||data.data.list[i].state=="21"||data.data.list[i].state=="30"||data.data.list[i].state=="31"||data.data.list[i].state=="32"){
                        
                        if(data.data.list[i].state=="10"){
                            data.data.list[i]["info"]="审核中"
                            console.log(data.data.list[i])
                        }else if(data.data.list[i].state=="20"){
                            data.data.list[i]["info"]="人工审核通过"
                        }
                        else if(data.data.list[i].state=="21"){
                            data.data.list[i]["info"]="人工审核未通过"
                        }
                        else if(data.data.list[i].state=="30"){
                            data.data.list[i]["info"]="待放款审核"
                        }
                        else if(data.data.list[i].state=="31"){
                            data.data.list[i]["info"]="放款审核通过"
                        }
                        else if(data.data.list[i].state=="32"){
                            data.data.list[i]["info"]="放款审核未通过"
                        }
                        else if(data.data.list[i].state=="41"){
                            data.data.list[i]["info"]="放款失败"
                        }
                        info.push(data.data.list[i]);
                    }
                }
                that.setState({list:info,total:data.data.pageInfo.total
                })
                console.log(info)
            })
    },
    render(){
        var list=null;
        if(this.state.list.length>0){
            list=this.state.list.map((ind,index)=>{
                return (
                    <Link to={{pathname:"txing",query:{orderId:ind.orderNo,state:ind.state}}} className="audit_list" key={index}>
                                <div className="price">
                                <p>{ind.realAmount}</p>
                                <p>{ind.createTime.split(" ")[0]}</p>
                                </div>
                                <span>{ind.info}</span>
                                <i
                                    style={{background:"url(images/images/right.png)",backgroundSize:"100%"}}
                                ></i>
                            </Link>
                )
            })
        }
        var show=this.props.page==1?"":"none";
        return (
            <div className="audit"
                style={{display:show}}
            >   <div
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