import Top from "../../components/public/title";
import Footer from "../../components/public/footer_3.2";
import List from "../../components/prefect/list";
import "./style.less";

export default React.createClass({
    render:function(){
        return (
            <div className="perfect">
                <Top title="个人信息" back={true} write={true}/>
                <List />
                <Footer />
            </div>
        )
    }
})