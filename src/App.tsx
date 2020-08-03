import React from 'react';
import Logo from './react.png';
import './App.scss';

export interface Props {
    name: string;
}

const App: React.FC<Props> = ({name}: Props) => {
  return (
    <>
        <h1>Hello, {name} ☀️</h1>
        <img width="200" src={Logo}/>
    </>
  );
}

export default App;