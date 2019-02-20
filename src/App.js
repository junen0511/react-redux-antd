import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Authorized from 'utils/Authorized';
import NotFound from './pages/Exception/404';
import store, { history } from './store';
import routerData from './router';

const { AuthorizedRoute } = Authorized;
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        {routerData.map(({ path, component, exact, authority }) => (
                            <AuthorizedRoute
                                key={path}
                                path={path}
                                exact={exact}
                                component={component}
                                authority={authority}
                                redirectPath="/exception/403"
                            />
                        ))}
                        <Redirect exact from="/" to="/home" />
                        <Route render={NotFound} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
