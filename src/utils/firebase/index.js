import { initFirebase } from './firebase';
import { signIn, signOut, setupSessionListeners } from './session';
import { getAllClasses, deleteClass, createClass, updateClase } from './classes';
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
    update: updateClase,
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
