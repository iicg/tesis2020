import React, { useEffect, useState } from 'react';

import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';
import { ReduxService } from '../../utils';

import './styles.css';

export default function Toast() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (session.toastMessage !== '') {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        ReduxService.dispatch(ReduxService.session.actions.update({ toastMessage: '' }));
      }, 5000);
    }
  }, [session]);

  if (toastVisible) {
    return (
      <div className="toast-container">
        <span className="toast-text">{session.toastMessage}</span>
      </div>
    );
  }
  return <></>;
}
