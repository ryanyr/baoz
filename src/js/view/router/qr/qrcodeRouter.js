import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3";
import Counte from "../../components/qr/qrcontent";
import "./style.less";
export default React.createClass({
    render:function(){
        return (
            <div className="qr">
                <Top title="商户二维码" back="true"/>
                <Counte />
                <Footer />
            </div>
            
        )
    }
})