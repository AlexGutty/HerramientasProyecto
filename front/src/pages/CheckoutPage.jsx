"use client"

import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, CreditCard } from "lucide-react"

import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/Separator"
import { Card, CardContent } from "../components/ui/Card"
import { FormularioPago } from "../components/FormularioPago"
import { useCarrito } from "../context/CarritoContext"
import { useAuth } from "../context/AuthContext"

export default function PaginaPago() {
  const { carrito, cargando } = useCarrito()
  const { usuario } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirigir al carrito si está vacío
    if (!cargando && carrito.items.length === 0) {
      navigate("/carrito")
    }
  }, [carrito, cargando, navigate])

  if (cargando) {
    return <div className="container px-4 py-8">Cargando información de pago...</div>
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-4">
            <Link to="/carrito" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al carrito
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Finalizar Compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <FormularioPago usuario={usuario} />
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
                <div className="space-y-4">
                  {carrito.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.imagen || "/placeholder.svg"}
                          alt={item.nombre}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{item.nombre}</h3>
                        <p className="text-xs text-muted-foreground">{item.marca}</p>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm">Cant: {item.cantidad}</span>
                          <span className="font-medium">${item.precio.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${carrito.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envío</span>
                      <span>{carrito.envio === 0 ? "Gratis" : `$${carrito.envio.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Impuestos (7%)</span>
                      <span>${carrito.impuestos.toLocaleString()}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${carrito.total.toLocaleString()}</span>
                  </div>
                  <Button className="w-full mt-4" size="lg" form="formulario-pago" type="submit">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Completar Pedido
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Al completar tu pedido, aceptas nuestros Términos de Servicio y Política de Privacidad
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}