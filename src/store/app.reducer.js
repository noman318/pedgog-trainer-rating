import { 
	LOGGED_IN,
	LOGGED_OUT,
	SET_MENU,
	CLOSE_ALERT,
	ALERT
} from "../contants/app.constant";
import { getItem, setItem, clearAll } from '../utils/storage';

const user = getItem('user', true) || {};

export const initialState = { 
	isLoggedIn: Object.keys(user).length > 0,
	user,
	menu: {},
	alert: {
		canShow: false,
		message: '',
		title: '',
	}
};

const appReducer = (state, action) => {
	switch (action.type) {
		case LOGGED_IN:
			setItem('access_token', action?.payload?.tokens?.access?.token);
			setItem('refresh_token', action?.payload?.tokens?.refresh?.token);
			setItem('user', JSON.stringify(action?.payload?.user));
			return { ...state, isLoggedIn: true, user: action?.payload?.user  };

		case LOGGED_OUT:
			clearAll();
			return { ...state, isLoggedIn: false, user: {}, menu: {}  };

		case SET_MENU:
			return { ...state, menu: action.payload };
		case ALERT:
			return { ...state, alert: { canShow: true, ...action.payload }  };
		case CLOSE_ALERT: 
			return { ...state, alert: initialState.alert };
		default:
			return initialState;
	}
}

export default appReducer;