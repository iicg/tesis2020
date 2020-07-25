import { initFirebase } from './firebase';
import { signIn, signOut, setupSessionListeners } from './session';
import { getAllClasses, deleteClass } from './classes';
import { getAllUsuarios } from './users';

initFirebase();

export default {
  session: {
    signIn,
    signOut,
    setupListeners: setupSessionListeners,
  },
  classes: {
    getAll: getAllClasses,
    delete: deleteClass,
  },
  users: {
    getAll: getAllUsuarios,
  },
};
