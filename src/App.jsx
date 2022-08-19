import { useState, useEffect } from "react"
import Filtros from "./components/Filtros.jsx"
import Header from "./components/Header.jsx"
import ListadoGastos from "./components/ListadoGastos.jsx"
import Modal from "./components/Modal.jsx"
import {generarId} from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'



function App() {
  const [gastos, setGasto] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem("gastos")) : []
    )
  const [presupuesto, setPresupuesto] = useState(
    localStorage.getItem("presupuesto") ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState('')




  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(()=>{
        setAnimarModal(true)
      }, 300)
    }
  },[gastoEditar])

  useEffect(()=>{
  localStorage.setItem('presupuesto', presupuesto ?? 0) 
  },[presupuesto])

  useEffect(()=>{
   const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
   if(presupuesto > 0 ){
    setIsValidPresupuesto(true)
   }
  },[])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  useEffect(()=>{
    const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
    setGastosFiltrados(gastosFiltrados)
  },[filtro])

  const handelNuevoGasto = () =>{
    setModal(true)
    setGastoEditar({})
    setTimeout(()=>{
      setAnimarModal(true)
    }, 300)
  }

  const guardarGasto = gasto =>{
      if(gasto.id){
        const gastosActualizados = gastos.map(gastoState=> gastoState.id === gasto.id ? gasto : gastoState)
        setGasto(gastosActualizados)
        setGastoEditar({})
      }else{
        gasto.id = generarId();
        gasto.fecha = Date.now();
        setGasto([...gastos, gasto])
      }   
    setAnimarModal(false)
    setTimeout(()=>{
      setModal(false)
    },300)
  }

  const eliminarGasto = id =>{
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGasto(gastosActualizados)
  }


  return (
   <div className={modal ? 'fijar' : ''}>
    <Header
    gastos={gastos}
    setGasto={setGasto}
    presupuesto={presupuesto}
    setPresupuesto = {setPresupuesto}
    isValidPresupuesto = {isValidPresupuesto}
    setIsValidPresupuesto = {setIsValidPresupuesto}
    />

    {isValidPresupuesto && (
   <>
    <main>
      <Filtros
      filtro = {filtro}
      setFiltro = {setFiltro}
      />
      <ListadoGastos
       gastos={gastos}
       gastoEditar={gastoEditar}
       setGastoEditar={setGastoEditar}
       eliminarGasto={eliminarGasto}
       filtro={filtro}
       gastosFiltrados={gastosFiltrados}
       
      />
    </main>
    <div className="nuevo-gasto">
      <img 
      src={IconoNuevoGasto}
      alt="nuevo gasto" 
      onClick={handelNuevoGasto}
       
       />
    </div>
   </>
    )}

    {modal && 
    <Modal
    setModal = {setModal}
    animarModal={animarModal}
    setAnimarModal = {setAnimarModal}
    guardarGasto = {guardarGasto}
    gastoEditar={gastoEditar}
    setGastoEditar={setGastoEditar}
    />}
    
   </div>
  )
}

export default App
