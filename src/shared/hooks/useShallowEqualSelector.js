import { shallowEqual, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

export default function useShallowEqualSelector(selector) {
  return useSelector(
    typeof selector === 'function' ? selector : createStructuredSelector(selector),
    shallowEqual,
  );
}
