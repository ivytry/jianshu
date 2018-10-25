import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Recommend extends PureComponent{
	render(){
		return (
			<div>
				{
					this.props.list.map((item) => {
						return (
							<img className="recommendImg" key={item.get("id")} src={item.get("imgUrl")} alt={item.get("id")} />
						)
					})
				}
			</div>
		)
	}
}

const mapState = (state) => ({
	list: state.get("home").get("recommendList")
})

export default connect(mapState, null)(Recommend)