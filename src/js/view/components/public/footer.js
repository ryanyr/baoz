import {Link} from "react-router";
export default React.createClass({
    render(){
        return (
            <footer className="footer_1">
                <Link to="home" className="home">
                <div className="homeicon"
                    style={{background:"url(images/images/home_1.png) 0% 0% /100%",width:"0.5rem",height:"0.5rem"}}
                ></div>
                <p>首页</p>
                </Link>
                <Link to={localStorage.Login?"my":"login"} className="my">
                <div
                    style={{background:"url(images/images/my_1.png) 0% 0% /100%"}}
                ></div>
                <p>我的</p>
                </Link>
            </footer>
        )
    }
})