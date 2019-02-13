import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import routerData from './router';
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        {routerData.map(({ path, component, exact }) => (
                            <Route key={path} path={path} exact={exact} component={component} />
                        ))}
                        <Redirect exact from="/" to="/home" />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
