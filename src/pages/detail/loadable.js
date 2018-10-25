import React from 'react';
import Loadable from 'react-loadable';
// import Loading from './my-loading-component';

const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading: () => {
  	return <div>loading</div>
  }
});

export default class App extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}