import { ShoppingBag, Users, DollarSign, Package, Clock, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminRecentOrders } from "@/components/admin/recent-orders"
import { AdminTopProducts } from "@/components/admin/top-products"
import { AdminSalesChart } from "@/components/admin/sales-chart"

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$458,623.00</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    +12.5% <ArrowUpRight className="ml-1 h-3 w-3" />
                  </span>
                  <span className="mt-1 block">from last month</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    +8.2% <ArrowUpRight className="ml-1 h-3 w-3" />
                  </span>
                  <span className="mt-1 block">from last month</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    +5.7% <ArrowUpRight className="ml-1 h-3 w-3" />
                  </span>
                  <span className="mt-1 block">from last month</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 flex items-center">
                    -0.5% <ArrowDownRight className="ml-1 h-3 w-3" />
                  </span>
                  <span className="mt-1 block">from last month</span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AdminSalesChart />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders placed on your store</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminRecentOrders />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Your best-selling products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminTopProducts />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Products that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-orange-100 p-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Low Stock Items</p>
                      <p className="text-sm text-muted-foreground">8 products below threshold</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      View
                    </Button>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-red-100 p-2">
                      <Package className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Out of Stock Items</p>
                      <p className="text-sm text-muted-foreground">3 products need reordering</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
