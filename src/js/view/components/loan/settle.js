import {Link} from "react-router";
import url from "../../config/config";


export default React.createClass({
    componentWillMount(){
        // console.log(set)
        // var data=new FormData();
        // data.append("userId",localStorage.userId);
        // data.append("orderType",3);
        // data.append("page",1);
        // data.append("pageSize",5);
        // fetch(url.url+"/api/act/mine/borrow/list.htm",{
        //     headers:{
        //         token:localStorage.Token
        //     },
        //     method:"POST",body:data})
        //     .then(r=>r.json())
        //     .then((data)=>{
        //         console.log(data);
                
        //     })
    },
    render(){
        var show=this.props.page==3?"":"none"
        return (
            <div className="audit"
                style={{display:show}}
            >   
                {/* <div className="triangle"
                    style={{left:"5.65rem"}}
                >
                    <img src="images/images/triangle.jpg"/>
                </div> */}
                
                <Link className="audit_list" to="already">
                    <div className="price">
                        <p>保险提款2000</p>
                        <p>2017-11-11</p>
                    </div>
                    <span></span>
                    <i
                        style={{background:"url(images/images/right.png)",backgroundSize:"100%",marginLeft:"1.2rem"}}
                    ></i>
                </Link>
            </div>
        )
    }
})