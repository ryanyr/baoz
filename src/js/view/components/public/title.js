import {hashHistory,browserHistory} from "react-router";



export default React.createClass({
    componentWillMount(){
        
    },
    btn(){
        hashHistory.push("qr");
    },
    write(){
        // console.log(1);
        localStorage.writed=true;//填写信息是从修改信息按钮进入
        hashHistory.push("information");
    },
    btn(){
        // console.log(this.props.his)
    },
    btt(){
        hashHistory.push("usecoupon");
    },
    render(){
        var goback=null;
        var show=null;
        var write=null;
        var use=null;
        var tip=null;
        var phone=null;
        if(this.props.back){
            goback=(<div onClick={hashHistory.goBack} className="goback">
                <img src="images/images/back.png" />
            </div>)
        }
        if(this.props.show){
            show=(
                <div className="code" onClick={this.btn}>二维码</div>
            )
        }
        if(this.props.use){
            use=(
                <div className="code" onClick={this.btn}>使用规则</div>
            )
        }
        if(this.props.write){
            write=(
                <div className="write" onClick={this.write}>
                    <img src="images/images/write.png" />
                </div>
            )
        }
        if(this.props.tip){
            tip=(
                <div className="tip" onClick={this.btt}>
                    <img src="images/images/tip.png" />
                </div>
            )
        }
        if(this.props.phone){
            phone=(
                <div className="phone">
                    <img src="images/images/phone.png" />
                </div>
            )
        }
        return (
            <header className="header">
                {goback}
                {this.props.title}
                {show}
                {write}
                {use}
                {tip}
                {phone}
            </header>
        )
    }
})