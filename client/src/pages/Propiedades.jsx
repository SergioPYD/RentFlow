import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import CreaYEditaProp from "../components/Propiedades/CreaYEditaProp";
export default function Propiedades() {
  const navigate = useNavigate();
  const { isUserActive, roleDetect, activeUserId } = useContext(AuthContext);
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    if (isUserActive === false || roleDetect === "Inquilino") {
      navigate("/");
      console.log("No estas autorizado");
    }
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/piso/verTodos`);
      console.log(response.data);
      response.data;
      setPropiedades(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (propiedades === undefined) {
    return <h1>Cargando datos</h1>;
  }

  return (
    <div className="mt-10">
      <CreaYEditaProp getData={getData} />
      {propiedades.map((cadaPiso, i) => {
        const { _id, direccion, renta, clave } = cadaPiso;
        return (
          <NavLink to={`/propiedades/${_id}`} key={_id}>
            <div>
              <p>Dirección: {direccion}</p>
              <p>Renta: {renta}€</p>
              <p>Clave para compartir al inquilino: {clave}</p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}
