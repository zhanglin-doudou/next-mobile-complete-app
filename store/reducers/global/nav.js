import { handleAction } from 'redux-actions';
import { setNav } from '../../actions/global/nav';

const initState = { navTitle: '', canGoBack: false, isHome: false };

const navReducer = handleAction(setNav, (state, { payload }) => ({ ...state, ...payload }), initState);

export { navReducer };
