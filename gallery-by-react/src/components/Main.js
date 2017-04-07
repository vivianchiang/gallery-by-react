require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let imgData=require('../data/imgData.json');
imgData=(function (imgArr){
	for(let i=0;i<imgArr.length;i++){
		let singleImg=imgArr[i];
		singleImg.imgUrl=require('../images/'+singleImg.fileName);
		imgArr[i]=singleImg;
	}
	return imgArr;
})(imgData);
/*
 *获取随机数函数
 */
 function getRandom(low,high){
  return Math.floor(Math.random()*(high-low))+low;
 }
class ImgFigure extends React.Component{
  render(){
    let styleObj={};
    if(this.props.arrange.pos){
      styleObj=this.props.arrange.pos;
    }
    return (
        <figure className="img-figure" style={styleObj} ref="figure">
          <img src={this.props.data.imgUrl}
               alt={this.props.data.title}
          />
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
          </figcaption>
        </figure>
    )
  }
};

class AppComponent extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      imgsArrangeArr:[]
    };
    this.Constant={
      centerPos:{
        left:0,
        top:0
      },
      hPosRange:{
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{
        x:[0,0],
        topSecY:[0,0]
      }
    };
  };
  rerange(centerIndex){
    let imgsArrangeArr=this.state.imgsArrangeArr,
        Constant=this.Constant,
        centerPos=Constant.centerPos,
        hPosRangeLeftSecX=Constant.hPosRange.leftSecX,
        hPosRangeRightSecX=Constant.hPosRange.rightSecX,
        hPosRangeY=Constant.hPosRange.y,
        vPosRangeTopY=Constant.vPosRange.topSecY,
        vPosRangeX=Constant.vPosRange.x,
        imgsArrangeTopArr=[],
        topNum=Math.floor(Math.random()*2),
        topSpliceIndex=0,
        imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);
        //设置中间图片信息
        imgsArrangeCenterArr[0].pos=centerPos;
        console.log(Constant);
        //设置上边图片信息
        topSpliceIndex=Math.floor(Math.random()*imgsArrangeArr.length);
        imgsArrangeTopArr=imgsArrangeArr.splice(topSpliceIndex,topNum);
        imgsArrangeTopArr.forEach(function (value,index){
          imgsArrangeTopArr[index].pos={
            left:getRandom(vPosRangeX[0],vPosRangeX[1]),
            top:getRandom(vPosRangeTopY[0],vPosRangeTopY[1])
          }
        })

        //设置左右分区图片信息
        for(let i=0,j=imgsArrangeArr.length,k=j/2;i<j;i++){
          let hPosRangeLorRX=null;
          if(i<k){
            hPosRangeLorRX=hPosRangeLeftSecX;
          }else{
            hPosRangeLorRX=hPosRangeRightSecX;
          }
          imgsArrangeArr[i].pos={
            left:getRandom(hPosRangeLorRX[0],hPosRangeLorRX[1]),
            top:getRandom(hPosRangeY[0],hPosRangeY[1])
          }
        }

        //塞入取出的中间上部元素
        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
        if(imgsArrangeTopArr&&imgsArrangeTopArr[0]){
          imgsArrangeArr.splice(topSpliceIndex,0,imgsArrangeTopArr[0])
        }
        console.log(imgsArrangeArr);
        this.setState({
          imgsArrangeArr:imgsArrangeArr
        });



  };
  componentDidMount (){
    let stageDOM=this.refs.stage,
        imgFigureDOM=this.refs.imgFigure0.refs.figure;
    let stageW=stageDOM.scrollWidth,
        stageH=stageDOM.scrollHeight,
        figureW=imgFigureDOM.scrollWidth,
        figureH=imgFigureDOM.scrollHeight;
    let stageWHalf=Math.floor(stageW/2),
        stageHHalf=Math.floor(stageH/2),
        figureWHalf=Math.floor(figureW/2),
        figureHHalf=Math.floor(figureH/2);
        console.log(figureW);
        this.Constant.centerPos={
          left:stageWHalf-figureWHalf,
          top:stageHHalf-figureHHalf
        };
        this.Constant.hPosRange={
          leftSecX:[-figureWHalf,stageWHalf-3*figureWHalf],
          rightSecX:[stageWHalf+figureWHalf,stageW-figureWHalf],
          y:[-figureHHalf,stageH-figureHHalf]
        };
        this.Constant.vPosRange={
          x:[stageWHalf-figureW,stageWHalf],
          topSecY:[-figureHHalf,stageHHalf-3*figureHHalf]
        }

        this.rerange(0);


  };

  render() {

    let imgFigures=[],
        controllerUnits=[];

    imgData.forEach(function (value,index){
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index]={
          pos:{
            left:0,
            top:0
          }
        }
      }
      imgFigures.push(<ImgFigure data={value} key={index} ref={"imgFigure"+index} arrange={this.state.imgsArrangeArr[index]}/>);
    }.bind(this));

    return (
      <section className="stage" ref="stage">
      	<section className="img-sec">
          {imgFigures}
        </section>
      	<nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
