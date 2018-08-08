import React from 'react';
import './ice-box.css';

const IceBox = ({
    title = '',
    children,
    lidColor = '#c05a5a',
    winner = false,
}) => (<div className="IceBox box">
<h2 style={{
  position: 'relative',
  backgroundColor: lidColor,
  }}>{ title }{ (winner) ? ( <span role="img" aria-label="" title="Winner's smile" style={{ position: 'absolute', right: 20 }}>😁</span>) : '' }</h2>
  { children }
</div>);

export default IceBox;
