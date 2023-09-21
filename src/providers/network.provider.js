import React, { createContext, useReducer } from 'react';
import networkReducer, { initialState } from "../store/network.reducer";

export const NetworkContext = createContext();

const NetworkProvider = ({ children }) => {
	const [state, dispatch] = useReducer(networkReducer, initialState);

	return (<NetworkContext.Provider value={[state, dispatch]}>
		{ children }
	</NetworkContext.Provider>);
};

export default NetworkProvider;