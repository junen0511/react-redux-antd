import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Authorized from 'utils/Authorized';
import NotFound from './pages/exception/404';
import store, { history } from './store';
import { getRouterData } from './common/router';

const { AuthorizedRoute } = Authorized;
class App extends Component {
    render() {
        const routerData = getRouterData();
        const Home = routerData['/home'].component;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" component={Home} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
