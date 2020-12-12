import { apply } from 'ramda';

export default function debounce(timeMs, fn) {
  let timeout;

  return (...args) => {
    const later = () => apply(fn, args);
    clearTimeout(timeout);
    timeout = setTimeout(later, timeMs);
  };
}
