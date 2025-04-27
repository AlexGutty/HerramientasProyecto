import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Mail, Phone, Clock, MapPin, FileQuestion, RotateCcw } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { FAQSection } from "@/components/faq-section"
import { ReturnsSection } from "@/components/returns-section"

export default function SupportPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Customer Support</h1>
          <p className="text-muted-foreground mt-4 md:text-lg">
            We're here to help with any questions about your luxury timepiece purchase
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </CardTitle>
              <CardDescription>Speak directly with our experts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">+1 (800) 123-4567</p>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>Mon-Fri: 9AM-6PM EST</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </CardTitle>
              <CardDescription>Get a response within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">support@deluxewatches.com</p>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>24/7 Email Support</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Visit Us
              </CardTitle>
              <CardDescription>Experience our collection in person</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">123 Luxury Avenue</p>
              <p className="text-muted-foreground">New York, NY 10001</p>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>Mon-Sat: 10AM-7PM</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="contact" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contact">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Us
              </TabsTrigger>
              <TabsTrigger value="faq">
                <FileQuestion className="mr-2 h-4 w-4" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="returns">
                <RotateCcw className="mr-2 h-4 w-4" />
                Returns & Warranty
              </TabsTrigger>
            </TabsList>
            <TabsContent value="contact" className="p-4 pt-6">
              <ContactForm />
            </TabsContent>
            <TabsContent value="faq" className="p-4 pt-6">
              <FAQSection />
            </TabsContent>
            <TabsContent value="returns" className="p-4 pt-6">
              <ReturnsSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
