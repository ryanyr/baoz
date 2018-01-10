import {InputItem,ImagePicker,Toast } from "antd-mobile";
import url from "../../config/config";
import $ from "jquery";
// import EXIF from "exif-js";
import {compress} from "../../../utils/imgCompress";


export default React.createClass({
    getInitialState(){
        return {
            name:"",
            phone:localStorage.Phone,
            idcard:"",
            files:[],
            imgurl:"images/images/icon_08.jpg",
            imgurl2:"images/images/icon_06.jpg",
            imgurl3:"images/images/icon_07.jpg",
            upimg1:"",
            upimg2:"",
            upimg3:""
        }
    },
    btn(){
      //保存身份接口
        if(!/^[\u4e00-\u9fa5]{2,4}/g.test(this.state.name)){
            Toast.info("请输入正确的用户名", 2);
        }else if(!this.state.idcard){
            Toast.info("请输入身份证", 2);
        }else if(!this.state.upimg1||!this.state.upimg2||!this.state.upimg3){
            Toast.info("请上传身份证照片", 2);
        }else{
        var that=this;
        var data=new FormData();
        data.append("backImg",this.state.upimg2);
        data.append("frontImg",this.state.upimg1);
        data.append("livingImg",this.state.upimg3);
        data.append("idNo",this.state.idcard);
        data.append("phone",this.state.phone);
        data.append("realName",this.state.name);
        data.append("userId",localStorage.userId);
        fetch(url.url+"/api/act/mine/userInfo/save.htm",{
        headers:{
            token:localStorage.Token
        },
        method:"POST",body:data})
        .then(r=>r.json())
        .then((data)=>{
            
            if(data.code=="200"){
                that.props.step(2)
            }else if(data.code=="400"){
                Toast.info(data.msg, 2);
            }
        }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
        });
    }
    },
    step(e){
        e.nativeEvent.preventDefault();
    },
    componentWillMount(){
        // console.log(Boolean(sessionStorage.step))
        if(sessionStorage.step){
            
            this.setState(JSON.parse(sessionStorage.step))
        }
        
    },
    componentWillUnmount(){
        sessionStorage.step=JSON.stringify(this.state);
    },
    upimg(files){
        var that=this;
        return new Promise(function(suc,err){ 
        var data=new FormData();

        /* //此处图片进行压缩,写入image异步onload中
        var img = new Image();
        img.onload = ()=>{
            var compressImg = compress(img);
            data.append("img",compressImg);     
                   
            fetch(url.url+"/api/act/mine/userInfo/saveImg.htm",{
                headers:{
                    token:localStorage.Token
                },
                method:"POST",body:data})
                .then(r=>r.json())
                .then((data)=>{
                    console.log(data);
                    if(!data.data){
                        Toast.info("图片上传错误", 2);
                    }                    
                    suc(data)
                
            }).catch(function(e) {
                console.log("Oops, error");
                Toast.info("服务器响应超时", 2);
            });
            
        } 
        img.src = files[0].url;
        // console.log(img)     
        //图片压缩结束  */  

        data.append("img",files[0].url);     
                   
        fetch(url.url+"/api/act/mine/userInfo/saveImg.htm",{
            headers:{
                token:localStorage.Token
            },
            method:"POST",body:data})
            .then(r=>r.json())
            .then((data)=>{
                console.log(data);
                if(!data.data){
                    Toast.info("图片上传错误", 2);
                }                    
                suc(data)
            
        }).catch(function(e) {
            console.log("Oops, error");
            Toast.info("服务器响应超时", 2);
        });

        // return p;
    })
        
             
    },
    onChange(files, type, index){
        var that=this;
        this.upimg(files).then((data)=>{
            // var img = new Image();
            // var imgurl = "imgurl";
            // img.src = files[0].url;
            // var newimg = that.handelImg(img,1);
            that.setState({
                // imgurl:files[0].url,
                imgurl:data.data,
                upimg1:data.data
            });
        })
                    
      },
    onChange2(files, type, index){
        var that=this;
        this.upimg(files).then((data)=>{
            that.setState({
                // imgurl2:files[0].url,
                imgurl2:data.data,
                upimg2:data.data
            })
        })
      },
    onChange3(files, type, index){
        var that=this;
        this.upimg(files).then((data)=>{
            that.setState({
                // imgurl3:files[0].url,
                imgurl3:data.data,
                upimg3:data.data
            })
        })
      },   
    handelImg(image,imgurl){
        var that = this;
        //此处进行图片旋转的判断处理
        var width = image.width;
        var height = image.height;
        var canvas = document.createElement("canvas")
        var ctx = canvas.getContext('2d');
        var newImage = new Image();
        EXIF.getData(image,function () {
            var orientation = EXIF.getTag(this,'Orientation');
            // orientation = 6;//测试数据
            console.log('orientation:'+orientation);
            switch (orientation){
                //正常状态
                case 1:
                    console.log('旋转0°');
                    alert('旋转0°');
                    // canvas.height = height;
                    // canvas.width = width;
                    newImage = image;
                    break;
                //旋转90度
                case 6:
                    console.log('旋转90°');
                    alert('旋转90°');
                    canvas.height = width;
                    canvas.width = height;
                    ctx.rotate(Math.PI/2);
                    ctx.translate(0,-height);
                    ctx.drawImage(image,0,0)
                    imageDate = canvas.toDataURL('Image/jpeg',1)
                    newImage.src = imageDate;
                    break;
                //旋转180°
                case 3:
                    console.log('旋转180°');
                    alert('旋转180°');
                    canvas.height = height;
                    canvas.width = width;
                    ctx.rotate(Math.PI);
                    ctx.translate(-width,-height);
                    ctx.drawImage(image,0,0)
                    imageDate = canvas.toDataURL('Image/jpeg',1);
                    newImage.src = imageDate;
                    break;
                //旋转270°
                case 8:
                    console.log('旋转270°');
                    alert('旋转270°');
                    canvas.height = width;
                    canvas.width = height;
                    ctx.rotate(-Math.PI/2);
                    ctx.translate(-height,0);

                    ctx.drawImage(image,0,0)
                    imageDate = canvas.toDataURL('Image/jpeg',1)
                    newImage.src = imageDate;
                    break;
                //undefined时不旋转
                case undefined:
                    console.log('undefined  不旋转');
                    alert('undefined  不旋转');
                    newImage = image;
                    break;
                }
            }
        );
        alert(newImage.src);
        switch(imgurl){            
            case 1: that.setState({
                        imgurl:newImage.src
                    });
                    break;
            case 2: that.setState({
                        imgurl2:newImage.src
                    });
                    break;
            case 3: that.setState({
                        imgurl3:newImage.src
                    });
                    break;
            default: break;
        }
        
        // return newImage;
    },
    render(){
        const {files}=this.state;
        var showbox=this.props.page==1?"":"none";
        return (
            <div className="step_1"  style={{display:showbox}}>
                <div className="title">
                    <img src="images/images/title_2.jpg" />
                </div>
                    <div className="con">
                    <div className="tip">
                        <i
                            style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                        ></i>
                        基本信息
                    </div>    
                    <div className="price">
                        <div className="top">
                            <span>姓名</span><InputItem 
                            style={{height:"0.52rem",fontSize:"0.28rem"}}
                            value={this.state.name}
                            onChange={(e)=>{
                                this.setState({
                                    name:e
                                })
                            }}
                            placeholder="请输入个人姓名" />
                        </div>
                        <div className="top">
                            <span>手机号</span><InputItem
                            value={this.state.phone}
                            
                            style={{height:"0.52rem",fontSize:"0.28rem"}}
                            placeholder="请输入个人手机号" />
                        </div>
                    </div>
                    <div className="tip_2">
                        <i
                            style={{background:"url(images/images/icon_05.png)",backgroundSize:"100%"}}
                        ></i>
                        上传身份证照片
                    </div>
                    {/* <div>{this.state.upimg1}</div> */}
                    <div className="price">
                        <div className="top">
                            <span>身份证号码</span><InputItem
                            value={this.state.idcard}
                            onChange={(e)=>{
                                this.setState({
                                    idcard:e
                                })
                            }} 
                           
                            style={{height:"0.52rem",fontSize:"0.28rem"}}
                            placeholder="请输入身份证号码" />
                        </div>
                        <div className="top">
                            <span
                                style={{width:"100%"}}
                            >上传身份证照片</span>
                        </div>
                        <div className="uplist">
                            <div 
                                style={{position:"relative"}}
                            >
                                <img src={this.state.imgurl}/>
                                <p>身份证正面</p>
                                <ImagePicker
                                style={{position:"absolute",top:"0",left:"0",width:"6rem",height:"5rem",opacity:"0"}}
                                files={files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length <2}
                                />
                            </div>
                            <div
                                style={{position:"relative"}}
                            >
                                <img src={this.state.imgurl2}/>
                                <p>身份证反面</p>
                                <ImagePicker
                                style={{position:"absolute",top:"0",left:"0",width:"6rem",height:"5rem",opacity:"0"}}
                                files={files}
                                onChange={this.onChange2}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length <1}
                                />
                            </div>
                            <div
                                style={{position:"relative"}}
                            >
                                <img src={this.state.imgurl3}/>
                                <p>手持身份证</p>
                                <ImagePicker
                                style={{position:"absolute",top:"0",left:"0",width:"6rem",height:"5rem",opacity:"0"}}
                                files={files}
                                onChange={this.onChange3}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length <1}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="next">
                        <input type="button" value="下一步" onClick={
                            this.btn
                            } />
                    </div>
                </div>
                
            </div>
        )
    }
})
