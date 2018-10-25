import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import Header from './common/header';
import Login from './pages/login';
import Home from './pages/home';
import Detail from './pages/detail/loadable';

class App extends PureComponent {
	render(){
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/login" component={Login} />
						<Route exact path="/" component={Home} />
						<Route exact path="/detail/:id" component={Detail} />
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App