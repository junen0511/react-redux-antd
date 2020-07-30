import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import { getRouterData } from './common/router';
class App extends Component {
    render() {
        const routerData = getRouterData();
        const BasicLayout = routerData['/'].component;

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" component={BasicLayout} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
