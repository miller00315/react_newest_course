import React from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Div } from '../../components/Div';
import './styles.css';

export const Home = () => {
  return (
    <AppContext>
      <Div />
    </AppContext>
  );
};
