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

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
      	<section className="img-sec"></section>
      	<nav className="controller-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
