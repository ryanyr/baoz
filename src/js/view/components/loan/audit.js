import {Link} from "react-router";
import url from "../../config/config";
export default React.createClass({
    getInitialState(){
        return {
            list:[],
            list1:[]
        }
    },
    componentWillMount(){
        // console.log(localStorage.userId)
        var that=this;
        var data=new FormData();
        data.append("userId",localStorage.userId);
        data.append("stateList",[10,20,30]);
        // data.append("orderType","10");
        data.append("page",1);
        data.append("pageSize",10);
        fetch(url.url+"/api/act/mine/borrow/list.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                console.log(data);
                // if(data.state.)
                var info=[];
                for(var i=0;i<data.data.list.length;i++){
                    if(data.data.list[i].state=="10"||data.data.list[i].state=="20"||data.data.list[i].state=="21"||data.data.list[i].state=="30"||data.data.list[i].state=="31"||data.data.list[i].state=="32"){
                        
                        if(data.data.list[i].state=="10"){
                            data.data.list[i]["info"]="审核中"
                            console.log(data.data.list[i])
                        }else if(data.data.list[i].state=="20"){
                            data.data.list[i]["info"]="审核通过"
                        }
                        info.push(data.data.list[i]);
                    }
                }
                that.setState({list:info})
                console.log(info)
            })
    },
    btn(){
        console.log(this.state)
    },
    render(){
        // console.log(this.state);
        var list=null;
        if(this.state.list.length>0){
            // console.log(1)
            list=this.state.list.map((ind,index)=>{
                // console.log(ind)
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
                    // <div key={index}>{ind.amount}</div>
                )
            })
        }
        // console.log(list)
        var show=this.props.page==1?"":"none";
        return (
            <div className="audit"
                style={{display:show}}
            >
                {/* <div className="triangle" onClick={this.btn}>
                    <img src="images/images/triangle.jpg"/>
                </div> */}
                {list}
                {/* {
                    this.state.list.map((ind)=>{
                        return (
                            <Link to={{pathname:"txing",query:{orderId:ind.orderNo}}} className="audit_list" key={ind}>
                                <div className="price">
                                <p>{ind.realAmount}</p>
                                <p>{ind.createTime.split(" ")[0]}</p>
                                </div>
                                <span>审核中</span>
                                <i
                                    style={{background:"url(images/images/right.png)",backgroundSize:"100%"}}
                                ></i>
                            </Link>
                        )
                    })
                } */}
                {/* <Link to="txing" className="audit_list">
                    <div className="price">
                        <p>保险提款2000</p>
                        <p>2017-11-11</p>
                    </div>
                    <span>审核中</span>
                    <i
                        style={{background:"url(images/images/right.png)",backgroundSize:"100%"}}
                    ></i>
                </Link> */}
            </div>
        )
    }
})