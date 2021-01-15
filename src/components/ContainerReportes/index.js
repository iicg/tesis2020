import { getMonth, getYear, isAfter, isBefore, setYear } from 'date-fns';
import React, { useEffect, useMemo } from 'react';

import { useQuery } from 'react-query';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DateUtil, Firebase } from '../../utils';
import Constants from '../../utils/constants';

import './styles.css';

export default function ContainerReportes() {
  const usersQuery = useQuery('usuarios', Firebase.users.queryAll);
  const clasesQuery = useQuery('clases', Firebase.classes.queryAll);

  const topCincoClases = useMemo(() => {
    // if (clasesQuery.data) {
    //   const topClases = clasesQuery.data.sort((a, b) => {
    //     const alumnosA = a?.alumnos || [];
    //     const alumnosB = b?.alumnos || [];
    //     return alumnosB.length - alumnosA.length;
    //   });
    //   return topClases.slice(0, 5);
    // }
    return [];
  }, [clasesQuery.data]);

  const [clasesMañana, clasesTarde] = useMemo(() => {
    if (clasesQuery.data) {
      const mañana = clasesQuery.data.filter(({ horaInicio }) => {
        const horas = Number.parseInt(horaInicio.replace(':', ''));
        return horas < 1200;
      });
      const tarde = clasesQuery.data.filter(({ horaInicio }) => {
        const horas = Number.parseInt(horaInicio.replace(':', ''));
        return horas >= 1200;
      });
      return [mañana, tarde];
    }
    return [[], []];
  }, [clasesQuery.data]);

  const planes = useMemo(() => {
    const tiposDePlan = Object.keys(Constants.TIPOS_PLAN);
    if (clasesQuery.data) {
      return tiposDePlan.map((plan) => {
        return {
          name: plan,
          value: usersQuery.data?.filter(({ tipoPlan }) => tipoPlan === plan).length,
        };
      });
    }
    return [];
  }, [clasesQuery.data, usersQuery.data]);

  const estudiantesActivos = useMemo(() => {
    if (usersQuery.data) {
      const result = ['activo', 'no activo'].map((tipo) => {
        return {
          name: tipo,
          value: usersQuery.data.filter(({ proximoPago }) => {
            const fechaPago = DateUtil.timestampToDate(proximoPago.seconds);
            return tipo === 'activo'
              ? isAfter(fechaPago, new Date())
              : isBefore(fechaPago, new Date());
          }).length,
        };
      });
      return result;
    }
    return [];
  }, [usersQuery.data]);

  const clasesPorDia = useMemo(() => {
    if (clasesQuery.data) {
      return Constants.DIAS_SEMANA.map((diaSemana) => {
        return {
          name: diaSemana,
          Clases: clasesQuery.data.filter(({ dia }) => dia === diaSemana).length,
          Mañana: clasesMañana.filter(({ dia }) => dia === diaSemana).length,
          Tarde: clasesTarde.filter(({ dia }) => dia === diaSemana).length,
        };
      });
    }
    return [];
  }, [clasesMañana, clasesQuery.data, clasesTarde]);

  const estudiantesPorMes = useMemo(() => {
    if (usersQuery.data) {
      const result = new Array(12).fill(0);
      const filteredUsers = usersQuery.data.filter(({ fechaIngreso }) =>
        Boolean(fechaIngreso?.seconds),
      );

      filteredUsers.map((user) => {
        const { fechaIngreso } = user;
        const fecha = DateUtil.timestampToDate(fechaIngreso?.seconds);
        const mes = getMonth(fecha);
        result[mes] = result[mes] + 1;
      });
      return Constants.MESES.map((mes, index) => ({
        name: mes,
        value: result[index],
      }));
    }
    return [];
  }, [usersQuery.data]);

  return (
    <div className="container-reportes-container">
      <h1 className="container-reportes-titulo">Reportes</h1>
      <div className="container-reportes">
        <div className="container-reportes-block">
          <span className="container-reportes-block-title">Clases con más inscritos</span>
          {topCincoClases.map(({ nombre, alumnos }, index) => {
            return (
              <span className={`container-reportes-top-item container-reportes-top-${index}`}>
                {nombre} ({alumnos?.length || 0} alumnos)
              </span>
            );
          })}
        </div>
        <div className="container-reportes-block">
          <span className="container-reportes-block-title">Clases por horarios del día</span>
          <ResponsiveContainer width="100%">
            <PieChart margin={{ top: 16, bottom: 4 }}>
              <Pie
                data={[
                  { name: 'Mañana', value: clasesMañana.length },
                  { name: 'Tarde', value: clasesTarde.length },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}>
                <Cell fill="#70ba0f" />
                <Cell fill="#487013" />
              </Pie>
              <Legend
                iconSize={10}
                width={120}
                height={200}
                layout="vertical"
                verticalAlign="center"
                align="right"
                wrapperStyle={{ color: 'white' }}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="container-reportes-block">
          <span className="container-reportes-block-title">Estudiantes por status</span>
          <ResponsiveContainer width="100%">
            <PieChart margin={{ top: 16, bottom: 4 }}>
              <Pie data={planes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                <Cell fill="#70ba0f" />
                <Cell fill="rgb(181, 130, 45)" />
                <Cell fill="rgb(195, 208, 218)" />
                <Cell fill="rgb(255, 192, 8)" />
              </Pie>
              <Legend
                iconSize={10}
                width={120}
                height={200}
                layout="vertical"
                verticalAlign="center"
                align="right"
                wrapperStyle={{ color: 'white' }}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="container-reportes-block">
          <span className="container-reportes-block-title">Estudiantes por tipo de plan</span>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 16, bottom: 4 }}>
              <Pie
                data={estudiantesActivos}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}>
                <Cell fill="#70ba0f" />
                <Cell fill="#F55759" />
              </Pie>
              <Legend
                iconSize={10}
                width={120}
                height={200}
                layout="vertical"
                verticalAlign="center"
                align="right"
                wrapperStyle={{ color: 'white' }}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="container-reportes">
        <div className="container-reportes-block">
          <span className="container-reportes-block-title">Clases por horarios del día</span>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clasesPorDia}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend wrapperStyle={{ color: 'white' }} />
              <Bar dataKey="Clases" fill="#375CDB" />
              <Bar dataKey="Mañana" fill="#E2ECFF" />
              <Bar dataKey="Tarde" fill="#B7CEFF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="container-reportes-block">
          <span className="container-reportes-block-title">
            Estudiantes por mes de ingreso en 2020
          </span>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={estudiantesPorMes}>
              <CartesianGrid strokeOpacity={0.2} strokeDasharray="6 6" />
              <XAxis dataKey="name" stroke="white" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#70ba0f" activeDot={{ r: 10 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
