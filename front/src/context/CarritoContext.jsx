"use client"

import { createContext, useContext, useState, useEffect } from "react"
import {
  obtenerCarrito,
  agregarItemCarrito,
  actualizarItemCarrito,
  eliminarItemCarrito,
  aplicarCodigoPromocion,
} from "../services/carritoService"

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState({
    items: [],
    subtotal: 0,
    envio: 0,
    impuestos: 0,
    total: 0,
  })
  const [cargando, setCargando] = useState(true)

  // Cargar el carrito al iniciar
  useEffect(() => {
    async function cargarCarrito() {
      try {
        const datosCarrito = await obtenerCarrito()
        setCarrito(datosCarrito)
      } catch (error) {
        console.error("Error al cargar el carrito:", error)
      } finally {
        setCargando(false)
      }
    }

    cargarCarrito()
  }, [])

  // Agregar un producto al carrito
  const agregarAlCarrito = async (productoId, cantidad) => {
    try {
      const datosCarrito = await agregarItemCarrito(productoId, cantidad)
      setCarrito(datosCarrito)
      return datosCarrito
    } catch (error) {
      console.error("Error al agregar al carrito:", error)
      throw error
    }
  }

  // Actualizar la cantidad de un producto en el carrito
  const actualizarCantidadItem = async (itemId, cantidad) => {
    try {
      const datosCarrito = await actualizarItemCarrito(itemId, cantidad)
      setCarrito(datosCarrito)
      return datosCarrito
    } catch (error) {
      console.error("Error al actualizar cantidad:", error)
      throw error
    }
  }

  // Eliminar un producto del carrito
  const eliminarItem = async (itemId) => {
    try {
      const datosCarrito = await eliminarItemCarrito(itemId)
      setCarrito(datosCarrito)
      return datosCarrito
    } catch (error) {
      console.error("Error al eliminar item:", error)
      throw error
    }
  }

  // Aplicar código promocional
  const aplicarCodigoPromo = async (codigo) => {
    try {
      const resultado = await aplicarCodigoPromocion(codigo)
      if (resultado.exito) {
        // Actualizar el carrito con los nuevos precios
        const datosCarrito = await obtenerCarrito()
        setCarrito(datosCarrito)
      }
      return resultado
    } catch (error) {
      console.error("Error al aplicar código promocional:", error)
      throw error
    }
  }

  // Vaciar el carrito (después de completar una compra)
  const vaciarCarrito = async () => {
    try {
      // En un caso real, esto podría ser una llamada a la API
      setCarrito({
        items: [],
        subtotal: 0,
        envio: 0,
        impuestos: 0,
        total: 0,
      })
    } catch (error) {
      console.error("Error al vaciar el carrito:", error)
      throw error
    }
  }

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        cargando,
        agregarAlCarrito,
        actualizarCantidadItem,
        eliminarItem,
        aplicarCodigoPromo,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const context = useContext(CarritoContext)
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de un CarritoProvider")
  }
  return context
}
