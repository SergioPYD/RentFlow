import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import service from "../services/service.config";
import { EyeFilledIcon } from "../components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/icons/EyeSlashFilledIcon";

// Este componente permite al usuario registrarse en la aplicación
export default function Signup() {
  const navigate = useNavigate();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityTwo = () => setIsVisibleTwo(!isVisibleTwo);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleTwo, setIsVisibleTwo] = useState(false);

  const [name, setName] = useState("");
  const [subname, setSubname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [repitPassword, setRepitPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleSubNameChange = (e) => setSubname(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setRepitPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await service.post("/auth/signup", {
        name,
        subname,
        email,
        password,
        repitPassword,
        role,
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        console.error(error);
        navigate("/error");
      }
    }
  };

  return (
    <div
      role="form"
      
      
    >
      <div className="flex flex-col">
        <h3 className="text-default-500 text-sm">WELCOME!</h3>
        <div className="flex flex-col gap-4">
          <Input
            aria-label="name"
            key="name"
            type="text"
            label="Nombre"
            
            value={name}
            onChange={handleNameChange}
          />

          <Input
            aria-label="subname"
            key="subname"
            type="text"
            label="Apellidos"
           
            value={subname}
            onChange={handleSubNameChange}
          />
          <Input
            aria-label="Email"
            key="email"
            type="email"
            label="Email"
           
            value={email}
            onChange={handleEmailChange}
            className="flex-grow"
          />
          <Select
            id="role"
            name="role"
            value={role}
            onChange={handleRoleChange}
            className="flex-grow text-black"
            placeholder="Selecciona tu rol"
          >
            <SelectItem
              key="Propietario"
              value="Propietario"
              className=" text-black"
            >
              Propietario
            </SelectItem>
            <SelectItem
              key="Inquilino"
              value="Inquilino"
              className=" text-black"
            >
              Inquilino
            </SelectItem>
          </Select>
          <Input
            aria-label="Password"
            label="Contraseña"
            placeholder="Escribe tu contraseña"
            value={password}
            onChange={handlePasswordChange}
            className="flex-grow"
            endContent={
              <button
                aria-label="Toggle password visibility"
                className="outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Input
            aria-label="Repite tu contraseña"
            label="Repite tu contraseña"
            placeholder="Repite tu contraseña"
            value={repitPassword}
            onChange={handleRepeatPasswordChange}
            className="flex-grow text-black"
            endContent={
              <button
                aria-label="Toggle repeat password visibility"
                className="outline-none"
                type="button"
                onClick={toggleVisibilityTwo}
              >
                {isVisibleTwo ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisibleTwo ? "text" : "password"}
          />
          <div className="flex flex-col ">
            <Button
              role="button"
              aria-label="Signup"
              type="submit"
              onClick={handleSignup}
              className="flex-grow"
              >
              Signup
            </Button>
              {errorMessage ? (
                <p className="text-center" style={{ color: "red" }}>
                  {" "}
                  {errorMessage}
                </p>
              ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
