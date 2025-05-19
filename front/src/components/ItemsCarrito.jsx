"use client"

import { useState } from "react"
import { Minus, Plus, Trash } from "lucide-react"

import { Button } from "./ui/Button"
import { Separator } from "./ui/Separator"
import { useCarrito } from "../context/CarritoContext"
import { useToast } from "./ui/useToast"

export function ItemsCarrito({ items }) {
  const [actualizandoItems, setActualizandoItems] = useState({})
  const { actualizarCantidadItem, eliminarItem } = useCarrito()
  const { toast } = useToast()

  const handleActualizarCantidad = async (itemId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return

    setActualizandoItems((prev) => ({ ...prev, [itemId]: true }))
    try {
      await actualizarCantidadItem(itemId, nuevaCantidad)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la cantidad del artículo",
        variant: "destructive",
      })
    } finally {
      setActualizandoItems((prev) => ({ ...prev, [itemId]: false }))
    }
  }

  const handleEliminarItem = async (itemId) => {
    setActualizandoItems((prev) => ({ ...prev, [itemId]: true }))
    try {
      await eliminarItem(itemId)
      toast({
        title: "Artículo eliminado",
        description: "El artículo ha sido eliminado de tu carrito",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el artículo del carrito",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <img src={item.imagen || "/placeholder.svg"} alt={item.nombre} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium">{item.nombre}</h3>
              <p className="text-sm text-muted-foreground">{item.marca}</p>
              <p className="font-semibold mt-1">${item.precio.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-8 w-8"
                  onClick={() => handleActualizarCantidad(item.id, item.cantidad - 1)}
                  disabled={actualizandoItems[item.id] || item.cantidad <= 1}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Disminuir cantidad</span>
                </Button>
                <span className="w-8 text-center text-sm">{item.cantidad}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-8 w-8"
                  onClick={() => handleActualizarCantidad(item.id, item.cantidad + 1)}
                  disabled={actualizandoItems[item.id]}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Aumentar cantidad</span>
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => handleEliminarItem(item.id)}
                disabled={actualizandoItems[item.id]}
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Eliminar artículo</span>
              </Button>
            </div>
          </div>
          <Separator className="mt-6" />
        </div>
      ))}
    </div>
  )
}