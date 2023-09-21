import React, { createContext, useReducer } from 'react';
import appReducer, { initialState } from "../store/app.reducer";

export const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	return (<AppStateContext.Provider value={[state, dispatch]}>
		{ children }
		</AppStateContext.Provider>);
};

export default AppStateProvider;