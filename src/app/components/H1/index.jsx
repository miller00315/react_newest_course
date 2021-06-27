import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

export const H1 = () => {
  const globalContext = useContext(GlobalContext);

  const {
    state: { title, counter },
  } = globalContext;

  return (
    <h1 className="App">
      {title} {counter}
    </h1>
  );
};
