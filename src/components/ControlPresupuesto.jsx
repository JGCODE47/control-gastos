import { useState, useEffect } from "react"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = (
  {
    gastos, 
    setGasto,
    presupuesto, 
    setPresupuesto, 
    setIsValidPresupuesto
  }) => {
    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
   
    const handelResetApp = () => {
      const resultado = confirm('Deseas reinciar presupuesto y gastos??')
      if(resultado){
        setGasto([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
      } 

    }



    useEffect(()=>{
      const totalGastado = gastos.reduce((total, gasto)=>gasto.cantidad + total, 0)
      const totalDisponible = Number(presupuesto)-Number(totalGastado)
      const nuevoPorcentaje = (((presupuesto -totalDisponible) / presupuesto) * 100).toFixed(2)
      setDisponible(totalDisponible)
      setGastado(totalGastado)
      setTimeout(()=>{
        setPorcentaje(nuevoPorcentaje)
      },1500)
    }, [gastos])

    const formatearCantidad = (cantidad)=>{
        return cantidad.toLocaleString('en-US',{
            style: 'currency', 
            currency: 'USD'
        })
    }
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <CircularProgressbar
      styles={buildStyles({
        pathColor: porcentaje > 100 ? '#dc2626' : '#3B82F6',
        trailColor: '#F5F5F5',
        textColor: '#3B82F6'
      })}
        value={porcentaje}
        text={`${porcentaje}% Gastado`}
      />
      <div className="contenido-presupuesto">
        <button 
        className="reset-app"
        type="button"
        onClick={handelResetApp}
        >Resetear App</button>
        <p><span>Presupuesto:</span>{formatearCantidad(presupuesto)}</p>
        <p className={`${disponible < 0 ? 'negativo' : '' }`}><span>Disponible:</span>{formatearCantidad(disponible)}</p>
        <p><span>Gastado:</span>{formatearCantidad(gastado)}</p>

      </div>
    </div>
  )
}

export default ControlPresupuesto
