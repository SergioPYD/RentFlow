import React from 'react'
import tusPropiedades from "../../assets/img/tusPropiedades.png"
import tusGastos from "../../assets/img/tusGastos.png"
import {Image} from "@nextui-org/react"
import { NavLink, useNavigate } from "react-router-dom";


export default function Propietario() {
  return (
    <div className='flex flex-col gap-10 h-screen mt-10'>
    <NavLink to="/propiedades" className="flex-1">
      <div className='bg-amber-500 rounded-3xl flex items-center flex-wrap gap-10 mx-1 pt-4 justify-around h-full '>
        <h2 className='text-4xl px-2'>GESTIONA TUS PROPIEDADES</h2>
        <Image isBlurred src={tusPropiedades} alt="gestion de pisos" width={400} />
      </div>
    </NavLink>
    <NavLink to="/gastos" className="flex-1" >
      <div className='bg-lime-400 rounded-3xl flex items-center flex-wrap-reverse gap-10 mx-1 justify-around pt-4 h-full '>
        <Image isBlurred src={tusGastos} alt="gestion de pisos" width={400}/>
        <h2 className='text-4xl'>GESTIONA TUS GASTOS</h2>
      </div>
    </NavLink>
  </div>
  

  )
}
