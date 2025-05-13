import { Link } from "react-router-dom"
import { ShoppingCart, ArrowRight } from "lucide-react"

import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/Separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/Card"
import { ItemsCarrito } from "../components/ItemsCarrito"
import { FormularioCodigoPromo } from "../components/FormularioCodigoPromo"
import { useCarrito } from "../context/CarritoContext"

export default function PaginaCarrito() {
  const { carrito, cargando } = useCarrito()

  if (cargando) {
    return <div className="container px-4 py-8">Cargando carrito...</div>
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Carrito de Compras</h1>
          <p className="text-muted-foreground mt-2">Revisa y modifica tus artículos antes de finalizar la compra</p>
        </div>

        {carrito.items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Artículos en el Carrito ({carrito.items.length})</h2>
                  <ItemsCarrito items={carrito.items} />
                </div>
              </div>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${carrito.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span>{carrito.envio === 0 ? "Gratis" : `$${carrito.envio.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impuestos (7%)</span>
                    <span>${carrito.impuestos.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${carrito.total.toLocaleString()}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/checkout">
                      Proceder al Pago <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <div className="mt-6">
                <FormularioCodigoPromo />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Parece que aún no has añadido ningún reloj a tu carrito. Explora nuestra colección para encontrar tu pieza
              perfecta.
            </p>
            <Button asChild size="lg">
              <Link to="/catalogo">Continuar Comprando</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}