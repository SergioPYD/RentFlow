import { useState } from "react";
import service from "../../services/service.config";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

export default function Editar(props) {
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState("");
  const [renta, setRenta] = useState();
  const [descripcion, setDescripcion] = useState("");
  const [habitaciones, setHabitaciones] = useState();
  const [metros, setMetros] = useState();
  const [clave, setClave] = useState("");

  const editarPiso = async (e) => {
    try {
      await service.put(`/piso/${props.idPiso}/edit`, {
        direccion,
        renta,
        descripcion,
        habitaciones,
        metros,
        clave,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        console.log(error);
        navigate("/error");
      }
    }
  };

  return (
    <div className=" max-w-3xl">
      <Accordion variant="shadow">
        <AccordionItem key="1" aria-label="Accordion 1" title="Edita el Piso">
          <form action="post">
            <div className="flex gap-4">
              <div className="w-full flex-col flex gap-4">
                <Input
                  type="text"
                  label="Dirección"
                  placeholder={props.piso.direccion}
                  value={direccion}
                  onChange={(e) => {
                    setDireccion(e.target.value);
                  }}
                />
                <Input
                  type="number"
                  label="Renta Mensual"
                  placeholder={`${props.piso.renta}€`}
                  value={renta}
                  onChange={(e) => {
                    setRenta(e.target.value);
                  }}
                />
                <Input
                  type="text"
                  label="Clave"
                  placeholder={props.piso.clave}
                  value={clave}
                  onChange={(e) => {
                    setClave(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex-col flex gap-2">
                <Textarea
                  type="text"
                  label="Descrición"
                  placeholder="Añade una descripción"
                  value={descripcion}
                  onChange={(e) => {
                    setDescripcion(e.target.value);
                  }}
                />
                <div className="flex">
                  <Input
                    type="number"
                    label="Habitaciones"
                    placeholder="Nº de habitaciones"
                    value={habitaciones}
                    onChange={(e) => {
                      setHabitaciones(e.target.value);
                    }}
                  />

                  <Input
                    type="number"
                    label="M²"
                    placeholder="Metros cuadrados"
                    value={metros}
                    onChange={(e) => {
                      setMetros(e.target.value);
                    }}
                  />
                </div>
                <Button
                  onClick={(e) => {
                    editarPiso(e);
                    props.getData();
                  }}
                  color="success"
                >
                  Guardar
                </Button>
              </div>
            </div>
          </form>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
