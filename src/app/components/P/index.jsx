import React, { useContext, useRef } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

export const P = () => {
  const globalContext = useContext(GlobalContext);

  const {
    state: { body },
    changeTitle,
  } = globalContext;

  const inputRef = useRef();

  return (
    <>
      <p onClick={() => changeTitle(inputRef.current.value)}>{body}</p>
      <input type="text" ref={inputRef} />
    </>
  );
};
