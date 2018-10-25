import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';

class Topic extends PureComponent{
  	constructor(props) {
    	super(props);
    	this.next = this.next.bind(this);
    	this.previous = this.previous.bind(this);
  	}

  	next() {
    	this.slider.slick.slickNext();
  	}

  	previous() {
    	this.slider.slick.slickPrev();
  	}

	render(){
		const { handleMouseMove, slideTo } = this.props
		return (
			<div className="carousel" onMouseEnter={() => { handleMouseMove(slideTo) }} onMouseLeave={() => {handleMouseMove(slideTo) }}>
				<Carousel autoplay ref={c => (this.slider = c)}>
					{
						this.props.list.map((item) => {
							return (
								<div key={item.get("id")}>
									<a href=""><img width="625" src={item.get("imgUrl")} /></a>
								</div>
							)
						})
					}
			    </Carousel>
			    <div style={{ textAlign: "center" }}>
		          	<a className="goto prev" onClick={this.previous}>
		            	<i className="iconfont">&#xe645;</i>
		          	</a>
		          	<a className="goto next" onClick={this.next}>
		            	<i className="iconfont">&#xe646;</i>
		          	</a>
		        </div>
	        </div>
		)
	}
}

const mapState = (state) => ({
	list: state.get("home").get("bannerList"),
	slideTo: state.get("home").get("slideTo")
})

const mapDispatch = (dispatch) => ({
	handleMouseMove: (slideTo) => {
		dispatch(actionCreator.changeSlideTo(!slideTo))
	}
})

export default connect(mapState, mapDispatch)(Topic)