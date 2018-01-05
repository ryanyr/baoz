import url from "../../config/config";
import QRCode from "qrcode.react";


export default React.createClass({

  getInitialState(){
        return {
            invicode:""
        }
    },
    componentWillMount(){
      var that=this;
      var data=new FormData();
      data.append("userId",localStorage.userId);

      fetch(url.url+"/api/act/mine/qrcode/create.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
          // console.log(data); 
          var data = data.data;
          var invicode = data.substr(data.indexOf("&")+1);   
          // console.log(invicode);
          that.setState({invicode:invicode});                      
        }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    },
    render() {
      var invicode = this.state.invicode;
      var weburl = url.url + "/web/dist/index.html#/home?invicode="+invicode;
      // console.log(weburl);
      return (
        <div className="qr_box">
          <div className="qr_f">
            <div className="content" style={{background:"url(images/images/qrbg3_02.gif)",backgroundSize:"100%"}}>
              <div className="qr_er">
                <div className="qr_erimg">
                  <QRCode value={weburl}/>
                </div>
              </div>
              <p><span>扫描二维码分享</span></p>
              
            </div>
          </div>
        </div>
          
      );
    }
}) 
