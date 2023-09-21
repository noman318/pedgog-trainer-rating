import { INCREMENT_API_CALL_COUNT,
	DECREMENT_API_CALL_COUNT,
	NETWORK_ERROR,
	NETWORK_ERROR_MESSAGE, } from "../contants/app.constant";



export const initialState = {
	silentFail: false,
	count: 0,
	loading: false,
	showError: false,
	message: {
		content: NETWORK_ERROR_MESSAGE
	}
};

const networkReducer = (state, action) => {
	let temp = {};
	switch (action.type) {
		case INCREMENT_API_CALL_COUNT:
			return { ...state, count: state.count + 1, loading: true  };

		case DECREMENT_API_CALL_COUNT:
			return { ...state, count: state.count - 1, loading: state.count > 1 || false };

		case NETWORK_ERROR:
			temp = {
				count: state.count-1,
				loading: state.count === 1 && false,
				showError: state.count === 1 && true
			};
			return { ...state, ...temp };
			
		default:
			return initialState;
	}
}

export default networkReducer;