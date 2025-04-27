// Define the Product type
export type Product = {
  id: string
  name: string
  brand: string
  price: number
  image: string
  isNew: boolean
  rating: number
  reviews: number
  description: string
  categoryId: string
  stock: number
  createdAt: Date
  updatedAt: Date
}

// Define the Category type
export type Category = {
  id: string
  name: string
  description: string
}

// Define the CartItem type
export type CartItem = {
  id: string
  productId: string
  quantity: number
  product: Product
}

// Define the Cart type
export type Cart = {
  id: string
  userId: string | null
  items: CartItem[]
  subtotal: number
  tax: number
  total: number
}

// Define the Order type
export type Order = {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  shippingAddress: Address
  billingAddress: Address
  createdAt: Date
  updatedAt: Date
}

// Define the OrderItem type
export type OrderItem = {
  id: string
  orderId: string
  productId: string
  product: Product
  quantity: number
  price: number
}

// Define the User type
export type User = {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

// Define the Review type
export type Review = {
  id: string
  productId: string
  userId: string
  user: {
    name: string
  }
  rating: number
  comment: string
  createdAt: Date
}

// Define the Address type
export type Address = {
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

// Define the OrderStatus enum
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

// Define the PaymentStatus enum
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded"

// Define the UserRole enum
export type UserRole = "customer" | "admin"
