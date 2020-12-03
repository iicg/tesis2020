import { initFirebase } from './firebase';
import {
  signIn,
  signOut,
  setupSessionListeners,
  sendResetPasswordEmail,
  setNewEmail,
} from './session';
import {
  getAllClasses,
  getClassesFromArray,
  deleteClass,
  createClass,
  updateClase,
} from './classes';
import { getAllUsuarios, updateUsuario, getUsuario } from './users';
import { getAllReservas, createReserva, deleteReserva, queryAllReservas } from './reservas';

import { blockUser, unblockUser, createUser, updateUser } from './admin';
import { getTiposPlanes } from './planes';

initFirebase();

export default {
  session: {
    signIn,
    signOut,
    setupListeners: setupSessionListeners,
    resetPassword: sendResetPasswordEmail,
    setNewEmail,
  },
  classes: {
    getAll: getAllClasses,
    getFromArray: getClassesFromArray,
    delete: deleteClass,
    create: createClass,
    update: updateClase,
  },
  users: {
    getAll: getAllUsuarios,
    get: getUsuario,
    update: updateUsuario,
  },
  reservas: {
    getAll: getAllReservas,
    create: createReserva,
    delete: deleteReserva,
    queryAll: queryAllReservas,
  },
  planes: {
    getTipos: getTiposPlanes,
  },
  admin: {
    blockUser,
    unblockUser,
    createUser,
    updateUser,
  },
};
