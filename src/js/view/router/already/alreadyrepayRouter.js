import "./style.less";
import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3.2";


import Content from "../../components/already/content"
export default React.createClass({
    render:function(){
        return (
            <div className="already">
                 <Top title="已还款" back={true} />

                     <Content />

                 <Footer />   
            </div>
        )
    }
})