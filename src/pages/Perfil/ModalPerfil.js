import { indexOf } from 'ramda';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useQuery } from 'react-query';
import { Firebase } from '../../utils';

import Constants from '../../utils/constants';
import './styles.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    backgroundColor: '#181a1e',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
};

export default function ModalPerfil(props) {
  const { modalVisible, setModalVisible, peso, pesoInicial, altura } = props;

  const [imcInicial, setImcInicial] = useState(null);
  const [imcActual, setImcActual] = useState(null);
  const [categoriaImc, setCategoriaIMC] = useState(null);

  const { data } = useQuery('reservas', Firebase.reservas.queryAll);
  const clasesQuery = useQuery(
    ['clasesCalendario', data?.map(({ idClase }) => idClase)],
    Firebase.classes.getFromArray,
  );

  const tiempoEjercicioSemana = useMemo(() => {
    if (clasesQuery.data) {
      const duracionesClases = clasesQuery.data.map(({ duracion }) => parseInt(duracion));
      if (duracionesClases !== 0) {
        return `${duracionesClases.reduce((total, duracionActual) => total + duracionActual)}hrs`;
      }
      return 'Debes registrarte en clases para obtener el total de duración de las clases.';
    }
  }, [clasesQuery]);

  const imc = useCallback(
    (pesoImc) => {
      if (pesoImc && altura) {
        return parseFloat(pesoImc / altura ** 2).toFixed(2);
      }
      return 'N/A';
    },
    [altura],
  );

  useEffect(() => {
    if (pesoInicial) {
      setImcInicial(imc(pesoInicial));
    }
  }, [imc, pesoInicial]);

  useEffect(() => {
    if (peso) {
      const imcPesoActual = imc(peso);
      setImcActual(imcPesoActual);
      const [rango] = Object.values(Constants.IMC.indices).filter(
        ([a, b]) => a < imcPesoActual && b > imcPesoActual,
      );
      const categoria = Object.keys(Constants.IMC.indices)[
        indexOf(rango, Object.values(Constants.IMC.indices))
      ];
      setCategoriaIMC(categoria);
    }
  }, [imc, peso]);

  const progressIcon = useCallback((inicial, actual) => {
    if (actual && inicial) {
      if (actual < inicial) {
        return (
          <span className="material-icons" style={{ color: 'green' }}>
            arrow_drop_down
          </span>
        );
      }
      if (actual > inicial) {
        return (
          <span className="material-icons" style={{ color: 'red' }}>
            arrow_drop_up
          </span>
        );
      }
      return '';
    }
  }, []);

  return (
    <Modal
      isOpen={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      style={customStyles}
      contentLabel="Example Modal">
      <h2 className="perfil-modal-titulo">Tu reporte</h2>
      <div className="perfil-modal-imc-row">
        <div className="perfil-modal-seccion">
          <span className="material-icons perfil-modal-seccion-icon">height</span>
          <div className="perfil-modal-seccion-right">
            <span className="perfil-modal-seccion-label">Tu altura</span>
            <span className="perfil-modal-seccion-value">{altura ? `${altura}m` : 'N/A'}</span>
          </div>
        </div>
        <div className="perfil-modal-seccion">
          <span className="material-icons perfil-modal-seccion-icon">fitness_center</span>
          <div className="perfil-modal-seccion-right">
            <span className="perfil-modal-seccion-label">Peso inicial</span>
            <span className="perfil-modal-seccion-value">{pesoInicial} kg</span>
          </div>
        </div>
        <div className="perfil-modal-seccion">
          <span className="material-icons perfil-modal-seccion-icon">speed</span>
          <div className="perfil-modal-seccion-right">
            <span className="perfil-modal-seccion-label">IMC inicial</span>
            <span className="perfil-modal-seccion-value">{imcInicial}</span>
          </div>
        </div>
        <div className="perfil-modal-seccion">
          <span className="material-icons perfil-modal-seccion-icon">fitness_center</span>
          <div className="perfil-modal-seccion-right">
            <span className="perfil-modal-seccion-label">Peso actual</span>
            <span className="perfil-modal-seccion-value">
              {peso} kg {progressIcon(pesoInicial, peso)}
            </span>
          </div>
        </div>
        <div className="perfil-modal-seccion">
          <span className="material-icons perfil-modal-seccion-icon">speed</span>
          <div className="perfil-modal-seccion-right">
            <span className="perfil-modal-seccion-label">IMC actual</span>
            <span className="perfil-modal-seccion-value">
              {imcActual} {progressIcon(imcInicial, imcActual)}
            </span>
          </div>
        </div>
      </div>
      {imcActual && (
        <div
          className="perfil-modal-imc-box"
          style={{ backgroundColor: Constants.IMC.colores[categoriaImc] }}>
          <span className="material-icons perfil-modal-imc-box-icon">feedback</span>Según tus datos,
          te encuentras en la categoría de <b>{Constants.IMC.nombres[categoriaImc]}</b>
        </div>
      )}
      <div className="perfil-modal-seccion">
        <span className="material-icons perfil-modal-seccion-icon">school</span>
        <div className="perfil-modal-seccion-right">
          <span className="perfil-modal-seccion-label">Clases tomadas</span>
          <span className="perfil-modal-seccion-value">{data?.length} clases tomadas</span>
          <div className="perfil-modal-clases-container">
            {data?.map(({ nombreClase }) => (
              <div className="perfil-modal-clase-chip">
                <span>{nombreClase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="perfil-modal-seccion">
        <span className="material-icons perfil-modal-seccion-icon">speed</span>
        <div className="perfil-modal-seccion-right">
          <span className="perfil-modal-seccion-label">Tiempo de ejercicio por semana</span>
          <span className="perfil-modal-seccion-value">{tiempoEjercicioSemana}</span>
        </div>
      </div>
    </Modal>
  );
}
