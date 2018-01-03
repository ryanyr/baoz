import url from "../../config/config";

export default React.createClass({
    componentWillMount(){
      var couponid=this.props.couponid;
      var that=this;
      var data=new FormData();
      data.append("id",couponid);

      fetch(url.url+"/api/act/coupon/queryCouponDetail.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
          console.log(data)    
            that.setState({
              coupon:data.data.couponDetail
            })
        })
    },
    render(){
        return (
            <div className="boxf">
            <div className="box">
              <div className="box2">
                <img src="images/images/yhq_03.gif" />
              </div>
            <p className="boxw1">优惠券额度 40元</p>
            <p className="boxw2">获取时间：2017-12-12</p>
            <p className="boxw2">过期时间：2017-12-12</p>
              <div className="boxbt">立即使用</div>
            </div>
            </div>
        )
    }
})