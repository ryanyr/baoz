import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3.2";
import List from "../../components/prefect/list";
import "./style.less";
import url from "../../config/config";
export default React.createClass({
    getInitialState(){
        return {
            
        }
    },
    componentWillMount(){
        var that=this;
			var data=new FormData();
			data.append("userId",localStorage.userId);
	  
			fetch(url.url+"/api/act/mine/userInfo/getMyMessage.htm",{//获取用户的登录信息是否完善
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
                    case 500:    Toast.info('系统错误', 1);
                                    break;
                    case 110001:    Toast.info('服务器响应超时', 1);
                                    break;
                    default:        break;
                }    
				  that.setState(data.data);
			  })
    },
    render:function(){
        return (
            <div className="perfect">
                <Top title="个人信息" back={true} write={this.state.userInfo=="已认证"?false:true}/>
                <List />
                <Footer />
            </div>
        )
    }
})