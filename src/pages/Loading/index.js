import React, { useEffect } from 'react';
import { Firebase } from '../../utils';

import './styles.css';

export default function LoadingPage() {
  useEffect(() => {
    Firebase.session.setupListeners();
  });

  return (
    <div className="loading-page-container">
      <div className="loading-page-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
