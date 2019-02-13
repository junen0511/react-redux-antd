import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

// all reducers
import { reducer as global } from './global';
import { reducer as postList } from './pages/Home';
import { reducer as postDetail } from './pages/Detail';

export default history =>
    combineReducers({
        router: connectRouter(history),
        global,
        postList,
        postDetail
    });
