import { initFirebase } from './firebase';
import { signIn, signOut, setupSessionListeners } from './session';
import { getAllClasses, deleteClass } from './classes';
import { getAllUsuarios, updateUsuario } from './users';

import { blockUser, unblockUser, createUser, updateUser } from './admin';

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
    update: updateUsuario,
  },
  admin: {
    blockUser,
    unblockUser,
    createUser,
    updateUser,
  },
};
