import React from 'react';

import './styles.css';

export default function LoadingIndicator() {
  return (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
