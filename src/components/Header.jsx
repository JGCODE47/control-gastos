import NuevoPresupuesto from './NuevoPresupuesto.jsx'
import ControlPresupuesto from './ControlPresupuesto.jsx'

const Header = ({
  gastos,
  setGasto,
  presupuesto, 
  setPresupuesto, 
  isValidPresupuesto, 
  setIsValidPresupuesto
}) => {
  return (
 <header>
    <h1>Planificadir de Gastos</h1>
    {isValidPresupuesto ?
    (<ControlPresupuesto
    gastos={gastos}
    setGasto={setGasto}
    presupuesto = {presupuesto}
    setPresupuesto = {setPresupuesto}
    setIsValidPresupuesto={setIsValidPresupuesto}
    />) 
    : 
    ( 
     <NuevoPresupuesto 
      presupuesto={presupuesto}
      setPresupuesto = {setPresupuesto}
      setIsValidPresupuesto = {setIsValidPresupuesto}
    />)}
 
 </header>
  )
}

export default Header
