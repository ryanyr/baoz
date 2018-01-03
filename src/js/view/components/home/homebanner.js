import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';


export default React.createClass({
    getInitialState(){
        return {
            imgurl:["images/homeimages/banner.gif"]
        }
    },
    render(){
        var imglist=this.state.imgurl.map((ii)=>{
            return <img key={ii} src={ii} />
        })
        return (
            <div className="banner">           
                {/* <Carousel  */}
                {/* dots={false}
                //  autoplay={true}
                //  infinite={true}
                 selectedIndex={0}
                //  beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                //  afterChange={index => console.log('slide to', index)} 
                > */}
                {imglist}
                {/* </Carousel> */}
            </div>
        )
    }
})


