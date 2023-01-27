import React from 'react';
import { HeroesList } from '../components/HeroesList';

export const DCPage = () => {
  return (
    <>
      <h1>DCPage</h1>
      <hr />
      <HeroesList publisher={'DC Comics'} />
    </>
  );
};
