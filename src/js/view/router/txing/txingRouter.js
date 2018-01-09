import "./style.less";
import Top from "../../components/public/title";
import Add from "../../components/txing/txingcontent"
import Footer from "../../components/public/footer_3";
export default React.createClass({
    
    // componentWillMount(){
    //     console.log(this.props.location.query)
    // },
    render:function(){
        return (
            <div className="txing">
             <Top back="true" title="订单详情"/>
             <Add qu={this.props.location.query} />
             <Footer />
            </div>
        )
    }
})