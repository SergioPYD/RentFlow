import { useContext, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Button,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { MailIcon } from "./icons/Mailcon.jsx";
import { LockIcon } from "./icons/LockIcon.jsx";
import { AuthContext } from "../context/auth.context.jsx";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

import service from "../services/service.config";

export default function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { verifyToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleIsChecked = (e) => setIsChecked(e.currentTarget.checked);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await service.post("/auth/login", {
        email,
        password,
        isChecked,
      });

      localStorage.setItem("authToken", response.data.authToken);
      await verifyToken();

      navigate("/home");
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
    <div>
      <Button onClick={onOpen} color="primary">
        Log In
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={isMobile ? "top-center" : "center"}
      >
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={<MailIcon />}
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  type="email"
                  name="email"
                  style={{ color: "black" }}
                  value={email}
                  onChange={handleEmailChange}
                />
                <Input
                  endContent={<LockIcon />}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  name="password"
                  value={password}
                  style={{ color: "black" }}
                  onChange={handlePasswordChange}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    checked={isChecked}
                    onChange={handleIsChecked}
                  >
                    <p>Remember me</p>
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleLogin}>
                  Login
                </Button>
              </ModalFooter>
              {errorMessage ? (
                <p
                  style={{
                    color: "red",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "25px",
                  }}
                >
                  {" "}
                  *{errorMessage}
                </p>
              ) : null}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
