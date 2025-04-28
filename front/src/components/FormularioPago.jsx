"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShieldCheck } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import { useCarrito } from "../context/CarritoContext"
import { crearPedido } from "../services/pedidosService"
import { useToast } from "./ui/useToast"

export function FormularioPago({ usuario }) {
  const navigate = useNavigate()
  const [cargando, setCargando] = useState(false)
  const [metodoPago, setMetodoPago] = useState("tarjeta-credito")
  const { toast } = useToast()
  const { vaciarCarrito } = useCarrito()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)

    const formData = new FormData(e.currentTarget)
    const datosFormulario = Object.fromEntries(formData.entries())

    try {
      const idPedido = await crearPedido({
        ...datosFormulario,
        metodoPago,
      })

      toast({
        title: "Pedido realizado con éxito",
        description: "¡Gracias por tu compra!",
      })

      // Vaciar el carrito después de una compra exitosa
      await vaciarCarrito()

      // Redirigir a la página de confirmación del pedido
      navigate(`/confirmacion-pedido/${idPedido}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu pedido. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setCargando(false)
    }
  }

  return (
    <form id="formulario-pago" onSubmit={handleSubmit}>
      <div className="rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Ingresa tu nombre"
                defaultValue={usuario?.nombre || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos</Label>
              <Input
                id="apellidos"
                name="apellidos"
                placeholder="Ingresa tus apellidos"
                defaultValue={usuario?.apellidos || ""}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Ingresa tu email"
              defaultValue={usuario?.email || ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="Ingresa tu número de teléfono"
              defaultValue={usuario?.telefono || ""}
              required
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              name="direccion"
              placeholder="Ingresa tu dirección"
              defaultValue={usuario?.direccion?.calle || ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="direccion2">Apartamento, suite, etc. (opcional)</Label>
            <Input
              id="direccion2"
              name="direccion2"
              placeholder="Apartamento, suite, etc."
              defaultValue={usuario?.direccion?.unidad || ""}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input
                id="ciudad"
                name="ciudad"
                placeholder="Ingresa tu ciudad"
                defaultValue={usuario?.direccion?.ciudad || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="provincia">Provincia</Label>
              <Select name="provincia" defaultValue={usuario?.direccion?.provincia || ""}>
                <SelectTrigger id="provincia">
                  <SelectValue placeholder="Selecciona provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="madrid">Madrid</SelectItem>
                  <SelectItem value="barcelona">Barcelona</SelectItem>
                  <SelectItem value="valencia">Valencia</SelectItem>
                  <SelectItem value="sevilla">Sevilla</SelectItem>
                  <SelectItem value="bilbao">Bilbao</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="codigoPostal">Código Postal</Label>
              <Input
                id="codigoPostal"
                name="codigoPostal"
                placeholder="Ingresa código postal"
                defaultValue={usuario?.direccion?.codigoPostal || ""}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pais">País</Label>
            <Select name="pais" defaultValue={usuario?.direccion?.pais || "es"}>
              <SelectTrigger id="pais">
                <SelectValue placeholder="Selecciona país" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">España</SelectItem>
                <SelectItem value="fr">Francia</SelectItem>
                <SelectItem value="it">Italia</SelectItem>
                <SelectItem value="de">Alemania</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
        <Tabs defaultValue="tarjeta-credito" onValueChange={setMetodoPago}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tarjeta-credito">Tarjeta de Crédito</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
            <TabsTrigger value="transferencia">Transferencia Bancaria</TabsTrigger>
          </TabsList>
          <TabsContent value="tarjeta-credito" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="numeroTarjeta">Número de Tarjeta</Label>
              <Input
                id="numeroTarjeta"
                name="numeroTarjeta"
                placeholder="1234 5678 9012 3456"
                required={metodoPago === "tarjeta-credito"}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fechaExpiracion">Fecha de Expiración</Label>
                <Input
                  id="fechaExpiracion"
                  name="fechaExpiracion"
                  placeholder="MM/AA"
                  required={metodoPago === "tarjeta-credito"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" name="cvv" placeholder="123" required={metodoPago === "tarjeta-credito"} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombreTarjeta">Nombre en la Tarjeta</Label>
              <Input
                id="nombreTarjeta"
                name="nombreTarjeta"
                placeholder="Ingresa el nombre como aparece en la tarjeta"
                required={metodoPago === "tarjeta-credito"}
              />
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>Tu información de pago está segura y encriptada</span>
            </div>
          </TabsContent>
          <TabsContent value="paypal" className="pt-4">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <img src="/placeholder.svg?height=60&width=120" alt="PayPal" className="mb-4" />
              <p className="text-muted-foreground mb-4">
                Serás redirigido a PayPal para completar tu pago de forma segura.
              </p>
              <Button>Continuar con PayPal</Button>
            </div>
          </TabsContent>
          <TabsContent value="transferencia" className="pt-4">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Por favor, utiliza los siguientes datos para realizar una transferencia bancaria. Tu pedido será
                procesado una vez que se confirme el pago.
              </p>
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Nombre del Banco:</span>
                  <span>Banco Relojes de Lujo</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Nombre de la Cuenta:</span>
                  <span>Relojes de Lujo S.L.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Número de Cuenta:</span>
                  <span>ES12 3456 7890 1234 5678 9012</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">SWIFT/BIC:</span>
                  <span>RLJESXXX</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Referencia:</span>
                  <span>PEDIDO-{Math.floor(Math.random() * 10000)}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </form>
  )
}
