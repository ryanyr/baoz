import {hashHistory,browserHistory} from "react-router";
export default React.createClass({
  btn1(){
    // console.log(1)
    if(localStorage.Login){
      if(localStorage.userInfo=="未完善"){//判断是否授信成功
				hashHistory.push("information")	
				
			}else{
				hashHistory.push("meloan")			
			}
    }else{
      hashHistory.push("login");
      localStorage.leaveHome="meloan"
    }
  },
  btn2(){
    if(localStorage.Login){
      if(localStorage.userInfo=="未完善"){//判断是否授信成功
				hashHistory.push("information")	
				
			}else{
				hashHistory.push("memoney")			
			}
    }else{
      hashHistory.push("login");
      localStorage.leaveHome="memoney"
    }
  },
    render(){
        return (
          <div className="other_box">
          <div className="other">
            <div className="other_a" onClick={this.btn1}>
              
              <div className="other_b">
               <img src="images/homeimages/wydk.gif"/> 
              </div>
              <p>我要贷款</p>
            </div>
            <div className="other_a" onClick={this.btn2}>
              <div className="other_b">
              <img src="images/homeimages/wyzq.gif"/>
              </div>
              <p>我要赚钱</p>
            </div>
            <div className="other_a" onClick={()=>{
                if(localStorage.Login){
                  if(localStorage.userInfo=="未完善"){//判断是否授信成功
                    hashHistory.push("information")	
                    
                  }else{
                    hashHistory.push("qr")			
                  }
                }else{
                  hashHistory.push("login")
                }
            }}>
              <div className="other_b">
              <img src="images/homeimages/fxqt.gif"/>
              </div>
              <p>推广发现</p>
            </div>
           
          </div>
          </div>
          
        )
    }
})