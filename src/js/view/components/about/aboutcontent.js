import { Button } from 'antd-mobile';
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';




export default React.createClass({
    getInitialState(){
        return {

        }
    },
    updateView(){
 
        
    },
    getDefaultProps(){
        return {

        }
    },
    componentWillMount(){

        
    },
    componentDidMount(){


       
    },
    componentWillUnmount(){
 
        
    },
    onChange(files, type, index){

      },
    change(w){

    },
    getall(){

    },
    btn2(){

    },
    render(){

        const list=null;
        const {files}=this.state;
        return (
            <div className="aboutf">
                <div className="content">
                    <div className="abbg">
                        <img src="images/images/about_03.gif" />
                        
                    </div>
                    <div
                        style={{textAlign:"center",height:"0.6rem",lineHeight:"0.6rem",fontSize:"0.26rem"}}
                    >v1.0.0</div>
                    <p><span className="aboutwa">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保赚</span>是小蜜蜂集团旗下的独立的保险经纪业务品牌。专精于为保险经理人提供各种理财规划、财富传承及个人保障相关的保险产品和服务。</p>
                    <p><span className="aboutwa">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;严谨的专业团队： </span>保赚经纪团队成员拥有北美精算学会注册精算师（FSA）、特许金融分析师（CFA）、认可财务策划师（CFP）等专业资格，并多年保险服务经验。</p>
                    <p><span className="aboutwa">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一站式透明服务： </span>团队以客户需求为本，为客户提供含投保交易的一站式保险综合服务：打破保险公司与客户之间的信息不对等而造成的高额中间人成本，及索赔难的现象。</p>
                    <p><span className="aboutwa">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;集约型人性配置： </span>建立完善的筛选机制，帮助客户高效、便捷的找到适合的产品；避免过度保险和资源浪费，为客户提供“刚刚好”的产品组合；并在产品的传承方式、分配方式、提取、缴付时间及金额等方面基于客户更多的选择空间。</p>
                </div>
            </div>
        )
    }
})