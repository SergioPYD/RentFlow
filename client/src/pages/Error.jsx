import React, { useEffect } from 'react'
import { useNavigate} from "react-router-dom";

export default function Error() {

    const navigate = useNavigate()


    useEffect(() => {
       setTimeout(() => {
        navigate ("/")
       }, 3000);
      }, []);

  return (
    <div>ERROR EN LA PAGINA</div>
  )
}
