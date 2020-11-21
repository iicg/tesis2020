import { initFirebase } from './firebase';
import { signIn, signOut, setupSessionListeners } from './session';
import {
  getAllClasses,
  getClassesFromArray,
  deleteClass,
  createClass,
  updateClase,
} from './classes';
import { getAllUsuarios, updateUsuario } from './users';
import { getAllReservas, createReserva, deleteReserva } from './reservas';

import { blockUser, unblockUser, createUser, updateUser } from './admin';
import { getTiposPlanes } from './planes';

initFirebase();

export default {
  session: {
    signIn,
    signOut,
    setupListeners: setupSessionListeners,
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
    update: updateUsuario,
  },
  reservas: {
    getAll: getAllReservas,
    create: createReserva,
    delete: deleteReserva,
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
