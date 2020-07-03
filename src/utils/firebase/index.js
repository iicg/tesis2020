import { initFirebase } from './firebase';
import { signIn, setupSessionListeners } from './session';

initFirebase();

export default {
  session: {
    signIn,
    setupListeners: setupSessionListeners,
  },
};
