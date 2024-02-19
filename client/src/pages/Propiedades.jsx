import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import Crear from "../components/Propiedades/Crear";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

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

      response.data;
      setPropiedades(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (propiedades === undefined) {
    return <h1>Cargando datos...</h1>;
  }

  return (
    <div>
      <Crear getData={getData} />
      <div className="flex flex-wrap justify-center gap-3 mt-20">
      {propiedades.map((cadaPiso, i) => {
        const { _id, direccion, renta, clave, fotos } = cadaPiso;
        return (
          <div key={_id} className="">
           
           
            <NavLink to={`/propiedades/${_id}`}>
              <Card className="">
                <CardHeader >
                  <Image
                    alt="nextui logo"
                    
                    radius="sm"
                    src={fotos[0]}
                    
                    fallbackSrc="https://via.placeholder.com/300x200"
                    className="w-80 h-40 object-cover rounded-sm"
                  />
                  
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Dirección: {direccion}</p>
                  <p>Renta: {renta}€</p>
                  <p>Clave para compartir al inquilino: {clave}</p>
                </CardBody>
                <Divider />
                
              </Card>
            </NavLink>
          </div>
        );
      })}
    </div>
    </div>
    
  );
}
