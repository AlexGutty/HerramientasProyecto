"use client"

import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { useCarrito } from "../context/CarritoContext"
import { useToast } from "./ui/useToast"

export function FormularioCodigoPromo() {
  const [codigoPromo, setCodigoPromo] = useState("")
  const [cargando, setCargando] = useState(false)
  const { aplicarCodigoPromo } = useCarrito()
  const { toast } = useToast()

  const handleAplicarCodigoPromo = async (e) => {
    e.preventDefault()
    if (!codigoPromo.trim()) return

    setCargando(true)
    try {
      const resultado = await aplicarCodigoPromo(codigoPromo)
      if (resultado.exito) {
        toast({
          title: "Código promocional aplicado",
          description: resultado.mensaje,
        })
      } else {
        toast({
          title: "Código promocional inválido",
          description: resultado.mensaje,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo aplicar el código promocional",
        variant: "destructive",
      })
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium mb-2">¿Tienes un código promocional?</h3>
      <form className="flex space-x-2" onSubmit={handleAplicarCodigoPromo}>
        <Input
          placeholder="Ingresa el código"
          value={codigoPromo}
          onChange={(e) => setCodigoPromo(e.target.value)}
          disabled={cargando}
        />
        <Button variant="outline" type="submit" disabled={cargando}>
          {cargando ? "Aplicando..." : "Aplicar"}
        </Button>
      </form>
    </div>
  )
}
