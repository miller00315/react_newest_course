import P from 'prop-types';
import { createContext, useReducer } from 'react';
import { globalState } from './data';

export const GlobalContext = createContext();
export const Actions = {
  CHANGE_TITLE: 'change_title',
};

//reducers.js
export const reducer = (state, action) => {
  switch (action.type) {
    case action.CHANGE_TITLE:
      return { ...state, title: action.payload };
    default:
      return { ...state };
  }
};

export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const changeTitle = (payload) => {
    dispatch({ action: 'updateTitle', payload });
  };

  return <GlobalContext.Provider value={{ state, changeTitle }}>{children}</GlobalContext.Provider>;
};

AppContext.propTypes = {
  children: P.node,
};
