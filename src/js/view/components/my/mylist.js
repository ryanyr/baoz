import {Link,hashHistory,browserHistory} from "react-router";
import url from "../../config/config";
import store from "../../../store/store";
const Out=React.createClass({
    componentDidMount(){
        // alert(1)
    },
    render(){
        return (
            <div className="dropout">
                <div className="dropout_left"></div>
                <div className="dropout_right">
                    <span >退出</span>
                </div>
            </div>
        )
    }
})


const List=React.createClass({
    getInitialState(){
        return {

        }
    },
    componentWillMount(){
        // alert(1)
        console.log(store.getState())
        
    },
    render(){
        return (
            <div className="operationlist">
                <Link to={this.props.info.path}>
                    <div className="op_left">
                      <img src={this.props.info.img} />
                    </div>
                    <div className="op_right">
                        <span>{this.props.info.title}</span>

                    </div>
                 <div className="op_d"><img src="images/images/daikuan_08.gif" /></div>
                </Link>
            </div>
        )
    }
})





export default React.createClass({
    getInitialState(){
        return {

        }
    },
    btn(){
        console.log(1);
        window.location.reload()
        hashHistory.push("home");
        localStorage.Login="";
        localStorage.Token="";
        //在用户注销退出时，不必要对用户授信状态改为false，不然下次登录会强制进入授信过程
        // localStorage.credit=false;
    },
    componentWillMount(){
        // this.setState(store.getState().My)
            var that=this;
			var data=new FormData();
			data.append("userId",localStorage.userId);
	  
			fetch(url.url+"/api/act/mine/userInfo/getMyMessage.htm",{
			  headers:{
				  token:localStorage.Token
			  },
			  method:"POST",body:data})
			  .then(r=>r.json())
			  .then((data)=>{
				console.log(data)    
				  that.setState(data.data);
		
			  })

      
      
     
    },
    render(){
        const info=this.props.info.map((con,index)=>{
            return <List key={index} info={con} />
        })
        return (
            <div className="infolist">
               <div className="infobg" style={{background:"url(images/images/my_02.gif)",backgroundSize:"100%"}}>
                <div className="amount_">
                 <p className="amount_y">{this.state.unuse}元</p>
                 <p className="amount_x">剩余授信额度</p>
                </div>
                <div className="amoun_t">
                  <div className="z_amount">
                    <p>总授信额度</p>
                    <p className="x_amount">{this.state.total}元</p>
                  </div>
                  <div className="y_amount">
                    <p>已使用额度</p>
                    <p className="x2_amount">{this.state.used}元</p>
                  </div>
                </div>
                </div>
                <div className="info_box">

            <div className="operationlist">
                <Link to={this.state.userInfo=="已完善"?"perfect":"information"}>
                    <div className="op_left">
                      <img src="images/images/my_03 (1).gif" />
                    </div>
                    <div className="op_right" 
                        style={{position:"relative"}}
                    >
                        <span>个人信息</span>
                        <span
                        style={{position:"absolute",width:"1.5rem",fontSize:"0.26rem",color:"#f99b47",left:"3rem"}}
                        >{this.state.userInfo}</span>
                    </div>
                    
                 <div className="op_d"><img src="images/images/daikuan_08.gif" /></div>
                </Link>
            </div>
            <div className="operationlist">
                <Link to="loan">
                    <div className="op_left">
                      <img src="images/images/my_03 (2).gif" />
                    </div>
                    <div className="op_right">
                        <span>借款信息</span>

                    </div>
                 <div className="op_d"><img src="images/images/daikuan_08.gif" /></div>
                </Link>
            </div>
            <div className="operationlist">
                <Link to="coupon">
                    <div className="op_left">
                      <img src="images/images/my_03 (3).gif" />
                    </div>
                    <div className="op_right">
                        <span>优惠券</span>

                    </div>
                 <div className="op_d"><img src="images/images/daikuan_08.gif" /></div>
                </Link>
            </div>
                <div className="operationlist">
                <Link to="about">
                    <div className="op_left">
                      <img src="images/images/my_03 (4).gif" />
                    </div>
                    <div className="op_right">
                        <span>关于我们</span>

                    </div>
                 <div className="op_d"><img src="images/images/daikuan_08.gif" /></div>
                </Link>
            </div>
            <div className="operationlist">
                <Link>
                    <div className="op_left">
                      <img src="images/images/my_03 (3).gif" />
                    </div>
                    <div className="op_right"
                        style={{position:"relative"}}
                    >
                        <span>邀请码</span>
                        <span
                        style={{fontSize:"0.26rem",color:"#f99b47",position:"absolute",left:"3rem"}}
                    >{this.state.invitationCode}</span>
                    </div>
                    
                 {/* <div className="op_d"><img src="images/images/daikuan_08.gif" /></div> */}
                </Link>
            </div>
            {/* <div className="operationlist">
                <Link onClick={this.btn}>
                    <div className="op_left">
                      <img src="images/images/my_03 (5).gif" />
                    </div>
                    <div className="op_right">
                        <span>退出</span>

                    </div>
                 <div className="op_d"><img src="images/images/daikuan_08.gif" /></div>
                </Link>
            </div> */}
                  
                </div>
                <div onClick={this.btn} style={{width:"90%",height:"1rem",background:"#f99b47",margin:"auto",marginTop:"0.4rem",
                borderRadius:"0.1rem",textAlign:"center",lineHeight:"1rem",color:"#fff",fontSize:"0.32rem"
            }}>
                     退出
                  </div>
            </div>
        )
    }
})