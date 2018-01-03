import {Link} from "react-router";
import url from "../../config/config";


export default React.createClass({
    getInitialState(){
        return {
            list:[],
            createTime:""
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
                console.log(data);
                var info=[];
                // for(var i=0;i<;i++)
                that.setState({
                    list:data.data.list
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
                        style={{background:"url(images/images/right.png)",backgroundSize:"100%",marginLeft:"1.2rem"}}
                    ></i>
                </Link>
                )
            })
        }
        return (
            <div className="audit"
                style={{display:show}}
            >   
                
                {list}
                
            </div>
        )
    }
})