import {Link} from "react-router";

const List=React.createClass({
    render(){
        return (
            <div className="wyzqlist">
            
                <Link to={this.props.info.path} className="zq_father">
                    <div className="zq_left">
                      <img  src={this.props.info.img} />
                    </div>
                    <div className="zq_right">
                        <p className="wyzqw1">{this.props.info.title}</p>
                        <p className="wyzqw2">{this.props.info.content}</p>
                       
                    </div>
                    <div className="zq_d"><img src="images/images/daikuan_08.gif" /></div>
                </Link>
                
            </div>
        )
    }
})


export default React.createClass({
    componentDidMount(){
        // console.log(this.props.info);
    },
    render(){
        const info=this.props.info.map((con,index)=>{
            return <List key={index} info={con} />
        })
        return (
           <div className="wyzqcnm">
            
            <div className="wyzqflist">
                
                <div className="wyzq_box">
                    {info}
                </div>
                
            </div>
            </div>
        )
    }
})