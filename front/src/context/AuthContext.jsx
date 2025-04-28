"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { iniciarSesion, cerrarSesion, registrar, obtenerUsuarioActual } from "../services/authService"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const verificarAuth = async () => {
      try {
        const datosUsuario = await obtenerUsuarioActual()
        setUsuario(datosUsuario)
      } catch (error) {
        console.error("Error al verificar autenticación:", error)
      } finally {
        setCargando(false)
      }
    }

    verificarAuth()
  }, [])

  const login = async (email, password) => {
    setCargando(true)
    try {
      const datosUsuario = await iniciarSesion(email, password)
      setUsuario(datosUsuario)
    } catch (error) {
      console.error("Error de inicio de sesión:", error)
      throw error
    } finally {
      setCargando(false)
    }
  }

  const logout = async () => {
    setCargando(true)
    try {
      await cerrarSesion()
      setUsuario(null)
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    } finally {
      setCargando(false)
    }
  }

  const register = async (email, password, nombre) => {
    setCargando(true)
    try {
      const datosUsuario = await registrar(email, password, nombre)
      setUsuario(datosUsuario)
    } catch (error) {
      console.error("Error de registro:", error)
      throw error
    } finally {
      setCargando(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
