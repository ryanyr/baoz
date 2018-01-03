import Top from "../../components/public/title";
import Search from "../../components/home/search";
import Banner from "../../components/home/homebanner";
import Begin from "../../components/home/homebegin";
import Develop from "../../components/home/homedevelop";
import Footer from "../../components/public/footer_3";
import Kk from "../../components/home/popup";
import List from "../../components/home/homelist";
import "./style.less";
import {add,reduce} from "../../../actions/actions";
import store from "../../../store/store";
import url from "../../config/config";
export default React.createClass({
    getDefaultProps(){
        return {
            title:"首页"
        } 
    },
    componentWillMount(){
               // console.log(1)
            //    console.log(this.props)
		if(localStorage.Login){
			// console.log(1)
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
				store.dispatch({
					type:"HOME",
					data:data.data
				})
                  // console.log(data.data.userInfo)
                //   localStrage.userphone=data.data.
                  localStorage.userInfo=data.data.userInfo;
                  if(data.data.userInfo=="未完善"){
                    console.log("未完善home")
                    localStorage.getCoupon=false;//如果信息未完善,当填写信息的时候,会跳转到优惠券
                  }else{
                    localStorage.getCoupon=true; 
                  }
                //   console.log(localStorage.userInfo)
			  })

      

		}

    },
    render:function(){
        return (
            <div className="home">
                <Top title={this.props.title} ref="nu" back={false} history={this.props.history}/>
                <Banner />
                <Kk />
                <Begin />
                
                <Develop />
               
                <Footer home="true"/>
            </div>
        )
    }
})