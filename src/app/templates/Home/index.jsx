import React, { useReducer } from 'react';
import './styles.css';

const globalState = {
  title: 'title',
  body: 'body',
  counter: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { ...state, counter: state.counter + 1, title: action.payload };

    case 'reverseTitle':
      return { ...state, title: state.title.split('').reverse().join('') };

    default:
      return { ...state };
  }
};

export const Home = () => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const { title, body, counter } = state;

  return (
    <div>
      <h1>
        {title} {counter}
      </h1>
      <p>{body}</p>
      <button onClick={() => dispatch({ type: 'update', payload: new Date().toLocaleString('pt-BR') })}>Click</button>
      <button onClick={() => dispatch({ type: 'reverseTitle' })}>Reverse</button>
    </div>
  );
};
