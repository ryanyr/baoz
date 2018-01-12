import url from "../../config/config";
// import {InputItem,ImagePicker,Toast } from "antd-mobile";
import {hashHistory,browserHistory} from "react-router";
import {Toast} from "antd-mobile";
import store from "../../../store/store";
export default React.createClass({
    getInitialState(){
      return {
        allmoney:"",
        listi:[],
        orderlist:[],
        orderid:""
      }
    },
    componentWillMount(){
      var orderlist=this.props.id.orderid;//订单号
      var orderid=this.props.id.order;//订单id
      console.log(orderlist)
      this.setState({
        allmoney:this.props.id.all,
        orderlist:orderlist,
        orderid:orderid
      })
      var listi=[];//存放订单
      var that=this;
     

      
      var data=new FormData();
      data.append("userId",localStorage.userId);
    
      data.append("orderNo",orderlist);

      fetch(url.url+"/api/act/mine/borrow/orderInfo.htm",{
          headers:{
              token:localStorage.Token
          },
          method:"POST",body:data})
          .then(r=>r.json())
          .then((data)=>{
          // console.log(data)
          that.setState({
            listi:data.data
          })
          // this.state.listi.push(data.data)   
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
              case 150001:    Toast.info('获取订单详情服务超时', 1);
                              break;
              case 150003:    Toast.info('获取订单详情服务失败，请稍后再次尝试', 1);
                              break;
              default:        break;
              }                  
          }).catch(function(e) {
              console.log("Oops, error");
      });
    
    },
    btn(){
        // console.log(this.state)
                    var data=new FormData();//还款
            data.append("orderId",this.state.orderid);
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
                                    // window.location.reload();
                                    store.dispatch({
                                        type:"INFO",
                                        data:3
                                    })
                                    hashHistory.push("loan")
                                    break;
                    case 150005:    Toast.info('还款失败，请稍后再次尝试', 1);
                                    break;
                    case 150006:    Toast.info('还款服务超时，请稍后再次尝试', 1);
                                    break;
                    default:        break;
                    }                     
                })
    },
    render() {
        var list=null;
        // this.state.listi.map((ind)=>{
        //   console.log(1)
        // })
        console.log(this.state.listi)
        for(var i=0;i<this.state.listi.length;i++){
          console.log(this.state.listi[i])
        }
        return (
           <div>
            <div className="batch-top" style={{background:"url(images/images/batch-top.png)",backgroundSize:"100% 100%"}}></div>
            <div className="batch-list">
              <div className="batcha" style={{background:"url(images/images/batcha.png)",backgroundSize:"100% 100%"}}>
                <p className="batchaw">{this.state.allmoney}</p>
                <p className="batchas">还款总额(元)</p>
              </div>
              <div className="batch-list1">
              {
                this.state.listi.map((ind,index)=>{
                  return (
                    <div key={index}>
                        <div
                          style={{height:"0.4rem",lineHeight:"0.4rem",paddingTop:"0.2rem",display:"flex",}}
                        ><span
                          style={{width:"1.4rem",color:"#bcbcbc"}}
                        >订单号</span><span
                          style={{marginLeft:"0.1rem"}}
                        >{ind.orderNo}</span></div>
                    <div className="batch-list2">
                    <div className="batch-list2a">
                       <p  className="batch-list2a1">借款金额</p>
                      <p>应还日期</p>
                     </div>
                    <div className="batch-list2b">
                      <p  className="batch-list2b1">{ind.realAmount}</p>
                       <p>{ind.repayTime.split(" ")[0]}</p>
                     </div>
                    <div className="batch-list2c"></div>
                     <div className="batch-list2d">
                      <p className="batch-list2d1">{ind.repayAmount}.<span className="a">00</span></p>
                       <p className="batch-list2d2">应还金额(元)</p>
                    </div>
                   </div>
                    </div>
                    
                  )
                })
              }
                   
                <div className="batch-button"
                  onClick={this.btn}
                >还款</div>
              </div>  
            </div>
           </div>
    )
  }
})