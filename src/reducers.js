import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

// all reducers
import { reducer as global } from './global';
import { reducer as dashboard } from './pages/Dashboard';
import { reducer as listData } from './pages/List';

export default (history) =>
    combineReducers({
        router: connectRouter(history),
        global,
        dashboard,
        listData,
    });
