import { Button } from 'antd-mobile';
import url from "../../config/config";
import {hashHistory} from "react-router";
export default React.createClass({
    getInitialState(){
      return {
        page:1,
        coupon:[],
        usedcoupon:[]
      }
    },
    componentWillMount(){
      var that=this;
      var data=new FormData();
      data.append("couponType",1);
      data.append("page",1);
      data.append("pageSize",5);
      data.append("userId",localStorage.userId);
      fetch(url.url+"/api/act/coupon/query.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
          console.log(data)    
            that.setState({
              coupon:data.data.list
            })
        })
        var newdata=new FormData();
        newdata.append("couponType",2);
        newdata.append("page",1);
        newdata.append("pageSize",5);
        newdata.append("userId",localStorage.userId);
        fetch(url.url+"/api/act/coupon/query.htm",{
          headers:{
              token:localStorage.Token
          },
          method:"POST",body:newdata})
          .then(r=>r.json())
          .then((data)=>{
            console.log(data)    
              that.setState({
                usedcoupon:data.data.list
              })
          })
    },
    render(){
        const showuse=this.state.page==1?"":"none";
        const showused=this.state.page==2?"":"none";
        var imgleft=this.state.page==1?"url(images/images/money_1.png) 0% 0% /100%":"url(images/images/money_2.png) 0% 0% /100%";
        var imgright=this.state.page==2?"url(images/images/money_4.png) 0% 0% /100%":"url(images/images/money_3.png) 0% 0% /100%";
        return (
            <div className="content">
              <div className="title">
                <div className={this.state.page==1?"active":""} onClick={()=>{this.setState({page:1})}}>
                  <i
                  style={{background:imgleft,width:"0.52rem",height:"0.35rem"}}
                  ></i>
                  <span>可使用</span>
                </div>
                <div className={this.state.page==2?"active":""} onClick={()=>{this.setState({page:2})}}>
                  <i
                  style={{background:imgright}}
                  ></i>
                  <span>已使用/已过期</span>
                </div>
              </div>
               {
                this.state.coupon.map((ind)=>{
                  return <div className="use"
                  key={ind}
                  style={{display:showuse}}
                  onClick={
                    ()=>{hashHistory.push({path:"getcoupon",query:{couponid:ind.amount}
                  })
                  }
                  }
                >
                  <div className="use_con"
                  style={{background:"url(images/images/coupon_1.png)",backgroundSize:"100%"}}
                  >
                    <div className="left">
                      <span>¥</span><span>{ind.amount}</span>
                    </div>
                    <div className="right">
                      <p>{ind.couponName}</p>
                      <p>有效期至：{ind.validEndTime.split(" ")[0]}</p>
                    </div>
                  </div>
                </div>
                })
              }
              {/* <div 
                onClick={()=>{hashHistory.push({pathname:"getcoupon",query:{couponid:11}})}}
              >1111</div> */}
              {
                this.state.usedcoupon.map((ind)=>{
                  return <div className="used"
                  key={ind}
                  style={{display:showused}}
                >
                  <img src="images/images/used.png" />
                  <div className="use_con"
                  style={{background:"url(images/images/coupon_2.png)",backgroundSize:"100%"}}
                  >
                    <div className="left">
                      <span>¥</span><span>{ind.amount}</span>
                    </div>
                    <div className="right">
                      <p>{ind.couponName}</p>
                      <p>有效期至：{ind.validEndTime}</p>
                    </div>
                  </div>
                </div>  
                })
              }
                           
            </div>
        )
    }
})
