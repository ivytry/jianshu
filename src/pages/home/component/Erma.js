import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ErmaWrapper } from '../style';

class Erma extends PureComponent{
	render(){
		return (
			<ErmaWrapper>
				<img src={this.props.erma.get("imgUrl")} alt={this.props.erma.get("title")}/>
				<div className="right">
					<div className="title">{this.props.erma.get("title")}</div>
					<p>{this.props.erma.get("content")}</p>
				</div>
			</ErmaWrapper>
		)
	}
}

const mapState = (state) => ({
	erma: state.get("home").get("erma")
})

export default connect(mapState, null)(Erma)