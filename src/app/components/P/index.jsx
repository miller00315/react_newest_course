import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

export const P = () => {
  const globalContext = useContext(GlobalContext);

  const {
    state: { body },
    setState,
  } = globalContext;

  return <p onClick={() => setState((s) => ({ ...s, counter: s.counter + 1 }))}>{body}</p>;
};
