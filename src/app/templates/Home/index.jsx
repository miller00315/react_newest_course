import React, { useContext, useState } from 'react';
import './styles.css';

const globalState = {
  title: 'context title',
  counter: 0,
  body: 'context body',
};

const GlobalContext = React.createContext();

const Div = () => {
  return (
    <div>
      <H1 />
      <P />
    </div>
  );
};

const H1 = () => {
  const globalContext = useContext(GlobalContext);

  const {
    contextState: { title, counter },
  } = globalContext;

  return (
    <h1 className="App">
      {title} {counter}
    </h1>
  );
};

const P = () => {
  const globalContext = useContext(GlobalContext);

  const {
    contextState: { body },
    setContextState,
  } = globalContext;

  return <p onClick={() => setContextState((s) => ({ ...s, counter: s.counter + 1 }))}>{body}</p>;
};

export const Home = () => {
  const [contextState, setContextState] = useState(globalState);

  return (
    <GlobalContext.Provider value={{ contextState, setContextState }}>
      <Div />
    </GlobalContext.Provider>
  );
};
