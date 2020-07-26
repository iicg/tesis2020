import { initFirebase } from './firebase';
import { signIn, signOut, setupSessionListeners } from './session';
import { getAllClasses, deleteClass, createClass } from './classes';
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
    create: createClass,
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
