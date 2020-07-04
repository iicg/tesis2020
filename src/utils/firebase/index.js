import { initFirebase } from './firebase';
import { signIn, signOut, setupSessionListeners } from './session';

initFirebase();

export default {
  session: {
    signIn,
    signOut,
    setupListeners: setupSessionListeners,
  },
};
