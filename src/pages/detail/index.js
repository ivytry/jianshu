import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { DtailWrapper, Header, Content } from './style';
import { connect } from 'react-redux';
import { actionCreator } from './store';

class Detail extends PureComponent{
	render(){
		return (
			<DtailWrapper>
				<Header>{this.props.title}</Header>
				<Content dangerouslySetInnerHTML={{__html:this.props.content}} />
			</DtailWrapper>
		)
	}
	
	componentDidMount(){
		this.props.getDtail(this.props.match.params.id)
	}
}

const mapState = (state) => ({
	title: state.getIn(["detail", "title"]),
	content: state.getIn(["detail", "content"])
})

const mapDispatch = (dispatch) => ({
	getDtail: (id) => {
		dispatch(actionCreator.getDtailData(id))
	}
})

export default connect(mapState, mapDispatch)(withRouter(Detail))