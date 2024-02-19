import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import service from "../../services/service.config";
import { AuthContext } from "../../context/auth.context";
import {
  Spinner,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import { DeleteDocumentIcon } from "../icons/DeleteDocumentIcon";
import Editar from "./Editar";

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
      await service.delete(`/piso/${params.idPiso}/delete-img`, { data: { index } });      getData();
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
      <div className="flex justify-center gap-4">
      {fotos.map((cadaFoto, i) => (
        <div key={i} className="relative inline-block">
          <button
            onClick={() => handleFotoDelete(i)}
            className="absolute top-0 left-0 p-2 bg-red-500 text-white"
          >
            X
          </button>
          <img src={cadaFoto} alt="Foto" width={300} height={200} />
        </div>
      ))}
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
        <h2>Dirección: {direccion}</h2>
        <h3>Renta: {renta}</h3>
        <h4>Clave: {clave}</h4>
        {descripcion ? <p>descripcion: {descripcion}</p> : null}
        {metros ? <p>Metros: {metros}</p> : null}
        {habitaciones ? <p>Habitaciones: {habitaciones}</p> : null}
      </div>
      <div>
        <Editar piso={piso} idPiso={params.idPiso} getData={getData} />
        <Dropdown>
          <DropdownTrigger>
            <Button color="danger" variant="bordered">
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
  );
}
