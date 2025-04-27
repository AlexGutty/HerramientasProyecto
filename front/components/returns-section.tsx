export function ReturnsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Return Policy</h3>
        <p className="text-muted-foreground">
          We offer a 30-day return policy for unworn watches in their original condition with all tags and protective
          coverings intact. Returns must be initiated within 30 days of delivery. Please contact our customer service
          team to begin the return process.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Warranty Information</h3>
        <p className="text-muted-foreground">
          All new watches come with the manufacturer's warranty, typically 2-5 years depending on the brand.
          Additionally, we offer our own 2-year warranty on all pre-owned watches, covering mechanical defects and
          workmanship.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">How to Initiate a Return</h3>
        <ol className="list-decimal pl-5 space-y-2 text-muted-foreground mt-2">
          <li>Contact our customer service team via email or phone</li>
          <li>Provide your order number and reason for return</li>
          <li>Receive a return authorization number</li>
          <li>Carefully package the watch in its original packaging</li>
          <li>Ship the package using the provided return label</li>
        </ol>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Refund Process</h3>
        <p className="text-muted-foreground">
          Once we receive and inspect your return, we will process your refund within 3-5 business days. Refunds will be
          issued to the original payment method. Please note that shipping costs are non-refundable, and a restocking
          fee may apply for certain items.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Warranty Claims</h3>
        <p className="text-muted-foreground">
          If your watch requires warranty service, please contact our service department. We will guide you through the
          process of sending your watch for repair or replacement. Warranty coverage does not include damage from
          accidents, misuse, or unauthorized service.
        </p>
      </div>
    </div>
  )
}
