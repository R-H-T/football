import React from 'react';
import ReactDOM from 'react-dom';
import PlayerInputList from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayerInputList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
