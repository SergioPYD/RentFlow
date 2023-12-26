import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/service.config";

export default function CreaYEditaProp(props) {
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState("");

  const [direccion, setDireccion] = useState("");
  const [renta, setRenta] = useState("");
  const [clave, setClave] = useState("");

  const crearPropiedad = async (e) => {
    e.preventDefault();

    try {
      await service.post("/piso/add", {
        direccion,
        renta,
        clave,
        propietario: activeUserId,
      });
      console.log("creado correctamente");
      
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
    <>
      <Button onPress={onOpen} color="primary">
        Añade Nueva Propiedad
      </Button>
      <Modal
        style={{ color: "black" }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>Crear Piso</p>
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  name="direccion"
                  label="Direccion"
                  placeholder="Añade la dirección del inmueble"
                  variant="bordered"
                  onChange={(e) => setDireccion(e.target.value)}
                />
                <Input
                  name="renta"
                  label="Renta Mensual"
                  placeholder="Añade el precio mensual"
                  type="number"
                  variant="bordered"
                  onChange={(e) => setRenta(e.target.value)}
                />
                <Input
                  name="clave"
                  label="Clave"
                  placeholder="Clave para que los inquilinos se unan al piso"
                  variant="bordered"
                  onChange={(e) => setClave(e.target.value)}
                />
                {errorMessage}
              </ModalBody>
              <ModalFooter>
                <div></div>
                <p>*Añade más datos una vez creado el inmueble</p>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  onClick={(e) => {
                    crearPropiedad(e);
                    onClose();
                    props.getData()
                  }}
                >
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
