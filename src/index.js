import React from 'react';
import ReactDOM from 'react-dom';
import {
	HashRouter,
	Route
} from 'react-router-dom';
import {
	Provider
} from 'react-redux';
import store from './store.js';
import Home from './Home/container.js';
import Search from './Search/container.js';
import OtherHome from './OtherHome/container.js';
import ItemDetail from './ItemDetail/index.js';
import PublishList from './PublishList/index.js';
import History from './History/index.js';
import Collect from './Collect/index.js';
import MyPage from './myPage/container.js'
import MyMsg from './myMsg/container.js'
//injectTapEventPlugin();

import Login from './Login/index.js';

ReactDOM.render(
	<Provider store={store}>
        <HashRouter>
           <div>
              <Route exact path='/' component={Login}/>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/otherHome' component={OtherHome}/>
			        <Route exact path='/search' component={Search}/>
              <Route exact path='/itemdetail' component={ItemDetail}/>
              <Route exact path='/publishlist' component={PublishList}/>
              <Route exact path='/history' component={History}/>
              <Route exact path='/collect' component={Collect}/>
              <Route exact path='/myPage' component={MyPage}/>
              <Route exact path='/myMsg' component={MyMsg}/>
            </div>
        </HashRouter>
    </Provider>, document.getElementById("app"));

if (module.hot) {
	module.hot.accept();
}
