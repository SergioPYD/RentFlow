import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import service from "../../services/service.config";
import { AuthContext } from "../../context/auth.context";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import {
  Spinner,
  Snippet,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import { DeleteDocumentIcon } from "../icons/DeleteDocumentIcon";
import Editar from "./Editar";
import { Carousel } from "react-responsive-carousel";

export default function Detalles() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const { isUserActive, roleDetect } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const [piso, setPiso] = useState();

  useEffect(() => {
    if (isUserActive === false || roleDetect === "Inquilino") {
      navigate("/");
      console.log("No estas autorizado");
    }
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/piso/${params.idPiso}/details`);
      setPiso(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/piso/${params.idPiso}/delete`);
      navigate("/propiedades");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const uploadData = new FormData();
    for (const file of files) {
      uploadData.append("images", file);
    }

    try {
      await service.post(`/piso/${params.idPiso}/edit-img`, uploadData);

      getData();
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFotoDelete = async (index) => {
    try {
      await service.delete(`/piso/${params.idPiso}/delete-img`, {
        data: { index },
      });
      getData();
    } catch (error) {
      navigate("/error");
    }
  };

  if (piso === undefined) {
    return <Spinner color="primary" style={{ paddingTop: "20px" }} />;
  }
  const { clave, direccion, fotos, renta, descripcion, metros, habitaciones } =
    piso;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col flex-wrap justify-center items-center gap-4">
        <div>
          <Carousel style>
            {fotos.map((cadaFoto, i) => (
              <div key={i} className="relative inline-block">
                <img
                  src={cadaFoto}
                  alt="Foto"
                  style={{ width: 600, objectFit: "cover" }}
                />
                <button
                  onClick={() => handleFotoDelete(i)}
                  className="absolute top-0 left-8 p-2 bg-red-500 text-white"
                >
                  X
                </button>
              </div>
            ))}
          </Carousel>
        </div>

        <label htmlFor="fileUpload" className="file-upload-label">
          <span>AÑADIR FOTOS</span>
          <input
            id="fileUpload"
            type="file"
            name="images"
            onChange={handleFileUpload}
            multiple
          />
        </label>
      </div>
      <div>
        <h1>Detalles del Inmueble</h1>
        <h2>
          <b>Dirección: </b> {direccion}
        </h2>
        <h3>
          <b>Renta:</b> {renta}
        </h3>
        <h4></h4>
        {descripcion ? <p><b>Descripción:</b> {descripcion}</p> : null}
        {metros ? <p><b>Metros²</b> {metros}</p> : null}
        {habitaciones ? <p><b>Nº Habitaciones</b> {habitaciones}</p> : null}
        <hr />
        <p>Código para el inquilino</p>
        <Snippet
          tooltipProps={{
            color: "secondary",
            content: "Copia el código para el inquilino",
          }}
          symbol="🏡"
          color="success"
          size="sm"
          variant="flat"
          >
          {clave}
        </Snippet>
      </div>
      <hr />
      <div className="flex">
        <div className="flex-1 pr-4">
          
          <Editar piso={piso} idPiso={params.idPiso} getData={getData} />
        </div>
        <div className="flex-none w-1/4">
          <Dropdown>
            <DropdownTrigger>
              <Button color="danger" variant="bordered" >
                Borrar Piso
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="faded"
              aria-label="Dropdown menu with description"
            >
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onClick={handleDelete}
                description="¿Estás segur@? La acción no es reversible."
                startContent={
                  <DeleteDocumentIcon
                    className={cn(iconClasses, "text-danger")}
                  />
                }
              >
                Borrar Piso Permanentemente
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
